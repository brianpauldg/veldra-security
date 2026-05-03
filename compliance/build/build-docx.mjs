#!/usr/bin/env node

/**
 * build-docx.mjs
 *
 * Converts a Markdown SOP file to DOCX using pandoc.
 *
 * Usage:
 *   node build-docx.mjs <path-to-sop.md>
 *
 * Requirements:
 *   - pandoc must be installed (brew install pandoc)
 *
 * Output:
 *   - DOCX file written to compliance/build/output/
 */

import { execSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { basename, dirname, resolve } from "node:path";
import matter from "gray-matter";

const SCRIPT_DIR = dirname(new URL(import.meta.url).pathname);
const OUTPUT_DIR = resolve(SCRIPT_DIR, "output");

// --- Validate pandoc installation ---

function checkPandoc() {
  try {
    execSync("pandoc --version", { stdio: "pipe" });
  } catch {
    console.error("Error: pandoc is not installed or not in PATH.");
    console.error("");
    console.error("Install pandoc with:");
    console.error("  brew install pandoc");
    console.error("");
    console.error("For other platforms, see: https://pandoc.org/installing.html");
    process.exit(1);
  }
}

// --- Parse arguments ---

const inputPath = process.argv[2];

if (!inputPath) {
  console.error("Usage: node build-docx.mjs <path-to-sop.md>");
  console.error("");
  console.error("Example:");
  console.error(
    "  node build-docx.mjs compliance/sops/SOP-001-document-control/SOP-001-document-control.md"
  );
  process.exit(1);
}

const resolvedInput = resolve(inputPath);

if (!existsSync(resolvedInput)) {
  console.error(`Error: File not found: ${resolvedInput}`);
  process.exit(1);
}

// --- Parse frontmatter for output filename ---

const fileContent = readFileSync(resolvedInput, "utf-8");
const { data: frontmatter } = matter(fileContent);

const sopId = frontmatter.sop_id || "UNKNOWN";
const version = frontmatter.version || "0.0";
const shortTitle = basename(resolvedInput, ".md");

const outputFilename = `${sopId}-${shortTitle}-v${version}.docx`;
const outputPath = resolve(OUTPUT_DIR, outputFilename);

// --- Ensure output directory exists ---

if (!existsSync(OUTPUT_DIR)) {
  mkdirSync(OUTPUT_DIR, { recursive: true });
}

// --- Check for pandoc ---

checkPandoc();

// --- Build pandoc command ---

// TODO: Replace with a fully-branded reference DOCX in a future iteration.
// For v1, pandoc uses its default DOCX styling (adequate for review; not final branding).
// When a branded reference.docx is available, add:
//   --reference-doc=path/to/bloom-reference.docx
const pandocArgs = [
  "pandoc",
  `"${resolvedInput}"`,
  "-o",
  `"${outputPath}"`,
  "--from=gfm",
  "--to=docx",
  "--standalone",
  "--toc",
  "--toc-depth=3",
  `--metadata=title:"${frontmatter.title || shortTitle}"`,
].join(" ");

// --- Execute pandoc ---

try {
  execSync(pandocArgs, { stdio: "pipe" });
  console.log(`DOCX generated successfully:`);
  console.log(`  ${outputPath}`);
} catch (err) {
  console.error("Error: pandoc conversion failed.");
  console.error(err.stderr?.toString() || err.message);
  process.exit(1);
}
