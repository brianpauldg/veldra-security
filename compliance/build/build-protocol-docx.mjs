#!/usr/bin/env node

/**
 * build-protocol-docx.mjs
 *
 * Generates DOCX files for SOP-004 injection protocol attachments
 * using the docx npm package (no pandoc dependency).
 *
 * Usage:
 *   node build-protocol-docx.mjs                    # Build all protocols
 *   node build-protocol-docx.mjs protocol-001       # Build specific protocol
 *
 * Output:
 *   DOCX files placed alongside each protocol's .md source
 */

import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  AlignmentType,
  Header,
  Footer,
  PageNumber,
  NumberFormat,
  ShadingType,
} from "docx";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve, dirname, basename } from "node:path";

const BRONZE = "8B6F47";
const WARM_TINT = "FAF3E8";
const BLACK = "000000";
const GRAY = "666666";

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

// --- Markdown parser (simple line-based) ---

function parseMarkdown(content) {
  const lines = content.split("\n");
  const sections = [];
  let current = { heading: "", level: 0, lines: [] };
  let inFrontmatter = false;
  let frontmatterDone = false;

  for (const line of lines) {
    if (line.trim() === "---" && !frontmatterDone) {
      if (inFrontmatter) {
        frontmatterDone = true;
        inFrontmatter = false;
      } else {
        inFrontmatter = true;
      }
      continue;
    }
    if (inFrontmatter) continue;

    const h1 = line.match(/^# (.+)/);
    const h2 = line.match(/^## (.+)/);
    const h3 = line.match(/^### (.+)/);

    if (h1 || h2 || h3) {
      if (current.heading || current.lines.length > 0) {
        sections.push({ ...current });
      }
      const match = h1 || h2 || h3;
      current = {
        heading: match[1],
        level: h1 ? 1 : h2 ? 2 : 3,
        lines: [],
      };
    } else {
      current.lines.push(line);
    }
  }
  if (current.heading || current.lines.length > 0) {
    sections.push(current);
  }

  return sections;
}

function isBlockquote(line) {
  return line.startsWith("> ");
}

function isTableRow(line) {
  return line.startsWith("|") && line.endsWith("|");
}

function isTableSeparator(line) {
  return /^\|[\s\-|]+\|$/.test(line);
}

function isChecklist(line) {
  return line.startsWith("- [ ] ") || line.startsWith("- [x] ");
}

function isList(line) {
  return /^\d+\.\s/.test(line) || /^[-*]\s/.test(line);
}

// --- DOCX paragraph builders ---

function makeHeading(text, level) {
  const headingLevel =
    level === 1
      ? HeadingLevel.HEADING_1
      : level === 2
      ? HeadingLevel.HEADING_2
      : HeadingLevel.HEADING_3;

  return new Paragraph({
    heading: headingLevel,
    spacing: { before: level === 1 ? 400 : 300, after: 120 },
    children: [
      new TextRun({
        text,
        font: "Calibri",
        size: level === 1 ? 32 : level === 2 ? 26 : 22,
        bold: level <= 2,
        color: BLACK,
      }),
    ],
    border: level === 2
      ? { bottom: { style: BorderStyle.SINGLE, size: 2, color: BRONZE } }
      : undefined,
  });
}

function makeCalloutBox(lines, isFuture) {
  const text = lines.map((l) => l.replace(/^>\s?/, "")).join(" ");
  const bgColor = isFuture ? "FFF3CD" : WARM_TINT;

  return new Paragraph({
    spacing: { before: 200, after: 200 },
    shading: { type: ShadingType.CLEAR, fill: bgColor },
    border: {
      top: { style: BorderStyle.SINGLE, size: 1, color: BRONZE },
      bottom: { style: BorderStyle.SINGLE, size: 1, color: BRONZE },
      left: { style: BorderStyle.SINGLE, size: 4, color: BRONZE },
      right: { style: BorderStyle.SINGLE, size: 1, color: BRONZE },
    },
    children: [
      new TextRun({
        text,
        font: "Calibri",
        size: 20,
        italics: true,
        color: "5A4A2A",
      }),
    ],
  });
}

function makeBodyParagraph(text) {
  if (!text.trim()) return new Paragraph({ spacing: { after: 60 } });

  // Handle bold markers
  const parts = [];
  const regex = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(
        new TextRun({
          text: text.slice(lastIndex, match.index),
          font: "Calibri",
          size: 21,
          color: BLACK,
        })
      );
    }
    parts.push(
      new TextRun({
        text: match[1],
        font: "Calibri",
        size: 21,
        bold: true,
        color: BLACK,
      })
    );
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(
      new TextRun({
        text: text.slice(lastIndex),
        font: "Calibri",
        size: 21,
        color: BLACK,
      })
    );
  }

  return new Paragraph({
    spacing: { after: 80, line: 276 },
    children: parts,
  });
}

function makeListItem(text, ordered, number) {
  const cleanText = ordered
    ? text.replace(/^\d+\.\s/, "")
    : text.replace(/^[-*]\s/, "");
  const prefix = ordered ? `${number}. ` : "\u2022 ";

  return new Paragraph({
    spacing: { after: 40, line: 276 },
    indent: { left: 360 },
    children: [
      new TextRun({
        text: prefix + cleanText,
        font: "Calibri",
        size: 21,
        color: BLACK,
      }),
    ],
  });
}

function makeChecklistItem(text) {
  const checked = text.startsWith("- [x] ");
  const cleanText = text.replace(/^- \[[ x]\] /, "");
  const prefix = checked ? "\u2611 " : "\u2610 ";

  return new Paragraph({
    spacing: { after: 40, line: 276 },
    indent: { left: 360 },
    children: [
      new TextRun({
        text: prefix + cleanText,
        font: "Calibri",
        size: 21,
        color: BLACK,
      }),
    ],
  });
}

function makeTable(rows) {
  const headerRow = rows[0];
  const dataRows = rows.slice(1);

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        tableHeader: true,
        children: headerRow.map(
          (cell) =>
            new TableCell({
              shading: { type: ShadingType.CLEAR, fill: "F0E8DA" },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: cell,
                      font: "Calibri",
                      size: 18,
                      bold: true,
                      color: BLACK,
                    }),
                  ],
                }),
              ],
            })
        ),
      }),
      ...dataRows.map(
        (row) =>
          new TableRow({
            children: row.map(
              (cell) =>
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: cell,
                          font: "Calibri",
                          size: 18,
                          color: BLACK,
                        }),
                      ],
                    }),
                  ],
                })
            ),
          })
      ),
    ],
  });
}

