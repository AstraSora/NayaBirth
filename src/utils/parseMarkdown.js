/**
 * Parse markdown text and convert to HTML
 * Supports: [link text](url) and **bold**
 *
 * Used for inline citations throughout the app.
 */
export function parseMarkdown(text) {
  if (!text) return ''
  return text
    // Convert markdown links to HTML anchors with external link icon
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-coral-600 hover:text-coral-700 underline decoration-coral-300 hover:decoration-coral-500 inline-flex items-center gap-0.5">$1<svg class="w-3 h-3 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg></a>'
    )
    // Convert bold text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
}

/**
 * React component helper - renders text with parsed markdown
 * Use with dangerouslySetInnerHTML
 */
export function createMarkdownHtml(text) {
  return { __html: parseMarkdown(text) }
}
