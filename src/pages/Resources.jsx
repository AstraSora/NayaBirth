import { useNavigate, Link } from 'react-router-dom'
import { Header } from '../components/layout/Header'
import { Card, CardContent } from '../components/ui/Card'
import resourcesData from '../data/resources.json'

export function Resources() {
  const navigate = useNavigate()

  const colorStyles = {
    coral: 'bg-gradient-to-br from-coral-50 to-coral-100',
    sky: 'bg-gradient-to-br from-sky-50 to-sky-100',
    teal: 'bg-gradient-to-br from-teal-300/20 to-teal-400/30',
    sage: 'bg-gradient-to-br from-sage-50 to-sage-100',
  }

  return (
    <div className="min-h-screen bg-gradient-warm flex flex-col">
      <Header showBack onBack={() => navigate('/')} title="Resources" />

      <main className="flex-1 max-w-lg mx-auto px-4 py-6 w-full">
        {/* Intro */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">📚</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Pregnancy & Parenting Resources
          </h2>
          <p className="text-gray-600 text-sm">
            Information to support you through pregnancy, birth, and beyond.
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-4">
          {resourcesData.categories.map((category) => (
            <Link
              key={category.id}
              to={`/resources/${category.id}`}
              className={`block rounded-2xl shadow-card p-5 transition-all duration-200 active:scale-[0.98] hover:shadow-soft ${colorStyles[category.color]}`}
            >
              <div className="flex items-center gap-4">
                <div className="text-4xl">{category.icon}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 text-lg">{category.title}</h3>
                  <p className="text-sm text-gray-600">{category.description}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {category.resources.length} articles
                  </p>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-8 bg-gray-50 rounded-xl p-4 text-sm text-gray-500">
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
