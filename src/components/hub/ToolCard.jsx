import { Link } from 'react-router-dom'

export function ToolCard({ to, icon, title, description, color = 'coral' }) {
  const colorStyles = {
    coral: 'bg-gradient-to-br from-coral-50 to-coral-100 hover:from-coral-100 hover:to-coral-200',
    sky: 'bg-gradient-to-br from-sky-50 to-sky-100 hover:from-sky-100 hover:to-sky-200',
    teal: 'bg-gradient-to-br from-teal-300/20 to-teal-400/30 hover:from-teal-300/30 hover:to-teal-400/40',
    sage: 'bg-gradient-to-br from-sage-50 to-sage-100 hover:from-sage-100 hover:to-sage-200',
  }

  return (
    <Link
      to={to}
      className={`block rounded-2xl shadow-card p-5 transition-all duration-200 active:scale-[0.98] ${colorStyles[color]}`}
    >
      <div className="flex items-start gap-4">
        <div className="text-4xl flex-shrink-0">{icon}</div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800 text-lg mb-1">{title}</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
        </div>
        <div className="flex-shrink-0 text-gray-400">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  )
}
