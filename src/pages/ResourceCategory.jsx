import { useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { Header } from '../components/layout/Header'
import { Card, CardContent } from '../components/ui/Card'
import resourcesData from '../data/resources.json'

// Parse markdown text: **bold** and [link text](url)
function parseMarkdown(text) {
  if (!text) return ''
  return text
    // First convert markdown links to HTML anchors
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-coral-600 dark:text-coral-400 hover:text-coral-700 dark:hover:text-coral-300 underline decoration-coral-300 dark:decoration-coral-600 hover:decoration-coral-500 dark:hover:decoration-coral-400 inline-flex items-center gap-0.5">$1<svg class="w-3 h-3 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg></a>'
    )
    // Then convert bold text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
}

export function ResourceCategory() {
  const navigate = useNavigate()
  const { category: categoryId } = useParams()
  const [expandedArticle, setExpandedArticle] = useState(null)

  const category = resourcesData.categories.find(c => c.id === categoryId)

  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-warm flex flex-col">
        <Header showBack onBack={() => navigate('/resources')} title="Not Found" />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <div className="text-4xl mb-4" aria-hidden="true">🔍</div>
            <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Category not found</h1>
            <Link
              to="/resources"
              className="text-coral-600 hover:text-coral-700 focus:outline-none focus:ring-2 focus:ring-coral-300 rounded px-2 py-1"
            >
              View all resources →
            </Link>
          </div>
        </main>
      </div>
    )
  }

  const colorStyles = {
    coral: 'text-coral-600',
    sky: 'text-sky-600',
    teal: 'text-teal-600',
    sage: 'text-green-600',
  }

  const toggleArticle = (articleId) => {
    setExpandedArticle(expandedArticle === articleId ? null : articleId)
  }

  return (
    <div className="min-h-screen bg-gradient-warm flex flex-col">
      <Header showBack onBack={() => navigate('/resources')} title={category.title} />

      <main className="flex-1 max-w-lg mx-auto px-4 py-6 w-full">
        {/* Hero Image */}
        {category.heroImage && (
          <div className="relative mb-6 rounded-2xl overflow-hidden shadow-soft aspect-[16/9]">
            <img
              src={category.heroImage.url}
              alt={category.heroImage.alt}
              loading="lazy"
              className="w-full h-full object-cover"
              style={category.heroImage.objectPosition ? { objectPosition: category.heroImage.objectPosition } : undefined}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <div className="text-3xl mb-1" aria-hidden="true">{category.icon}</div>
              <h1 className="text-xl font-bold drop-shadow-md">{category.title}</h1>
              <p className="text-sm text-white/90 drop-shadow-sm">{category.description}</p>
            </div>
          </div>
        )}

        {/* Category Header (fallback if no hero image) */}
        {!category.heroImage && (
          <div className="text-center mb-6">
            <div className="text-5xl mb-3" aria-hidden="true">{category.icon}</div>
            <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100 dark:text-gray-100">{category.title}</h1>
            <p className="text-gray-700 dark:text-gray-300 text-sm">{category.description}</p>
          </div>
        )}

        {/* Articles List */}
        <div className="space-y-3">
          {category.resources.map((resource) => (
            <article key={resource.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-card dark:shadow-none overflow-hidden">
              {/* Article Header - Clickable */}
              <button
                onClick={() => toggleArticle(resource.id)}
                aria-expanded={expandedArticle === resource.id}
                aria-controls={`article-${resource.id}`}
                className="w-full text-left p-5 min-h-[72px] hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-coral-300"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <h2 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">{resource.title}</h2>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{resource.summary}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`text-xs font-medium ${colorStyles[category.color]}`}>
                        {resource.type === 'article' ? '📄 Article' : '🔗 Link'}
                      </span>
                    </div>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform flex-shrink-0 ${
                      expandedArticle === resource.id ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Expanded Content */}
              {expandedArticle === resource.id && (
                <div id={`article-${resource.id}`} className="border-t border-gray-100 dark:border-gray-700 animate-fade-in">
                  <div className="p-5 pt-4">
                    {/* Article Image */}
                    {resource.image && (
                      <div className="mb-4 rounded-xl overflow-hidden shadow-soft aspect-[4/3]">
                        <img
                          src={resource.image.url}
                          alt={resource.image.alt}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="prose prose-sm max-w-none">
                      {resource.content.split('\n\n').map((paragraph, index) => {
                        // Split paragraph into lines to handle mixed content
                        const lines = paragraph.split('\n')

                        // Check if this paragraph contains list items
                        const hasListItems = lines.some(line => line.trim().startsWith('- '))

                        // Handle pure bold headers (single line, starts and ends with **)
                        if (lines.length === 1 && paragraph.startsWith('**') && paragraph.endsWith('**')) {
                          return (
                            <h3 key={index} className="font-semibold text-gray-800 dark:text-gray-100 mt-4 mb-2">
                              {paragraph.slice(2, -2)}
                            </h3>
                          )
                        }

                        // Handle paragraphs with mixed content (headers + lists or just lists)
                        if (hasListItems) {
                          const elements = []
                          let currentList = []

                          lines.forEach((line, lineIndex) => {
                            const trimmedLine = line.trim()

                            // Bold header line (ends with **)
                            if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
                              // Flush any pending list items
                              if (currentList.length > 0) {
                                elements.push(
                                  <ul key={`list-${lineIndex}`} className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 my-2">
                                    {currentList.map((item, i) => (
                                      <li key={i} dangerouslySetInnerHTML={{
                                        __html: parseMarkdown(item)
                                      }} />
                                    ))}
                                  </ul>
                                )
                                currentList = []
                              }
                              elements.push(
                                <h4 key={`h-${lineIndex}`} className="font-semibold text-gray-800 dark:text-gray-100 mt-3 mb-1">
                                  {trimmedLine.slice(2, -2)}
                                </h4>
                              )
                            }
                            // Bold header with colon (inline header like "**First few days:**")
                            else if (trimmedLine.startsWith('**') && trimmedLine.includes(':**')) {
                              // Flush any pending list items
                              if (currentList.length > 0) {
                                elements.push(
                                  <ul key={`list-${lineIndex}`} className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 my-2">
                                    {currentList.map((item, i) => (
                                      <li key={i} dangerouslySetInnerHTML={{
                                        __html: parseMarkdown(item)
                                      }} />
                                    ))}
                                  </ul>
                                )
                                currentList = []
                              }
                              elements.push(
                                <h4 key={`h-${lineIndex}`} className="font-semibold text-gray-800 dark:text-gray-100 mt-3 mb-1" dangerouslySetInnerHTML={{
                                  __html: parseMarkdown(trimmedLine)
                                }} />
                              )
                            }
                            // List item
                            else if (trimmedLine.startsWith('- ')) {
                              currentList.push(trimmedLine.slice(2))
                            }
                            // Regular text line
                            else if (trimmedLine) {
                              // Flush any pending list items
                              if (currentList.length > 0) {
                                elements.push(
                                  <ul key={`list-${lineIndex}`} className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 my-2">
                                    {currentList.map((item, i) => (
                                      <li key={i} dangerouslySetInnerHTML={{
                                        __html: parseMarkdown(item)
                                      }} />
                                    ))}
                                  </ul>
                                )
                                currentList = []
                              }
                              elements.push(
                                <p key={`p-${lineIndex}`} className="text-gray-700 dark:text-gray-300 my-1" dangerouslySetInnerHTML={{
                                  __html: parseMarkdown(trimmedLine)
                                }} />
                              )
                            }
                          })

                          // Flush any remaining list items
                          if (currentList.length > 0) {
                            elements.push(
                              <ul key={`list-final`} className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 my-2">
                                {currentList.map((item, i) => (
                                  <li key={i} dangerouslySetInnerHTML={{
                                    __html: parseMarkdown(item)
                                  }} />
                                ))}
                              </ul>
                            )
                          }

                          return <div key={index}>{elements}</div>
                        }

                        // Regular paragraph (no list items)
                        return (
                          <p
                            key={index}
                            className="text-gray-700 dark:text-gray-300 my-2"
                            dangerouslySetInnerHTML={{
                              __html: parseMarkdown(paragraph)
                            }}
                          />
                        )
                      })}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                      {resource.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>

        {/* Back to all resources */}
        <div className="mt-6 text-center">
          <Link
            to="/resources"
            className="text-coral-600 dark:text-coral-400 hover:text-coral-700 dark:hover:text-coral-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-coral-300 rounded px-2 py-1"
          >
            ← All Resources
          </Link>
        </div>
      </main>
    </div>
  )
}
