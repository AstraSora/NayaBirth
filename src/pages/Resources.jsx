import { useNavigate, Link } from 'react-router-dom'
import { Header } from '../components/layout/Header'
import { Card, CardContent } from '../components/ui/Card'
import resourcesData from '../data/resources.json'

export function Resources() {
  const navigate = useNavigate()

  const colorStyles = {
    coral: 'bg-gradient-to-br from-coral-50 to-coral-100 dark:from-gray-800 dark:to-gray-800 focus:ring-coral-300',
    sky: 'bg-gradient-to-br from-sky-50 to-sky-100 dark:from-gray-800 dark:to-gray-800 focus:ring-sky-300',
    teal: 'bg-gradient-to-br from-teal-50 to-teal-100 dark:from-gray-800 dark:to-gray-800 focus:ring-teal-300',
    sage: 'bg-gradient-to-br from-sage-50 to-sage-100 dark:from-gray-800 dark:to-gray-800 focus:ring-sage-300',
  }

  return (
    <div className="min-h-screen bg-gradient-warm flex flex-col">
      <Header showBack onBack={() => navigate('/')} title="Resources" />

      <main className="flex-1 max-w-lg mx-auto px-4 py-6 w-full">
        {/* Intro */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-3" aria-hidden="true">📚</div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            Pregnancy & Parenting Resources
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            Information to support you through pregnancy, birth, and beyond.
          </p>
        </div>

        {/* Categories */}
        <nav className="space-y-4" aria-label="Resource categories">
          {resourcesData.categories.map((category) => (
            <Link
              key={category.id}
              to={`/resources/${category.id}`}
              className="block rounded-2xl shadow-card dark:shadow-none overflow-hidden transition-all duration-200 active:scale-[0.98] hover:shadow-soft dark:hover:shadow-none focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-gray-900 focus:ring-coral-300 bg-white dark:bg-gray-800"
              aria-label={`${category.title}: ${category.description}. ${category.resources.length} articles`}
            >
              {/* Category Hero Image */}
              {category.heroImage && (
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={category.heroImage.url}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover"
                    style={category.heroImage.objectPosition ? { objectPosition: category.heroImage.objectPosition } : undefined}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-2 left-3 text-white">
                    <span className="text-2xl drop-shadow-md" aria-hidden="true">{category.icon}</span>
                  </div>
                </div>
              )}
              <div className={`p-4 ${!category.heroImage ? colorStyles[category.color] : ''}`}>
                <div className="flex items-center gap-3">
                  {!category.heroImage && (
                    <div className="text-3xl" aria-hidden="true">{category.icon}</div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-lg">{category.title}</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{category.description}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {category.resources.length} articles
                    </p>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 dark:text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </nav>

        {/* Disclaimer */}
        <div className="mt-8 bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-sm text-gray-600 dark:text-gray-300">
          <p>
            This information is for educational purposes only and is not a substitute for
            professional medical advice. Always consult your healthcare provider with
            questions about your health or your baby's health.
          </p>
        </div>
      </main>
    </div>
  )
}
