#!/usr/bin/env node

/**
 * build-protocol-pdf.mjs
 *
 * Generates PDF files for SOP-004 injection protocol attachments
 * using PDFKit (already in project dependencies).
 *
 * Usage:
 *   node build-protocol-pdf.mjs                    # Build all protocols
 *   node build-protocol-pdf.mjs protocol-001       # Build specific protocol
 */

import PDFDocument from "pdfkit";
import { readFileSync, createWriteStream, existsSync, statSync } from "node:fs";
import { resolve, basename } from "node:path";

const BRONZE = "#8B6F47";
const BLACK = "#000000";
const GRAY = "#666666";
const WARM_TINT = "#FAF3E8";
const AMBER_TINT = "#FFF3CD";
const DARK_BROWN = "#5A4A2A";

const PROTOCOLS_BASE = resolve(
  "compliance/sops/SOP-004-injection-education/attachments"
);

const PROTOCOL_DIRS = [
  "protocol-001-trt-intramuscular",
  "protocol-002-glp1-gip-subcutaneous",
  "protocol-003-hcg-subcutaneous",
  "protocol-004-bpc157-subcutaneous-future",
  "protocol-005-tb500-subcutaneous-future",
];

function stripMarkdown(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/`(.+?)`/g, "$1")
    .replace(/\[(.+?)\]\(.+?\)/g, "$1");
}

function drawHeader(doc, title) {
  doc.save();
  doc.fontSize(8).fillColor(BRONZE).text("BLOOM METABOLICS", 72, 30, { continued: false });
  doc.fontSize(8).fillColor(GRAY).text("Confidential — Patient Use", 340, 30, { align: "right", width: 200 });
  doc.strokeColor(BRONZE).lineWidth(0.5).moveTo(72, 44).lineTo(540, 44).stroke();
  // Footer area
  doc.strokeColor(BRONZE).lineWidth(0.5).moveTo(72, 738).lineTo(540, 738).stroke();
  doc.fontSize(7).fillColor(GRAY).text(title, 72, 742, { width: 300 });
  doc.restore();
}

function ensureSpace(doc, needed, title) {
  if (doc.y > 720 - needed) {
    doc.addPage();
    drawHeader(doc, title);
    doc.y = 56;
  }
}

