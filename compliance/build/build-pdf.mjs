#!/usr/bin/env node

/**
 * build-pdf.mjs
 *
 * Converts a DOCX file to PDF using LibreOffice headless conversion.
 * Designed to be run after build-docx.mjs generates DOCX output.
 *
 * Usage:
 *   node build-pdf.mjs <path-to-docx>
 *
 * Requirements:
 *   - LibreOffice must be installed
 *     macOS: brew install --cask libreoffice
 *     Linux: apt install libreoffice
 *
 * Output:
 *   - PDF file written to the same directory as the input DOCX
 */

import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { basename, dirname, resolve } from "node:path";

// --- Locate LibreOffice binary ---

function findSoffice() {
  const candidates = [
    "/Applications/LibreOffice.app/Contents/MacOS/soffice",
    "/usr/bin/soffice",
    "/usr/local/bin/soffice",
    "soffice",
  ];

  for (const candidate of candidates) {
    try {
      execSync(`"${candidate}" --version`, { stdio: "pipe" });
      return candidate;
    } catch {
      // Try next candidate
    }
  }

  return null;
}

// --- Try pandoc as fallback ---

function hasPandocWithPdfEngine() {
  try {
    execSync("pandoc --version", { stdio: "pipe" });
    // Check for xelatex
    try {
      execSync("xelatex --version", { stdio: "pipe" });
      return true;
    } catch {
      return false;
    }
  } catch {
    return false;
  }
}

// --- Parse arguments ---

const inputPath = process.argv[2];

if (!inputPath) {
  console.error("Usage: node build-pdf.mjs <path-to-docx>");
  console.error("");
  console.error("Example:");
  console.error(
    "  node build-pdf.mjs compliance/build/output/SOP-004-protocol-001-trt-intramuscular-v0.1.docx"
  );
  process.exit(1);
}

const resolvedInput = resolve(inputPath);

if (!existsSync(resolvedInput)) {
  console.error(`Error: File not found: ${resolvedInput}`);
  process.exit(1);
}

if (!resolvedInput.endsWith(".docx")) {
  console.error("Error: Input file must be a .docx file.");
  process.exit(1);
}

const outputDir = dirname(resolvedInput);
const outputFilename = basename(resolvedInput, ".docx") + ".pdf";
const outputPath = resolve(outputDir, outputFilename);

// --- Convert ---

const soffice = findSoffice();

if (soffice) {
  console.log("Using LibreOffice for PDF conversion...");
  try {
    execSync(
      `"${soffice}" --headless --convert-to pdf --outdir "${outputDir}" "${resolvedInput}"`,
      { stdio: "pipe" }
    );
    console.log(`PDF generated successfully:`);
    console.log(`  ${outputPath}`);
  } catch (err) {
    console.error("Error: LibreOffice conversion failed.");
    console.error(err.stderr?.toString() || err.message);
    process.exit(1);
  }
} else if (hasPandocWithPdfEngine()) {
  console.log("Using pandoc + xelatex for PDF conversion...");
  try {
    execSync(
      `pandoc "${resolvedInput}" -o "${outputPath}" --pdf-engine=xelatex`,
      { stdio: "pipe" }
    );
    console.log(`PDF generated successfully:`);
    console.log(`  ${outputPath}`);
  } catch (err) {
    console.error("Error: pandoc PDF conversion failed.");
    console.error(err.stderr?.toString() || err.message);
    process.exit(1);
  }
} else {
  console.error("Error: No PDF conversion tool available.");
  console.error("");
  console.error("Install one of the following:");
  console.error("  LibreOffice: brew install --cask libreoffice");
  console.error("  Pandoc + XeLaTeX: brew install pandoc && brew install --cask mactex");
  console.error("");
  console.error(
    "Alternatively, open the DOCX in Microsoft Word or Google Docs and export as PDF."
  );
  process.exit(1);
}
