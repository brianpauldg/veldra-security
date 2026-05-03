#!/usr/bin/env node

/**
 * build-html.mjs
 *
 * Renders all Markdown SOPs in compliance/sops/ to an internal HTML document library.
 *
 * Usage:
 *   node build-html.mjs
 *
 * Output:
 *   - HTML files written to compliance/build/output/html/
 *   - Index page generated from master-index.md
 */

import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from "node:fs";
import { resolve, dirname, basename, relative, join } from "node:path";
import { marked } from "marked";
import matter from "gray-matter";

const SCRIPT_DIR = dirname(new URL(import.meta.url).pathname);
const COMPLIANCE_DIR = resolve(SCRIPT_DIR, "..");
const SOPS_DIR = resolve(COMPLIANCE_DIR, "sops");
const OUTPUT_DIR = resolve(SCRIPT_DIR, "output", "html");
const MASTER_INDEX_PATH = resolve(COMPLIANCE_DIR, "master-index.md");

// --- Bloom brand CSS ---

const BRAND_CSS = `
:root {
  --bg-content: #0E0E11;
  --text-headline: #F0E8DA;
  --text-body: #C8BFB0;
  --accent-bronze: #B8A688;
  --border-subtle: #2a2a2e;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Georgia, "Times New Roman", serif;
  background-color: var(--bg-content);
  color: var(--text-body);
  line-height: 1.7;
  padding: 3rem 2rem;
  max-width: 900px;
  margin: 0 auto;
}

h1, h2, h3, h4, h5, h6 {
  font-family: "Lora", Georgia, serif;
  color: var(--text-headline);
  margin-top: 2.5rem;
  margin-bottom: 0.75rem;
  line-height: 1.3;
}

h1 { font-size: 2rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.5rem; }
h2 { font-size: 1.5rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.4rem; }
h3 { font-size: 1.25rem; }
h4 { font-size: 1.1rem; }

p { margin-bottom: 1rem; }

a { color: var(--accent-bronze); text-decoration: none; }
a:hover { text-decoration: underline; }

table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  font-size: 0.9rem;
}

th, td {
  border: 1px solid var(--border-subtle);
  padding: 0.6rem 0.8rem;
  text-align: left;
  vertical-align: top;
}

th {
  background-color: #1a1a1e;
  color: var(--text-headline);
  font-weight: 600;
}

tr:nth-child(even) { background-color: #131316; }

ul, ol {
  margin: 0.75rem 0 1rem 1.5rem;
}

li { margin-bottom: 0.4rem; }

blockquote {
  border-left: 3px solid var(--accent-bronze);
  padding: 0.75rem 1.25rem;
  margin: 1.5rem 0;
  background-color: #131316;
  color: var(--text-body);
  font-style: italic;
}

code {
  font-family: "SF Mono", "Fira Code", monospace;
  background-color: #1a1a1e;
  padding: 0.15rem 0.4rem;
  border-radius: 3px;
  font-size: 0.85em;
}

pre {
  background-color: #1a1a1e;
  padding: 1.25rem;
  border-radius: 4px;
  overflow-x: auto;
  margin: 1.5rem 0;
}

pre code {
  background: none;
  padding: 0;
}

hr {
  border: none;
  border-top: 1px solid var(--border-subtle);
  margin: 2rem 0;
}

strong { color: var(--text-headline); }

.header-meta {
  font-size: 0.85rem;
  color: var(--text-body);
  opacity: 0.8;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-subtle);
}

.footer {
  margin-top: 4rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-subtle);
  font-size: 0.8rem;
  color: var(--text-body);
  opacity: 0.6;
  text-align: center;
}
`;

// --- HTML template ---

function wrapHtml(title, bodyHtml, meta = {}) {
  const metaBlock = meta.sop_id
    ? `<div class="header-meta">
        <strong>${meta.sop_id}</strong> | Version ${meta.version || "—"} | Status: ${meta.status || "—"} | Classification: ${meta.classification || "INTERNAL"}
      </div>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} — Bloom Metabolics</title>
  <style>${BRAND_CSS}</style>
</head>
<body>
  ${metaBlock}
  ${bodyHtml}
  <div class="footer">
    Bloom Metabolics — Confidential — Internal Use Only<br>
    Generated from source on ${new Date().toISOString().split("T")[0]}
  </div>
</body>
</html>`;
}

// --- Find all Markdown files in sops/ recursively ---

function findMarkdownFiles(dir, files = []) {
  if (!existsSync(dir)) return files;
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = resolve(dir, entry.name);
    if (entry.isDirectory()) {
      // Skip archive and signed directories
      if (entry.name === "_archive" || entry.name === "signed") continue;
      findMarkdownFiles(fullPath, files);
    } else if (entry.name.endsWith(".md")) {
      files.push(fullPath);
    }
  }
  return files;
}

// --- Main build ---

function build() {
  // Ensure output directory
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const files = findMarkdownFiles(SOPS_DIR);
  let generated = 0;

  // Render each SOP markdown file
  for (const filePath of files) {
    const raw = readFileSync(filePath, "utf-8");
    const { data: frontmatter, content } = matter(raw);
    const htmlBody = marked(content);
    const title = frontmatter.title || basename(filePath, ".md");
    const outputName = basename(filePath, ".md") + ".html";
    const outputPath = resolve(OUTPUT_DIR, outputName);

    writeFileSync(outputPath, wrapHtml(title, htmlBody, frontmatter));
    generated++;
  }

  // Render master index as the library landing page
  if (existsSync(MASTER_INDEX_PATH)) {
    const indexRaw = readFileSync(MASTER_INDEX_PATH, "utf-8");
    const { content } = matter(indexRaw);
    const indexHtml = marked(content);
    const indexOutputPath = resolve(OUTPUT_DIR, "index.html");
    writeFileSync(indexOutputPath, wrapHtml("SOP Master Index", indexHtml));
    generated++;
  }

  // Summary
  console.log(`HTML document library generated:`);
  console.log(`  Output: ${OUTPUT_DIR}`);
  console.log(`  Files:  ${generated} HTML files generated`);
  console.log("");
  console.log("Files:");
  const outputFiles = readdirSync(OUTPUT_DIR).filter((f) => f.endsWith(".html"));
  for (const f of outputFiles) {
    console.log(`  - ${f}`);
  }
}

build();
