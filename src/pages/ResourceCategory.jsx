import { useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { Header } from '../components/layout/Header'
import { Card, CardContent } from '../components/ui/Card'
import resourcesData from '../data/resources.json'

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
            <div className="text-4xl mb-4">🔍</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Category not found</h2>
            <Link to="/resources" className="text-coral-500 hover:text-coral-600">
              View all resources →
            </Link>
          </div>
        </main>
      </div>
    )
  }

  const colorStyles = {
    coral: 'text-coral-500',
    sky: 'text-sky-500',
    teal: 'text-teal-500',
    sage: 'text-green-500',
  }

  const toggleArticle = (articleId) => {
    setExpandedArticle(expandedArticle === articleId ? null : articleId)
  }

  return (
    <div className="min-h-screen bg-gradient-warm flex flex-col">
      <Header showBack onBack={() => navigate('/resources')} title={category.title} />

      <main className="flex-1 max-w-lg mx-auto px-4 py-6 w-full">
        {/* Category Header */}
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">{category.icon}</div>
          <h2 className="text-xl font-bold text-gray-800">{category.title}</h2>
          <p className="text-gray-600 text-sm">{category.description}</p>
        </div>

        {/* Articles List */}
        <div className="space-y-3">
          {category.resources.map((resource) => (
            <div key={resource.id} className="bg-white rounded-2xl shadow-card overflow-hidden">
              {/* Article Header - Clickable */}
              <button
                onClick={() => toggleArticle(resource.id)}
                className="w-full text-left p-5 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">{resource.title}</h3>
                    <p className="text-sm text-gray-600">{resource.summary}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`text-xs font-medium ${colorStyles[category.color]}`}>
                        {resource.type === 'article' ? '📄 Article' : '🔗 Link'}
                      </span>
                    </div>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      expandedArticle === resource.id ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Expanded Content */}
              {expandedArticle === resource.id && (
                <div className="border-t border-gray-100 animate-fade-in">
                  <div className="p-5 pt-4">
                    <div className="prose prose-sm max-w-none">
                      {resource.content.split('\n\n').map((paragraph, index) => {
                        // Handle bold text and headers
                        if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                          return (
                            <h4 key={index} className="font-semibold text-gray-800 mt-4 mb-2">
                              {paragraph.slice(2, -2)}
                            </h4>
                          )
                        }

                        // Handle lists
                        if (paragraph.startsWith('- ')) {
                          const items = paragraph.split('\n')
                          return (
                            <ul key={index} className="list-disc list-inside text-gray-600 space-y-1 my-2">
                              {items.map((item, i) => (
                                <li key={i} dangerouslySetInnerHTML={{
                                  __html: item.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                }} />
                              ))}
                            </ul>
                          )
                        }

                        // Regular paragraph
                        return (
                          <p
                            key={index}
                            className="text-gray-600 my-2"
                            dangerouslySetInnerHTML={{
                              __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            }}
                          />
                        )
                      })}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
                      {resource.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 bg-gray-100 text-gray-500 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Back to all resources */}
        <div className="mt-6 text-center">
          <Link
            to="/resources"
            className="text-coral-500 hover:text-coral-600 text-sm font-medium"
          >
            ← All Resources
          </Link>
        </div>
      </main>
    </div>
  )
}
