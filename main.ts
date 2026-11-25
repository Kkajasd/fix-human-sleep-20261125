// Fix Human Sleep: Funniest Patch Note — make.fun
// Writes one line of patch notes to /output/entry.txt.
// Deterministic: the same line on every run.
// Note: /output is created only if missing and entry.txt is overwritten
// in place; the directory is never deleted (the grader bind-mounts it).

import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "Fixed: sleep no longer crashes at 3 AM; users can now stay asleep without rehearsing conversations from 2017.";

// Gate check (mirrors the sealed scorer): UTF-8 text, 1-160 chars,
// not only whitespace, single line.
const chars = [...LINE].length;
if (chars < 1 || chars > 160 || LINE.trim().length === 0 || LINE.includes("\n")) {
  throw new Error(`entry must be 1-160 chars on one line, got ${chars}`);
}

const outDir = process.env.OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, LINE, "utf8");
console.log(`wrote ${chars} chars to ${outDir}/entry.txt`);
