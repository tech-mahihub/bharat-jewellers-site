import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PAGES_DIR = path.join(__dirname, "..", "src", "pages");
const SITE = "https://bharatjewellers.ca";

function q(str) {
  return JSON.stringify(str ?? "");
}

function extract(regex, text, group = 1, fallback = "") {
  const m = text.match(regex);
  return m ? m[group] : fallback;
}

function cleanHead(head) {
  let h = head;
  const patterns = [
    /<meta[^>]*charset[^>]*>\s*/gi,
    /<meta[^>]*name=["']viewport["'][^>]*>\s*/gi,
    /<meta[^>]*name=["']description["'][^>]*>\s*/gi,
    /<meta[^>]*name=["']keywords["'][^>]*>\s*/gi,
    /<meta[^>]*name=["']google-site-verification["'][^>]*>\s*/gi,
    /<title>[\s\S]*?<\/title>\s*/gi,
    /<link[^>]*rel=["']canonical["'][^>]*>\s*/gi,
    /<meta[^>]*property=["']og:title["'][^>]*>\s*/gi,
    /<meta[^>]*property=["']og:description["'][^>]*>\s*/gi,
    /<meta[^>]*property=["']og:image["'][^>]*>\s*/gi,
    /<meta[^>]*property=["']og:url["'][^>]*>\s*/gi,
    /<meta[^>]*property=["']og:type["'][^>]*>\s*/gi,
    /<meta[^>]*property=["']og:site_name["'][^>]*>\s*/gi,
    /<meta[^>]*property=["']article:published_time["'][^>]*>\s*/gi,
    /<link[^>]*href=["']\/assets\/css\/style\.css["'][^>]*>\s*/gi,
    /<link[^>]*fonts\.googleapis\.com[^>]*>\s*/gi,
    /<script[^>]*googletagmanager\.com\/gtag\/js[^>]*><\/script>\s*/gi,
    /<script>\s*window\.dataLayer[\s\S]*?<\/script>\s*/gi,
  ];
  for (const p of patterns) h = h.replace(p, "");
  h = h.replace(/\n{3,}/g, "\n\n").trim();
  return h;
}

function toMainContent(bodyInner) {
  let b = bodyInner;
  b = b.replace(/<div[^>]*id=["']site-header["'][^>]*>\s*<\/div>\s*/gi, "");
  b = b.replace(/<div[^>]*id=["']site-footer["'][^>]*>\s*<\/div>\s*/gi, "");
  b = b.replace(/<a[^>]*class=["'][^"']*floating-whatsapp[^"']*["'][\s\S]*?<\/a>\s*/gi, "");
  b = b.replace(/<a[^>]*class=["'][^"']*floating-top[^"']*["'][\s\S]*?<\/a>\s*/gi, "");
  b = b.replace(/<script[^>]*src=["'][^"']*layout\.js["'][^>]*><\/script>\s*/gi, "");
  b = b.replace(/<script[^>]*src=["'][^"']*main\.js["'][^>]*><\/script>\s*/gi, "");
  b = b.replace(/<script[^>]*>\s*window\.dataLayer[\s\S]*?<\/script>\s*/gi, "");

  const scripts = [];
  b = b.replace(/<script[\s\S]*?<\/script>\s*/gi, (m) => {
    scripts.push(m.trim());
    return "";
  });

  const m = b.match(/<main([^>]*)>([\s\S]*?)<\/main>/i);
  let content = m ? m[2].trim() : b.trim();

  const mainClass = m ? extract(/class=["']([^"']+)["']/i, m[1], 1, "") : "";
  if (mainClass) {
    content = `<div class=${q(mainClass)}>\n${content}\n</div>`;
  }

  return { content, scripts };
}

async function walk(dir) {
  const out = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (e.isFile() && p.endsWith(".astro")) out.push(p);
  }
  return out;
}

function canonicalFromPath(absPath) {
  const rel = absPath
    .split(path.sep)
    .slice(absPath.split(path.sep).lastIndexOf("pages") + 1)
    .join("/");
  let route = rel.replace(/\.astro$/, "").replace(/\/index$/, "/");
  route = route.replace(/\[\.{3}page\]/, "blog/");
  if (!route.startsWith("/")) route = `/${route}`;
  if (!route.endsWith("/")) route = `${route}/`;
  return `${SITE}${route}`;
}

async function main() {
  const files = await walk(PAGES_DIR);
  let changed = 0;
  const changedList = [];

  for (const file of files) {
    if (file.includes(`${path.sep}blog${path.sep}`)) continue;
    const original = await fs.readFile(file, "utf8");
    if (original.includes("import BaseLayout")) continue;

    const head = extract(/<head[^>]*>([\s\S]*?)<\/head>/i, original, 1, "");
    const bodyInner = extract(/<body[^>]*>([\s\S]*?)<\/body>/i, original, 1, original);
    const htmlClass = extract(/<html[^>]*class=["']([^"']+)["'][^>]*>/i, original, 1, "");
    const bodyClass = extract(/<body[^>]*class=["']([^"']+)["'][^>]*>/i, original, 1, "");

    const title = extract(/<title>([\s\S]*?)<\/title>/i, head, 1, "Bharat Jewellers");
    const description = extract(
      /<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i,
      head,
      1,
      "Bharat Jewellers",
    );
    const canonicalURL = extract(
      /<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i,
      head,
      1,
      canonicalFromPath(file),
    );
    const ogImage = extract(
      /<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']*)["'][^>]*>/i,
      head,
      1,
      "https://bharatjewellers.ca/assets/images/Logo/bharat-jewellers-logo.webp",
    );
    const ogType = extract(
      /<meta[^>]*property=["']og:type["'][^>]*content=["']([^"']*)["'][^>]*>/i,
      head,
      1,
      "website",
    );
    const ogTitle = extract(
      /<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']*)["'][^>]*>/i,
      head,
      1,
      "",
    );
    const keywords = extract(
      /<meta[^>]*name=["']keywords["'][^>]*content=["']([^"']*)["'][^>]*>/i,
      head,
      1,
      "",
    );
    const siteVerification = extract(
      /<meta[^>]*name=["']google-site-verification["'][^>]*content=["']([^"']+)["'][^>]*>/i,
      head,
      1,
      "",
    );

    const extraHead = cleanHead(head);
    const { content, scripts } = toMainContent(bodyInner);
    if (!content.trim()) continue;

    const out = [
      "---",
      'import BaseLayout from "../layouts/BaseLayout.astro";',
      `const pageTitle = ${q(title.trim())};`,
      `const pageDescription = ${q(description.trim())};`,
      `const canonicalURL = ${q(canonicalURL.trim())};`,
      `const ogImage = ${q(ogImage.trim())};`,
      `const ogType = ${q(ogType.trim())};`,
      ...(ogTitle ? [`const ogTitle = ${q(ogTitle.trim())};`] : []),
      ...(keywords ? [`const keywords = ${q(keywords.trim())};`] : []),
      ...(siteVerification ? [`const siteVerification = ${q(siteVerification.trim())};`] : []),
      ...(htmlClass ? [`const htmlClass = ${q(htmlClass.trim())};`] : []),
      ...(bodyClass ? [`const bodyClass = ${q(bodyClass.trim())};`] : []),
      "---",
      "",
      "<BaseLayout",
      '  title={pageTitle}',
      '  description={pageDescription}',
      '  canonicalURL={canonicalURL}',
      '  ogImage={ogImage}',
      '  ogType={ogType === "article" ? "article" : "website"}',
      ...(ogTitle ? ['  ogTitle={ogTitle}'] : []),
      ...(keywords ? ['  keywords={keywords}'] : []),
      ...(siteVerification ? ['  siteVerification={siteVerification}'] : []),
      ...(htmlClass ? ['  htmlClass={htmlClass}'] : []),
      ...(bodyClass ? ['  bodyClass={bodyClass}'] : []),
      ">",
      ...(extraHead ? ["  <Fragment slot=\"head\">", ...extraHead.split("\n").map((l) => `    ${l}`), "  </Fragment>"] : []),
      ...content.split("\n").map((l) => `  ${l}`),
      ...(scripts.length
        ? ["  <Fragment slot=\"afterMain\">", ...scripts.map((s) => `    ${s}`), "  </Fragment>"]
        : []),
      "</BaseLayout>",
      "",
    ].join("\n");

    await fs.writeFile(file, out, "utf8");
    changed += 1;
    changedList.push(path.relative(PAGES_DIR, file).replaceAll("\\", "/"));
  }

  console.log(JSON.stringify({ changed, changedList }, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

