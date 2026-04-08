/**
 * Regenerates sitemap.xml with clean category URLs (no query strings).
 * Categories must match keys in assets/js/category-template.js.
 * Do not add /products/ or other legacy paths (those return 410 and are disallowed in robots.txt).
 *
 * Usage: node scripts/generate-sitemap.js
 */
const fs = require('fs');
const path = require('path');

const BASE = 'https://bharatjewellers.ca';
const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'sitemap.xml');

const CATEGORY_SLUGS = [
  'gold-jewellery',
  'diamond-jewellery',
  'bridal-sets',
  'custom-jewellery'
];

const staticPages = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/about.html', changefreq: 'monthly', priority: '0.9' },
  { path: '/collections.html', changefreq: 'weekly', priority: '0.9' },
  { path: '/contact.html', changefreq: 'monthly', priority: '0.8' },
  { path: '/surrey.html', changefreq: 'monthly', priority: '0.8' },
  { path: '/calgary.html', changefreq: 'monthly', priority: '0.8' },
  { path: '/edmonton.html', changefreq: 'monthly', priority: '0.8' }
];

const categoryUrls = CATEGORY_SLUGS.map((slug) => ({
  path: `/${slug}`,
  changefreq: 'weekly',
  priority: '0.8'
}));

const urls = [...staticPages.slice(0, 3), ...categoryUrls, ...staticPages.slice(3)];

function escapeXml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

const body = urls
  .map(
    (u) => `  <url>
    <loc>${escapeXml(BASE + u.path)}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

fs.writeFileSync(OUT, xml, 'utf8');
console.log('Wrote', OUT);
