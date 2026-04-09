/**
 * One-time WordPress WXR → Astro content/blog/*.md migration.
 * Run: node scripts/migrate-wp-blog.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { XMLParser } from "fast-xml-parser";
import TurndownService from "turndown";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const XML_PATH = path.join(ROOT, "bharatjewellers.WordPress.2026-04-09.xml");
const OUT_DIR = path.join(ROOT, "src", "content", "blog");
const PUBLIC_IMG_ROOT = path.join(ROOT, "public", "assets", "images", "blog", "wp-import");

const UPLOAD_PATTERNS = [
  /https?:\/\/blog-temp\.bharatjewellers\.ca\/wp-content\/uploads\/(.+)/i,
  /https?:\/\/(?:www\.)?bharatjewellers\.ca\/wp-content\/uploads\/(.+)/i,
];

function decodeHtmlEntities(str) {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function stripTags(html) {
  return decodeHtmlEntities(String(html).replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
}

function getMeta(postmeta, key) {
  if (!postmeta) return null;
  const arr = Array.isArray(postmeta) ? postmeta : [postmeta];
  for (const m of arr) {
    if (String(m["wp:meta_key"]) === key) {
      const v = m["wp:meta_value"];
      return v == null ? null : v;
    }
  }
  return null;
}

function normalizeUploadUrl(u) {
  if (!u || typeof u !== "string") return null;
  for (const re of UPLOAD_PATTERNS) {
    const m = u.trim().match(re);
    if (m) return { relative: m[1].split("?")[0], fetchUrl: u.trim().split("?")[0] };
  }
  return null;
}

function collectImgSrcs(html) {
  const out = new Set();
  const re = /<img[^>]+src=["']([^"']+)["']/gi;
  let m;
  while ((m = re.exec(html))) {
    const n = normalizeUploadUrl(m[1]);
    if (n) out.add(n.fetchUrl);
  }
  return [...out];
}

function firstImgFromHtml(html) {
  const re = /<img[^>]+src=["']([^"']+)["']/i;
  const m = re.exec(html);
  return m ? m[1] : null;
}

function stripGutenbergComments(html) {
  return String(html).replace(/<!--\s*[\s\S]*?-->/g, "");
}

function stripSpacerDivs(html) {
  return html.replace(
    /<div[^>]*class="[^"]*wp-block-spacer[^"]*"[^>]*><\/div>/gi,
    "",
  );
}

function internalizeLinks(md) {
  return md.replace(
    /\[([^\]]*)\]\(https:\/\/(?:blog-temp\.)?bharatjewellers\.ca([^)]*)\)/g,
    (_, text, pth) => `[${text}](${pth})`,
  );
}

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true });
}

async function downloadFile(url, destPath) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) {
    const alt = url.replace("blog-temp.bharatjewellers.ca", "bharatjewellers.ca");
    if (alt !== url) {
      const res2 = await fetch(alt, { redirect: "follow" });
      if (!res2.ok) throw new Error(`${url} → ${res.status}, ${alt} → ${res2.status}`);
      const buf = Buffer.from(await res2.arrayBuffer());
      await ensureDir(path.dirname(destPath));
      await fs.writeFile(destPath, buf);
      return;
    }
    throw new Error(`${url} → ${res.status}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await ensureDir(path.dirname(destPath));
  await fs.writeFile(destPath, buf);
}

function buildTurndown() {
  const td = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
    bulletListMarker: "-",
  });
  td.addRule("strikethrough", {
    filter: ["del", "s"],
    replacement: (c) => `~~${c}~~`,
  });
  return td;
}

async function main() {
  const xml = await fs.readFile(XML_PATH, "utf8");
  const parser = new XMLParser({
    ignoreAttributes: false,
    isArray: (name) => ["item", "category", "wp:postmeta"].includes(name),
  });
  const doc = parser.parse(xml);
  const items = doc?.rss?.channel?.item;
  if (!Array.isArray(items)) {
    console.error("Unexpected XML: no channel.item array");
    process.exit(1);
  }

  /** @type {Map<string, string>} */
  const attachmentById = new Map();
  for (const it of items) {
    if (it["wp:post_type"] !== "attachment") continue;
    const id = String(it["wp:post_id"]);
    const url = it["wp:attachment_url"];
    if (id && url) attachmentById.set(id, String(url).trim());
  }

  const posts = items.filter(
    (it) => it["wp:post_type"] === "post" && it["wp:status"] === "publish",
  );

  console.log(`Found ${posts.length} published posts, ${attachmentById.size} attachments.`);

  /** @type {Map<string, string>} fetchUrl -> local web path */
  const urlToWebPath = new Map();

  const allFetchUrls = new Set();

  for (const p of posts) {
    const thumbId = getMeta(p["wp:postmeta"], "_thumbnail_id");
    if (thumbId != null) {
      const u = attachmentById.get(String(thumbId));
      const n = u ? normalizeUploadUrl(u) : null;
      if (n) allFetchUrls.add(n.fetchUrl);
    }
    const raw = String(p["content:encoded"] || "");
    for (const u of collectImgSrcs(raw)) allFetchUrls.add(u);
  }

  console.log(`Downloading ${allFetchUrls.size} unique media files…`);

  for (const fetchUrl of allFetchUrls) {
    const n = normalizeUploadUrl(fetchUrl);
    if (!n) continue;
    const destFs = path.join(PUBLIC_IMG_ROOT, n.relative);
    const webPath = `/assets/images/blog/wp-import/${n.relative.replace(/\\/g, "/")}`;
    try {
      await fs.access(destFs);
      urlToWebPath.set(fetchUrl, webPath);
      const alt = fetchUrl.replace("blog-temp.bharatjewellers.ca", "bharatjewellers.ca");
      if (alt !== fetchUrl) urlToWebPath.set(alt, webPath);
      continue;
    } catch {
      /* missing */
    }
    try {
      await downloadFile(fetchUrl, destFs);
      urlToWebPath.set(fetchUrl, webPath);
      const alt = fetchUrl.replace("blog-temp.bharatjewellers.ca", "bharatjewellers.ca");
      if (alt !== fetchUrl) urlToWebPath.set(alt, webPath);
      console.log("  ok:", webPath);
    } catch (e) {
      console.warn("  FAIL:", fetchUrl, e.message);
    }
  }

  function rewriteAssetUrls(html) {
    let h = html;
    for (const [remote, local] of urlToWebPath) {
      const escaped = remote.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      h = h.replace(new RegExp(escaped, "g"), local);
    }
    return h;
  }

  const td = buildTurndown();
  const oldFiles = await fs.readdir(OUT_DIR).catch(() => []);
  for (const f of oldFiles) {
    if (f.endsWith(".md")) await fs.unlink(path.join(OUT_DIR, f));
  }

  const FALLBACK_IMG = "/assets/images/Logo/bharat-jewellers-logo.webp";

  for (const p of posts) {
    const slug = String(p["wp:post_name"] || "").trim();
    if (!slug) {
      console.warn("Skip post without slug:", p["wp:post_id"]);
      continue;
    }

    const title = String(p.title || "").trim();
    const postmeta = p["wp:postmeta"];
    let description =
      getMeta(postmeta, "rank_math_description") ||
      getMeta(postmeta, "_yoast_wpseo_metadesc") ||
      "";
    description = decodeHtmlEntities(String(description)).trim();
    if (!description) {
      const ex = p["excerpt:encoded"];
      description = ex ? stripTags(ex) : "";
    }
    if (!description) {
      const bodyHtml = stripTags(String(p["content:encoded"] || ""));
      description = bodyHtml.slice(0, 200).trim() + (bodyHtml.length > 200 ? "…" : "");
    }

    const dateStr = String(p["wp:post_date"] || "").split(" ")[0];
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      console.warn("Bad date for", slug, p["wp:post_date"]);
    }

    const thumbId = getMeta(postmeta, "_thumbnail_id");
    let featuredUrl = thumbId != null ? attachmentById.get(String(thumbId)) : null;

    let rawHtml = String(p["content:encoded"] || "");
    rawHtml = stripGutenbergComments(rawHtml);
    rawHtml = stripSpacerDivs(rawHtml);
    rawHtml = rewriteAssetUrls(rawHtml);

    if (!featuredUrl) {
      const first = firstImgFromHtml(rawHtml);
      featuredUrl = first || null;
    }

    function resolveToWebPath(url) {
      if (!url) return null;
      if (url.startsWith("/")) return url;
      const mapped =
        urlToWebPath.get(url) ||
        urlToWebPath.get(url.replace("blog-temp.bharatjewellers.ca", "bharatjewellers.ca"));
      if (mapped) return mapped;
      const norm = normalizeUploadUrl(url);
      return norm ? `/assets/images/blog/wp-import/${norm.relative}` : null;
    }

    let imagePath = resolveToWebPath(featuredUrl) || FALLBACK_IMG;

    let markdown = td.turndown(rawHtml);
    markdown = markdown.replace(/\n{3,}/g, "\n\n").trim();
    markdown = internalizeLinks(markdown);
    // Ensure FAQ question headings remain valid markdown after conversion.
    markdown = markdown.replace(
      /<p>\s*\\?(#{3,6})\s*([^<\n]+?)\s*<\/p>/gim,
      "\n$1 $2\n",
    );
    markdown = markdown.replace(/^[ \t]*\\(#{3,6})[ \t]+/gim, "$1 ");
    markdown = markdown.replace(
      /\n*<h2 class="faq-heading">Frequently Asked Questions<\/h2>\n*/g,
      "\n\n<h2 class=\"faq-heading\">Frequently Asked Questions</h2>\n\n",
    );
    // Broken links from malformed WP/HTML (`<http...>` pseudo-URLs in href)
    markdown = markdown.replace(
      /\[([^\]]+)\]\(<http[^>]+>\)/g,
      "[$1](/blog/bharat-jewellers-store-in-canada/)",
    );

    const fm = [
      "---",
      `title: ${JSON.stringify(title)}`,
      `description: ${JSON.stringify(description)}`,
      `date: ${JSON.stringify(dateStr)}`,
      `image: ${JSON.stringify(imagePath)}`,
      "---",
      "",
    ].join("\n");

    const outPath = path.join(OUT_DIR, `${slug}.md`);
    await fs.writeFile(outPath, fm + markdown + "\n", "utf8");
    console.log("Wrote", slug);
  }

  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
