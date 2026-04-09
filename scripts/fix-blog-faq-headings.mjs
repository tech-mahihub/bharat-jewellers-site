import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.join(__dirname, "..", "src", "content", "blog");

const FAQ_HEADING_RE =
  /^\s{0,3}#{2,6}\s*(?:Frequently\s+Asked\s+Question(?:s|\(s\)|\(FAQs?\)|\(FAQS\))?|Frequently\s+Asked\s+Questions?|FAQs?)\s*$/gim;

const REPLACEMENT = '<h2 class="faq-heading">Frequently Asked Questions</h2>';

async function main() {
  const files = (await fs.readdir(BLOG_DIR)).filter((f) => f.endsWith(".md"));
  let updatedFiles = 0;
  let replacedHeadings = 0;

  for (const file of files) {
    const fullPath = path.join(BLOG_DIR, file);
    const original = await fs.readFile(fullPath, "utf8");
    const matches = original.match(FAQ_HEADING_RE) || [];
    if (!matches.length) continue;

    const next = original.replace(FAQ_HEADING_RE, REPLACEMENT);
    if (next !== original) {
      await fs.writeFile(fullPath, next, "utf8");
      updatedFiles += 1;
      replacedHeadings += matches.length;
    }
  }

  console.log(
    JSON.stringify({ updatedFiles, replacedHeadings }, null, 2),
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

