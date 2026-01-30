import DOMPurify from 'dompurify'

/**
 * Escape HTML entities to prevent XSS
 * @param {string} str - String to escape
 * @returns {string} Escaped string
 */
function escapeHtml(str) {
  const htmlEntities = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }
  return str.replace(/[&<>"']/g, char => htmlEntities[char])
}

/**
 * Validate URL to prevent javascript: and data: protocol attacks
 * @param {string} url - URL to validate
 * @returns {boolean} Whether URL is safe
 */
function isValidUrl(url) {
  // Block dangerous protocols
  const dangerousProtocols = ['javascript:', 'data:', 'vbscript:']
  const lowerUrl = url.toLowerCase().trim()

  for (const protocol of dangerousProtocols) {
    if (lowerUrl.startsWith(protocol)) {
      return false
    }
  }

  // Allow relative URLs, http, https, mailto, tel
  const allowedProtocols = ['http://', 'https://', 'mailto:', 'tel:', '//', '/']
  const isAbsolute = url.includes('://')

  if (isAbsolute) {
    return allowedProtocols.some(protocol => lowerUrl.startsWith(protocol))
  }

  // Relative URLs are allowed
  return true
}

// Configure DOMPurify
const PURIFY_CONFIG = {
  ALLOWED_TAGS: ['a', 'strong', 'em', 'b', 'i', 'svg', 'path'],
  ALLOWED_ATTR: [
    'href', 'target', 'rel', 'class',
    'fill', 'stroke', 'viewBox', 'd',
    'stroke-linecap', 'stroke-linejoin', 'stroke-width'
  ],
  ALLOW_DATA_ATTR: false
}

/**
 * Parse markdown text and convert to HTML with XSS protection
 * Supports: [link text](url) and **bold**
 *
 * Used for inline citations throughout the app.
 */
export function parseMarkdown(text) {
  if (!text) return ''

  // First escape any existing HTML in the text
  let result = escapeHtml(text)

  // Convert markdown links to HTML anchors with external link icon
  // Only allow safe URLs
  result = result.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    (match, linkText, url) => {
      if (!isValidUrl(url)) {
        // Return just the link text for invalid URLs
        return linkText
      }
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-coral-600 hover:text-coral-700 underline decoration-coral-300 hover:decoration-coral-500 inline-flex items-center gap-0.5">${linkText}<svg class="w-3 h-3 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg></a>`
    }
  )

  // Convert bold text
  result = result.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')

  // Final sanitization pass with DOMPurify
  return DOMPurify.sanitize(result, PURIFY_CONFIG)
}

/**
 * React component helper - renders text with parsed markdown
 * Use with dangerouslySetInnerHTML
 */
export function createMarkdownHtml(text) {
  return { __html: parseMarkdown(text) }
}
