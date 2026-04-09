import { copyFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const distDir = resolve(process.cwd(), "dist");
const sitemapIndex = resolve(distDir, "sitemap-index.xml");
const sitemapAlias = resolve(distDir, "sitemap.xml");

if (!existsSync(sitemapIndex)) {
  console.warn("[postbuild] sitemap-index.xml not found; skipping sitemap.xml alias.");
  process.exit(0);
}

copyFileSync(sitemapIndex, sitemapAlias);
console.log("[postbuild] Created sitemap.xml alias from sitemap-index.xml");