function parseTableLines(lines) {
  return lines
    .filter((l) => !isTableSeparator(l))
    .map((l) =>
      l
        .split("|")
        .filter((c) => c.trim() !== "")
        .map((c) => c.trim())
    );
}

// --- Build document ---

function buildDocument(mdPath, isFuture) {
  const content = readFileSync(mdPath, "utf-8");
  const sections = parseMarkdown(content);

  // Extract title from frontmatter
  const frontmatterMatch = content.match(/title:\s*"(.+?)"/);
  const title = frontmatterMatch ? frontmatterMatch[1] : basename(mdPath, ".md");

  const children = [];

  for (const section of sections) {
    if (section.heading) {
      children.push(makeHeading(section.heading, section.level));
    }

    let i = 0;
    const lines = section.lines;

    while (i < lines.length) {
      const line = lines[i];

      // Blockquote
      if (isBlockquote(line)) {
        const blockLines = [];
        while (i < lines.length && isBlockquote(lines[i])) {
          blockLines.push(lines[i]);
          i++;
        }
        children.push(makeCalloutBox(blockLines, isFuture));
        continue;
      }

      // Table
      if (isTableRow(line)) {
        const tableLines = [];
        while (i < lines.length && isTableRow(lines[i])) {
          tableLines.push(lines[i]);
          i++;
        }
        const parsed = parseTableLines(tableLines);
        if (parsed.length > 0) {
          children.push(makeTable(parsed));
        }
        continue;
      }

      // Checklist
      if (isChecklist(line)) {
        children.push(makeChecklistItem(line));
        i++;
        continue;
      }

      // Ordered list
      if (/^\d+\.\s/.test(line)) {
        let num = 1;
        while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
          children.push(makeListItem(lines[i], true, num));
          num++;
          i++;
        }
        continue;
      }

      // Unordered list
      if (/^[-*]\s/.test(line)) {
        while (i < lines.length && /^[-*]\s/.test(lines[i])) {
          children.push(makeListItem(lines[i], false, 0));
          i++;
        }
        continue;
      }

      // Horizontal rule
      if (line.trim() === "---") {
        children.push(
          new Paragraph({
            spacing: { before: 120, after: 120 },
            border: {
              bottom: { style: BorderStyle.SINGLE, size: 1, color: BRONZE },
            },
          })
        );
        i++;
        continue;
      }

      // Italic line (starts with *)
      if (line.startsWith("*") && line.endsWith("*") && !line.startsWith("**")) {
        children.push(
          new Paragraph({
            spacing: { after: 80, line: 276 },
            children: [
              new TextRun({
                text: line.replace(/^\*|\*$/g, ""),
                font: "Calibri",
                size: 20,
                italics: true,
                color: GRAY,
              }),
            ],
          })
        );
        i++;
        continue;
      }

      // Regular paragraph
      children.push(makeBodyParagraph(line));
      i++;
    }
  }

  const doc = new Document({
    styles: {
      default: {
        document: {
          run: { font: "Calibri", size: 21, color: BLACK },
          paragraph: { spacing: { line: 276 } },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
            pageNumbers: { start: 1 },
          },
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: "BLOOM METABOLICS",
                    font: "Calibri",
                    size: 16,
                    bold: true,
                    color: BRONZE,
                  }),
                  new TextRun({
                    text: "          Confidential — Patient Use",
                    font: "Calibri",
                    size: 16,
                    color: GRAY,
                  }),
                ],
                border: {
                  bottom: {
                    style: BorderStyle.SINGLE,
                    size: 1,
                    color: BRONZE,
                  },
                },
              }),
            ],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                border: {
                  top: {
                    style: BorderStyle.SINGLE,
                    size: 1,
                    color: BRONZE,
                  },
                },
                children: [
                  new TextRun({
                    text: title,
                    font: "Calibri",
                    size: 16,
                    color: GRAY,
                  }),
                  new TextRun({
                    text: "          Page ",
                    font: "Calibri",
                    size: 16,
                    color: GRAY,
                  }),
                  new TextRun({
                    children: [PageNumber.CURRENT],
                    font: "Calibri",
                    size: 16,
                    color: GRAY,
                  }),
                ],
              }),
            ],
          }),
        },
        children,
      },
    ],
  });

  return doc;
}

// --- Main ---

async function main() {
  const target = process.argv[2]; // optional: "protocol-001" etc.
  const dirs = target
    ? PROTOCOL_DIRS.filter((d) => d.includes(target))
    : PROTOCOL_DIRS;

  if (dirs.length === 0) {
    console.error(`No matching protocol found for: ${target}`);
    console.error("Available:", PROTOCOL_DIRS.join(", "));
    process.exit(1);
  }

  for (const dir of dirs) {
    const mdFile = resolve(PROTOCOLS_BASE, dir, `${dir}.md`);
    const docxFile = resolve(PROTOCOLS_BASE, dir, `${dir}.docx`);

    if (!existsSync(mdFile)) {
      console.error(`Missing: ${mdFile}`);
      continue;
    }

    const isFuture = dir.includes("future");
    const doc = buildDocument(mdFile, isFuture);
    const buffer = await Packer.toBuffer(doc);
    writeFileSync(docxFile, buffer);

    const sizeKB = (buffer.length / 1024).toFixed(1);
    console.log(`Generated: ${docxFile} (${sizeKB} KB)`);
  }

  console.log("\nDOCX generation complete.");
}

main().catch((err) => {
  console.error("Build failed:", err);
  process.exit(1);
});