function buildPDF(mdPath, pdfPath, isFuture) {
  return new Promise((done, fail) => {
    const raw = readFileSync(mdPath, "utf-8");
    const titleMatch = raw.match(/title:\s*"(.+?)"/);
    const title = titleMatch ? titleMatch[1] : basename(mdPath, ".md");

    // Strip frontmatter
    let content = raw;
    if (content.startsWith("---")) {
      const end = content.indexOf("---", 3);
      if (end > 0) content = content.slice(end + 3);
    }
    const lines = content.split("\n");

    const doc = new PDFDocument({
      size: "letter",
      margins: { top: 56, bottom: 56, left: 72, right: 72 },
      info: { Title: title, Author: "Bloom Metabolics" },
      autoFirstPage: true,
      bufferPages: false,
    });

    const stream = createWriteStream(pdfPath);
    doc.pipe(stream);

    drawHeader(doc, title);
    doc.y = 56;

    const W = 468; // usable width
    let olCounter = 0;
    let blockquoteLines = [];

    function flushBlockquote() {
      if (blockquoteLines.length === 0) return;
      const text = blockquoteLines.join(" ");
      const tint = isFuture ? AMBER_TINT : WARM_TINT;
      const h = doc.heightOfString(text, { width: W - 20, fontSize: 9 }) + 16;
      ensureSpace(doc, h + 10, title);
      const y = doc.y;
      doc.rect(72, y, W, h).fill(tint);
      doc.rect(72, y, 3, h).fill(BRONZE);
      doc.font("Helvetica-Oblique").fontSize(9).fillColor(DARK_BROWN);
      doc.text(stripMarkdown(text), 82, y + 8, { width: W - 20, lineGap: 2 });
      doc.font("Helvetica");
      doc.y = y + h + 8;
      blockquoteLines = [];
    }

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();

      // Blockquote
      if (trimmed.startsWith("> ")) {
        blockquoteLines.push(trimmed.slice(2));
        if (i + 1 >= lines.length || !lines[i + 1].trim().startsWith("> ")) {
          flushBlockquote();
        }
        continue;
      }
      if (blockquoteLines.length > 0) flushBlockquote();

      // H1
      if (trimmed.startsWith("# ") && !trimmed.startsWith("## ")) {
        ensureSpace(doc, 30, title);
        doc.font("Helvetica-Bold").fontSize(18).fillColor(BLACK);
        doc.text(trimmed.slice(2), { lineGap: 4 });
        doc.moveDown(0.3);
        doc.font("Helvetica");
        continue;
      }

      // H2
      if (trimmed.startsWith("## ") && !trimmed.startsWith("### ")) {
        ensureSpace(doc, 30, title);
        doc.moveDown(0.4);
        doc.font("Helvetica-Bold").fontSize(13).fillColor(BLACK);
        doc.text(trimmed.slice(3), { lineGap: 2 });
        doc.strokeColor(BRONZE).lineWidth(0.5).moveTo(72, doc.y + 2).lineTo(540, doc.y + 2).stroke();
        doc.moveDown(0.3);
        doc.font("Helvetica");
        continue;
      }

      // H3
      if (trimmed.startsWith("### ")) {
        ensureSpace(doc, 20, title);
        doc.moveDown(0.2);
        doc.font("Helvetica-Bold").fontSize(11).fillColor(BLACK);
        doc.text(trimmed.slice(4), { lineGap: 2 });
        doc.moveDown(0.2);
        doc.font("Helvetica");
        continue;
      }

      // HR
      if (trimmed === "---") {
        doc.moveDown(0.2);
        doc.strokeColor(BRONZE).lineWidth(0.5).moveTo(72, doc.y).lineTo(540, doc.y).stroke();
        doc.moveDown(0.3);
        continue;
      }

      // Table separator
      if (/^\|[\s\-|]+\|$/.test(trimmed)) {
        doc.strokeColor(GRAY).lineWidth(0.25).moveTo(72, doc.y).lineTo(540, doc.y).stroke();
        doc.moveDown(0.05);
        continue;
      }

      // Table row
      if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
        const cells = trimmed.split("|").filter(c => c.trim()).map(c => stripMarkdown(c.trim()));
        const cellW = W / cells.length;
        ensureSpace(doc, 16, title);
        const rowY = doc.y;
        doc.fontSize(8).fillColor(BLACK).font("Helvetica");
        cells.forEach((cell, idx) => {
          doc.text(cell, 72 + idx * cellW, rowY, { width: cellW - 4, lineGap: 1 });
        });
        doc.y = rowY + 14;
        continue;
      }

      // Checklist
      if (trimmed.startsWith("- [ ] ") || trimmed.startsWith("- [x] ")) {
        const checked = trimmed.startsWith("- [x] ");
        const text = stripMarkdown(trimmed.slice(6));
        const mark = checked ? "\u2611" : "\u2610";
        ensureSpace(doc, 14, title);
        doc.fontSize(10).fillColor(BLACK).font("Helvetica");
        doc.text(`${mark} ${text}`, 90, doc.y, { width: W - 18, lineGap: 2 });
        doc.moveDown(0.05);
        continue;
      }

      // Ordered list
      if (/^\d+\.\s/.test(trimmed)) {
        olCounter++;
        const text = stripMarkdown(trimmed.replace(/^\d+\.\s/, ""));
        ensureSpace(doc, 14, title);
        doc.fontSize(10).fillColor(BLACK).font("Helvetica");
        doc.text(`${olCounter}. ${text}`, 90, doc.y, { width: W - 18, lineGap: 2 });
        doc.moveDown(0.05);
        if (i + 1 >= lines.length || !/^\d+\.\s/.test(lines[i + 1].trim())) olCounter = 0;
        continue;
      }

      // Unordered list
      if (/^[-*]\s/.test(trimmed) && !trimmed.startsWith("---")) {
        const text = stripMarkdown(trimmed.replace(/^[-*]\s/, ""));
        ensureSpace(doc, 14, title);
        doc.fontSize(10).fillColor(BLACK).font("Helvetica");
        doc.text(`\u2022 ${text}`, 90, doc.y, { width: W - 18, lineGap: 2 });
        doc.moveDown(0.05);
        continue;
      }

      // Empty
      if (trimmed === "") {
        doc.moveDown(0.15);
        continue;
      }

      // Paragraph
      ensureSpace(doc, 14, title);
      doc.fontSize(10).fillColor(BLACK).font("Helvetica");
      doc.text(stripMarkdown(trimmed), { width: W, lineGap: 2 });
      doc.moveDown(0.15);
    }

    if (blockquoteLines.length > 0) flushBlockquote();

    doc.end();
    stream.on("finish", done);
    stream.on("error", fail);
  });
}

async function main() {
  const target = process.argv[2];
  const dirs = target
    ? PROTOCOL_DIRS.filter((d) => d.includes(target))
    : PROTOCOL_DIRS;

  if (dirs.length === 0) {
    console.error(`No matching protocol found for: ${target}`);
    process.exit(1);
  }

  for (const dir of dirs) {
    const mdFile = resolve(PROTOCOLS_BASE, dir, `${dir}.md`);
    const pdfFile = resolve(PROTOCOLS_BASE, dir, `${dir}.pdf`);

    if (!existsSync(mdFile)) {
      console.error(`Missing: ${mdFile}`);
      continue;
    }

    const isFuture = dir.includes("future");
    await buildPDF(mdFile, pdfFile, isFuture);

    const sizeKB = (statSync(pdfFile).size / 1024).toFixed(1);
    console.log(`Generated: ${pdfFile} (${sizeKB} KB)`);
  }

  console.log("\nPDF generation complete.");
}

main().catch((err) => {
  console.error("Build failed:", err);
  process.exit(1);
});
