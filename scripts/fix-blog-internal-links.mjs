/**
 * Prefix /blog/ on markdown links that point to migrated post slugs (WP used root-relative /slug/).
 * Run after migrate-wp-blog.mjs if needed: node scripts/fix-blog-internal-links.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.join(__dirname, "..", "src", "content", "blog");

const FRONTMATTER = /^---\r?\n[\s\S]*?\r?\n---\r?\n/;

async function main() {
  const files = (await fs.readdir(BLOG_DIR)).filter((f) => f.endsWith(".md"));
  const slugs = new Set(
    files.map((f) => path.basename(f, ".md")).filter(Boolean),
  );

  for (const file of files) {
    const fp = path.join(BLOG_DIR, file);
    let text = await fs.readFile(fp, "utf8");
    const fm = text.match(FRONTMATTER);
    if (!fm) continue;
    let body = text.slice(fm[0].length);

    for (const slug of slugs) {
      const esc = slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      // ]( /slug/ ) but not already ]( /blog/slug/
      const re = new RegExp(`\\]\\(/(?!blog/)(${esc})/\\)`, "g");
      body = body.replace(re, "](/blog/$1/)");
    }

    await fs.writeFile(fp, fm[0] + body, "utf8");
  }
  console.log("Fixed internal links in", files.length, "posts.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
