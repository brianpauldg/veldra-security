import fs from 'fs'
import path from 'path'

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog')

/**
 * Read raw MDX/markdown content for a blog post by slug.
 * Returns the body content (everything after the frontmatter block).
 * Returns null if the file doesn't exist.
 */
export function getPostContent(slug: string): string | null {
  const extensions = ['.mdx', '.md']

  for (const ext of extensions) {
    const filePath = path.join(CONTENT_DIR, `${slug}${ext}`)
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf-8')
      // Strip frontmatter (everything between first --- and second ---)
      const frontmatterEnd = raw.indexOf('---', 3)
      if (frontmatterEnd === -1) return raw
      return raw.slice(frontmatterEnd + 3).trim()
    }
  }

  return null
}

/**
 * Convert markdown to simple HTML for rendering.
 * Handles: headings, paragraphs, bold, italic, links, lists, blockquotes, horizontal rules.
 * Not a full markdown parser — covers the patterns used in Bloom's articles.
 */
export function markdownToHtml(markdown: string): string {
  const lines = markdown.split('\n')
  const output: string[] = []
  let inList = false
  let listType: 'ul' | 'ol' = 'ul'

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i]

    // Close list if we're in one and hit a non-list line
    if (inList && !line.match(/^(\d+\.\s|- |\* )/) && line.trim() !== '') {
      output.push(listType === 'ul' ? '</ul>' : '</ol>')
      inList = false
    }

    // Blank line
    if (line.trim() === '') {
      if (inList) {
        output.push(listType === 'ul' ? '</ul>' : '</ol>')
        inList = false
      }
      continue
    }

    // Headings
    const h6 = line.match(/^######\s+(.+)/)
    if (h6) { output.push(`<h6>${inline(h6[1])}</h6>`); continue }
    const h5 = line.match(/^#####\s+(.+)/)
    if (h5) { output.push(`<h5>${inline(h5[1])}</h5>`); continue }
    const h4 = line.match(/^####\s+(.+)/)
    if (h4) { output.push(`<h4>${inline(h4[1])}</h4>`); continue }
    const h3 = line.match(/^###\s+(.+)/)
    if (h3) { output.push(`<h3>${inline(h3[1])}</h3>`); continue }
    const h2 = line.match(/^##\s+(.+)/)
    if (h2) { output.push(`<h2>${inline(h2[1])}</h2>`); continue }
    const h1 = line.match(/^#\s+(.+)/)
    if (h1) { output.push(`<h1>${inline(h1[1])}</h1>`); continue }

    // Horizontal rule
    if (line.match(/^(-{3,}|\*{3,}|_{3,})$/)) {
      output.push('<hr />')
      continue
    }

    // Blockquote
    if (line.startsWith('> ')) {
      output.push(`<blockquote><p>${inline(line.slice(2))}</p></blockquote>`)
      continue
    }

    // Unordered list
    const ul = line.match(/^[-*]\s+(.+)/)
    if (ul) {
      if (!inList || listType !== 'ul') {
        if (inList) output.push(listType === 'ul' ? '</ul>' : '</ol>')
        output.push('<ul>')
        inList = true
        listType = 'ul'
      }
      output.push(`<li>${inline(ul[1])}</li>`)
      continue
    }

    // Ordered list
    const ol = line.match(/^\d+\.\s+(.+)/)
    if (ol) {
      if (!inList || listType !== 'ol') {
        if (inList) output.push(listType === 'ul' ? '</ul>' : '</ol>')
        output.push('<ol>')
        inList = true
        listType = 'ol'
      }
      output.push(`<li>${inline(ol[1])}</li>`)
      continue
    }

    // Paragraph
    output.push(`<p>${inline(line)}</p>`)
  }

  if (inList) {
    output.push(listType === 'ul' ? '</ul>' : '</ol>')
  }

  return output.join('\n')
}

/** Process inline markdown: bold, italic, links, inline code */
function inline(text: string): string {
  return text
    // Links: [text](url)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // Bold + italic: ***text***
    .replace(/\*{3}([^*]+)\*{3}/g, '<strong><em>$1</em></strong>')
    // Bold: **text**
    .replace(/\*{2}([^*]+)\*{2}/g, '<strong>$1</strong>')
    // Italic: *text*
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    // Inline code: `text`
    .replace(/`([^`]+)`/g, '<code>$1</code>')
}
