import { Link } from 'react-router-dom'

export function ToolCard({ to, icon, title, description, color = 'coral' }) {
  const colorStyles = {
    coral: 'bg-gradient-to-br from-coral-50 to-coral-100 hover:from-coral-100 hover:to-coral-200 dark:from-gray-800 dark:to-gray-800 dark:hover:from-gray-700 dark:hover:to-gray-700 focus:ring-coral-300',
    sky: 'bg-gradient-to-br from-sky-50 to-sky-100 hover:from-sky-100 hover:to-sky-200 dark:from-gray-800 dark:to-gray-800 dark:hover:from-gray-700 dark:hover:to-gray-700 focus:ring-sky-300',
    teal: 'bg-gradient-to-br from-teal-50 to-teal-100 hover:from-teal-100 hover:to-teal-200 dark:from-gray-800 dark:to-gray-800 dark:hover:from-gray-700 dark:hover:to-gray-700 focus:ring-teal-300',
    sage: 'bg-gradient-to-br from-sage-50 to-sage-100 hover:from-sage-100 hover:to-sage-200 dark:from-gray-800 dark:to-gray-800 dark:hover:from-gray-700 dark:hover:to-gray-700 focus:ring-sage-300',
  }

  return (
    <Link
      to={to}
      className={`block rounded-2xl shadow-card dark:shadow-none p-5 min-h-[80px] transition-all duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-gray-900 ${colorStyles[color]}`}
      aria-label={`${title}: ${description}`}
    >
      <div className="flex items-start gap-4">
        <div className="text-4xl flex-shrink-0" aria-hidden="true">{icon}</div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-lg mb-1">{title}</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{description}</p>
        </div>
        <div className="flex-shrink-0 text-gray-500 dark:text-gray-400" aria-hidden="true">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  )
}
