# Bharat Jewellers – SEO Guide

This guide covers the SEO setup for your jewellery website and how to maintain it.

---

## ✅ What’s Already Done

### 1. **Meta Tags on All Pages**

| Page | Title | Description | Keywords |
|------|-------|-------------|----------|
| Homepage | ✓ | ✓ | ✓ |
| About | ✓ | ✓ | ✓ |
| Collections | ✓ | ✓ | ✓ |
| Category (dynamic) | ✓ | ✓ | ✓ |
| Contact | ✓ | ✓ | ✓ |
| Surrey, Calgary, Edmonton | ✓ | ✓ | ✓ |
| Live Gold Rates | ✓ | ✓ | ✓ |
| FAQs | ✓ | ✓ | ✓ |
| Privacy, Terms, Disclaimer | ✓ | ✓ | ✓ |
| Thank You | ✓ | ✓ | **noindex** (excluded from search) |

### 2. **Content-Level SEO (Headings & Body Text)**

Keywords are integrated into visible content – not just meta tags:

- **H1/H2 headings** include primary keywords (gold jewellery, diamond jewellery, Surrey, Calgary, Edmonton, Bharat Jewellers)
- **Body text** includes natural keyword phrases where relevant
- **Location pages** have location-specific subtitles (e.g. "Gold & Diamond Jewellery Store in Surrey BC")
- No stuffing – all changes read naturally for users

### 3. **Sitemap**

- **File:** `public/sitemap.xml`
- **Purpose:** Lists all indexable pages so search engines can crawl them
- **URL:** `https://yourdomain.com/sitemap.xml`
- **Update:** When you add or remove pages, update the sitemap.

### 4. **robots.txt**

- **File:** `public/robots.txt`
- **Purpose:** Directs crawlers, blocks the thank-you page, points to the sitemap
- **URL:** `https://yourdomain.com/robots.txt`

---

## 🔧 Setup After Upload

### 1. Update Domain in sitemap.xml and robots.txt

If your live site is **not** at `https://bharatjewellers.ca`, replace it with your real domain in:

- `public/sitemap.xml` – all `<loc>` URLs
- `public/robots.txt` – the `Sitemap:` URL

### 2. Submit to Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property (domain or URL prefix)
3. Submit your sitemap: `https://yourdomain.com/sitemap.xml`
4. Use URL Inspection to check important URLs

### 3. Submit to Bing Webmaster Tools

1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Add your site
3. Submit the same sitemap URL

---

## 📋 SEO Best Practices Used

### Title Tags

- Length: ~50–60 characters
- Pattern: `Primary Keyword | Brand`
- Each main page has a unique, relevant title

### Meta Descriptions

- Length: ~150–160 characters
- Includes main keyword and a clear call to action
- Unique per page

### Keywords

- Focus on local terms (Surrey, Calgary, Edmonton)
- Product terms (gold jewellery, diamond jewellery, bridal)
- Brand: Bharat Jewellers

### Thank You Page

- `noindex, nofollow` so it is not indexed
- Keeps the page out of search results

---

## ✅ Optional Upgrades (Implemented)

### 1. Canonical URLs ✓

Added to all pages inside `<head>` to reduce duplicate content:

```html
<link rel="canonical" href="https://bharatjewellers.ca/page.html">
```

### 2. Open Graph (Social Sharing) ✓

Added on all pages for better previews when links are shared on Facebook, LinkedIn, etc.:

- `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:site_name`
- Location pages use store-specific images; other pages use logo

### 3. JSON-LD Structured Data ✓

- **Homepage:** Organization schema with logo, social links, and all store addresses
- **Surrey, Calgary, Edmonton:** JewelryStore schema per location with address, phone, opening hours

### 4. Focus Keywords per Page

Keep a simple list of the main keyword for each page and align titles, descriptions, and headings with it:

- **Homepage:** luxury jewellery, gold jewellery Canada
- **Surrey:** jewellery store Surrey BC, gold jewellery Surrey
- **Calgary:** jewellery store Calgary, diamond jewellery Calgary
- **Edmonton:** jewellery store Edmonton
- **Contact:** contact Bharat Jewellers

---

## 📊 Ongoing SEO Tasks

1. **Check indexing** – Use Search Console’s Coverage report.
2. **Monitor performance** – Check impressions, clicks, and average position in Search Console.
3. **Keep content fresh** – Update Live Gold Rates, FAQs, and location details.
4. **Fix issues** – Act on any crawl errors or indexing problems reported.
5. **Page speed** – Keep images optimized and test with [PageSpeed Insights](https://pagespeed.web.dev/).

---

## 404 Page

- **File:** `public/404.html` – Custom branded 404 page with header, footer, and links to home, collections, contact, and store locations
- **server.js** – Serves 404.html when a file is not found
- **.htaccess** – For Apache-based hosting (cPanel, etc.): `ErrorDocument 404 /404.html`

---

## 📁 Files Touched / Added

- `public/sitemap.xml` – Sitemap
- `public/robots.txt` – Crawler rules
- `public/contact.html` – Meta, canonical, Open Graph
- `public/surrey.html` – Meta, canonical, Open Graph, JSON-LD JewelryStore
- `public/calgary.html` – Meta, canonical, Open Graph, JSON-LD JewelryStore
- `public/edmonton.html` – Meta, canonical, Open Graph, JSON-LD JewelryStore
- `public/thank-you.html` – `noindex, nofollow`, canonical
- **All HTML pages** – Canonical URLs and Open Graph meta tags
- **index.html** – Organization JSON-LD schema
- `public/404.html` – Custom 404 page
- `public/.htaccess` – Apache 404 redirect (for shared hosting)
