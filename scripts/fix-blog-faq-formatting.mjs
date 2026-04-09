/**
 * Normalize FAQ question formatting in migrated blog markdown:
 * - Fix wrapped/escaped heading syntax (`<p>### ...</p>`, `\### ...`)
 * - Ensure FAQ heading HTML is separated by blank lines
 * - Ensure each FAQ question heading starts on a new markdown block
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.join(__dirname, "..", "src", "content", "blog");

function normalizeOne(content) {
  let next = content;

  // 1) Bad HTML-wrapped markdown headings => real headings.
  next = next.replace(
    /<p>\s*\\?(#{3,6})\s*([^<\n]+?)\s*<\/p>/gim,
    "\n$1 $2\n",
  );

  // 2) Escaped heading marker at line start: \### Question => ### Question
  next = next.replace(/^[ \t]*\\(#{3,6})[ \t]+/gim, "$1 ");

  // 3) Ensure question headings start at a fresh markdown block.
  next = next.replace(
    /([^\n])\n(#{3,6}\s+[^\n]+)\n/g,
    "$1\n\n$2\n\n",
  );

  // 4) Ensure custom FAQ heading HTML has spacing around it so markdown below
  // is parsed correctly and never shown as raw "### ...".
  next = next.replace(
    /\n*<h2 class="faq-heading">Frequently Asked Questions<\/h2>\n*/g,
    "\n\n<h2 class=\"faq-heading\">Frequently Asked Questions</h2>\n\n",
  );

  // 5) Keep file tidy.
  next = next.replace(/\n{3,}/g, "\n\n");
  next = next.replace(/[ \t]+\n/g, "\n");

  return next;
}

async function main() {
  const files = (await fs.readdir(BLOG_DIR)).filter((f) => f.endsWith(".md"));
  let changedFiles = 0;
  let beforeRawHashCount = 0;
  let afterRawHashCount = 0;

  for (const file of files) {
    const fp = path.join(BLOG_DIR, file);
    const original = await fs.readFile(fp, "utf8");

    beforeRawHashCount += (original.match(/(^|>)###\s+/gm) || []).length;

    const normalized = normalizeOne(original);
    afterRawHashCount += (normalized.match(/(^|>)###\s+/gm) || []).length;

    if (normalized !== original) {
      await fs.writeFile(fp, normalized, "utf8");
      changedFiles += 1;
    }
  }

  console.log(
    JSON.stringify(
      {
        changedFiles,
        beforeRawHashCount,
        afterRawHashCount,
      },
      null,
      2,
    ),
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

