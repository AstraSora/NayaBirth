import { Link } from 'react-router-dom'

export function ToolCard({ to, icon, title, description, color = 'coral' }) {
  // Using CSS component classes that auto-switch with theme
  const colorStyles = {
    coral: 'tool-card-coral focus:ring-coral-300',
    sky: 'tool-card-sky focus:ring-sky-300',
    teal: 'tool-card-teal focus:ring-teal-300',
    sage: 'tool-card-sage focus:ring-sage-300',
  }

  return (
    <Link
      to={to}
      className={`block min-h-[80px] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background ${colorStyles[color]}`}
      aria-label={`${title}: ${description}`}
    >
      <div className="flex items-start gap-4">
        <div className="text-4xl flex-shrink-0" aria-hidden="true">{icon}</div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground text-lg mb-1">{title}</h3>
          <p className="text-sm text-foreground-secondary leading-relaxed">{description}</p>
        </div>
        <div className="flex-shrink-0 text-foreground-muted" aria-hidden="true">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  )
}
