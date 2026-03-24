export interface ArticleFrontmatter {
  title: string
  date: string
  summary: string
  tags: string[]
  slug: string
}

export interface ArticleEntry extends ArticleFrontmatter {
  content: string
  html: string
  readingMinutes: number
}

const articleModules = import.meta.glob('./articles/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function parseFrontmatter(source: string) {
  const normalized = source.replace(/\r\n/g, '\n')

  if (!normalized.startsWith('---\n')) {
    throw new Error('Markdown article is missing frontmatter.')
  }

  const closingIndex = normalized.indexOf('\n---\n', 4)

  if (closingIndex === -1) {
    throw new Error('Markdown article frontmatter is not closed properly.')
  }

  const rawFrontmatter = normalized.slice(4, closingIndex)
  const content = normalized.slice(closingIndex + 5).trim()
  const metadata: Record<string, string | string[]> = {}
  let activeListKey = ''

  for (const line of rawFrontmatter.split('\n')) {
    if (!line.trim()) {
      continue
    }

    const listMatch = line.match(/^\s*-\s+(.*)$/)
    if (listMatch && activeListKey) {
      const current = metadata[activeListKey]
      const nextValue = listMatch[1].trim()
      metadata[activeListKey] = Array.isArray(current) ? [...current, nextValue] : [nextValue]
      continue
    }

    const separatorIndex = line.indexOf(':')
    if (separatorIndex === -1) {
      continue
    }

    const key = line.slice(0, separatorIndex).trim()
    const rawValue = line.slice(separatorIndex + 1).trim()
    activeListKey = ''

    if (!rawValue) {
      metadata[key] = []
      activeListKey = key
      continue
    }

    metadata[key] = rawValue
  }

  return {
    frontmatter: {
      title: String(metadata.title ?? ''),
      date: String(metadata.date ?? ''),
      summary: String(metadata.summary ?? ''),
      tags: Array.isArray(metadata.tags) ? metadata.tags : [],
      slug: String(metadata.slug ?? ''),
    },
    content,
  }
}

function renderInlineMarkdown(text: string) {
  return escapeHtml(text)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
}

function renderMarkdownToHtml(source: string) {
  const lines = source.replace(/\r\n/g, '\n').split('\n')
  const html: string[] = []
  let inList = false
  let inOrderedList = false
  let inCodeBlock = false
  let codeBuffer: string[] = []

  const flushLists = () => {
    if (inList) {
      html.push('</ul>')
      inList = false
    }

    if (inOrderedList) {
      html.push('</ol>')
      inOrderedList = false
    }
  }

  const flushCodeBlock = () => {
    if (inCodeBlock) {
      html.push(`<pre><code>${escapeHtml(codeBuffer.join('\n'))}</code></pre>`)
      inCodeBlock = false
      codeBuffer = []
    }
  }

  for (const line of lines) {
    if (line.startsWith('```')) {
      flushLists()
      if (inCodeBlock) {
        flushCodeBlock()
      } else {
        inCodeBlock = true
      }
      continue
    }

    if (inCodeBlock) {
      codeBuffer.push(line)
      continue
    }

    if (!line.trim()) {
      flushLists()
      continue
    }

    const headingMatch = line.match(/^(#{1,3})\s+(.*)$/)
    if (headingMatch) {
      flushLists()
      const level = headingMatch[1].length
      html.push(`<h${level}>${renderInlineMarkdown(headingMatch[2])}</h${level}>`)
      continue
    }

    const unorderedMatch = line.match(/^\s*-\s+(.*)$/)
    if (unorderedMatch) {
      if (!inList) {
        flushLists()
        html.push('<ul>')
        inList = true
      }
      html.push(`<li>${renderInlineMarkdown(unorderedMatch[1])}</li>`)
      continue
    }

    const orderedMatch = line.match(/^\d+\.\s+(.*)$/)
    if (orderedMatch) {
      if (!inOrderedList) {
        flushLists()
        html.push('<ol>')
        inOrderedList = true
      }
      html.push(`<li>${renderInlineMarkdown(orderedMatch[1])}</li>`)
      continue
    }

    flushLists()
    html.push(`<p>${renderInlineMarkdown(line)}</p>`)
  }

  flushLists()
  flushCodeBlock()

  return html.join('\n')
}

function estimateReadingMinutes(content: string) {
  const wordCount = content
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean).length

  return Math.max(1, Math.ceil(wordCount / 180))
}

function buildArticleEntry(rawSource: string): ArticleEntry {
  const { frontmatter, content } = parseFrontmatter(rawSource)

  if (!frontmatter.title || !frontmatter.date || !frontmatter.summary || !frontmatter.slug) {
    throw new Error(`Article frontmatter is incomplete for slug "${frontmatter.slug || 'unknown'}".`)
  }

  return {
    ...frontmatter,
    content,
    html: renderMarkdownToHtml(content),
    readingMinutes: estimateReadingMinutes(content),
  }
}

export const articles = Object.values(articleModules)
  .map((rawSource) => buildArticleEntry(rawSource))
  .sort((left, right) => right.date.localeCompare(left.date))

export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug)
}