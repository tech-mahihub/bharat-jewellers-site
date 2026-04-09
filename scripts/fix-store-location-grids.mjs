/**
 * Convert migrated "3 images + 3 store detail blocks" sections into a
 * structured responsive HTML grid for blog posts.
 *
 * Run: node scripts/fix-store-location-grids.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.join(__dirname, "..", "src", "content", "blog");

const isBlank = (line) => !line || !line.trim();
const isImageLine = (line) => /^!\[[^\]]*]\([^)]+\)\s*$/.test(line.trim());
const isHeading456 = (line) => /^#{4,6}\s+/.test(line.trim());
const isHeading123 = (line) => /^#{1,3}\s+/.test(line.trim());

function parseImage(line) {
  const m = line.trim().match(/^!\[([^\]]*)]\(([^)]+)\)\s*$/);
  if (!m) return null;
  return { alt: m[1] || "", src: m[2] || "" };
}

function parseHeading(line) {
  const m = line.trim().match(/^#{4,6}\s+(.+)$/);
  if (!m) return { title: line.trim(), href: "" };
  const raw = m[1].trim();
  const link = raw.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
  if (link) return { title: link[1].trim(), href: link[2].trim() };
  return { title: raw, href: "" };
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function toStoreGridHtml(images, cards) {
  const lines = [];
  lines.push('<div class="store-grid">');
  for (let i = 0; i < 3; i += 1) {
    const img = images[i];
    const card = cards[i];
    lines.push('  <div class="store-card">');
    lines.push(
      `    <img src="${escapeHtml(img.src)}" alt="${escapeHtml(img.alt || card.title)}" loading="lazy" />`,
    );
    if (card.href) {
      lines.push(
        `    <h3><a href="${escapeHtml(card.href)}">${escapeHtml(card.title)}</a></h3>`,
      );
    } else {
      lines.push(`    <h3>${escapeHtml(card.title)}</h3>`);
    }
    if (card.address) lines.push(`    <p>${escapeHtml(card.address)}</p>`);
    if (card.phone) lines.push(`    <p>${escapeHtml(card.phone)}</p>`);
    if (card.directions) {
      lines.push(
        `    <a href="${escapeHtml(card.directions.href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(card.directions.text)}</a>`,
      );
    }
    for (const extra of card.extra) {
      lines.push(`    <p>${escapeHtml(extra)}</p>`);
    }
    lines.push("  </div>");
  }
  lines.push("</div>");
  return lines;
}

function tryExtractStoreGrid(lines, startIdx) {
  if (lines[startIdx]?.includes('<div class="store-grid">')) return null;

  let idx = startIdx;
  const images = [];

  while (idx < lines.length && images.length < 3) {
    while (idx < lines.length && isBlank(lines[idx])) idx += 1;
    const line = lines[idx];
    if (!line || !isImageLine(line)) return null;
    const img = parseImage(line);
    if (!img) return null;
    images.push(img);
    idx += 1;
    while (idx < lines.length && isBlank(lines[idx])) idx += 1;
  }
  if (images.length !== 3) return null;

  const cards = [];
  for (let c = 0; c < 3; c += 1) {
    while (idx < lines.length && isBlank(lines[idx])) idx += 1;
    if (!isHeading456(lines[idx] || "")) return null;

    const card = {
      ...parseHeading(lines[idx]),
      address: "",
      phone: "",
      directions: null,
      extra: [],
    };
    idx += 1;

    while (idx < lines.length) {
      const line = lines[idx] || "";
      const trimmed = line.trim();
      if (!trimmed) {
        idx += 1;
        continue;
      }
      if (isHeading456(trimmed) || isHeading123(trimmed)) break;

      if (/^Address:/i.test(trimmed)) {
        card.address = trimmed.replace(/^Address:\s*/i, "").trim();
      } else if (/^Phone:/i.test(trimmed)) {
        card.phone = trimmed.replace(/^Phone:\s*/i, "").trim();
      } else {
        const linkMatch = trimmed.match(/^\[([^\]]+)]\(([^)]+)\)\s*$/);
        if (linkMatch && !card.directions) {
          card.directions = { text: linkMatch[1].trim(), href: linkMatch[2].trim() };
        } else {
          card.extra.push(trimmed.replace(/\s{2,}$/, ""));
        }
      }
      idx += 1;
    }

    cards.push(card);
  }

  if (
    !cards.every(
      (c) =>
        c.title &&
        /(surrey|calgary|edmonton)/i.test(c.title) &&
        (c.address || c.phone || c.directions),
    )
  ) {
    return null;
  }

  return {
    start: startIdx,
    endExclusive: idx,
    replacementLines: toStoreGridHtml(images, cards),
  };
}

async function main() {
  const files = (await fs.readdir(BLOG_DIR)).filter((f) => f.endsWith(".md"));
  let updatedFiles = 0;
  let transformedBlocks = 0;

  for (const file of files) {
    const filePath = path.join(BLOG_DIR, file);
    const original = await fs.readFile(filePath, "utf8");
    const lines = original.split(/\r?\n/);
    let changed = false;

    for (let i = 0; i < lines.length; i += 1) {
      const extracted = tryExtractStoreGrid(lines, i);
      if (!extracted) continue;

      lines.splice(
        extracted.start,
        extracted.endExclusive - extracted.start,
        ...extracted.replacementLines,
      );
      transformedBlocks += 1;
      changed = true;
      i = extracted.start + extracted.replacementLines.length - 1;
    }

    if (changed) {
      await fs.writeFile(filePath, lines.join("\n"), "utf8");
      updatedFiles += 1;
    }
  }

  console.log(
    `Converted ${transformedBlocks} location block(s) in ${updatedFiles} blog post(s).`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

