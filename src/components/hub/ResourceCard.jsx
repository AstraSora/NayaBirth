import { Link } from 'react-router-dom'

export function ResourceCard({ to, icon, title, color = 'sky' }) {
  // Icon background colors - brand colors that stay consistent
  const colorStyles = {
    coral: 'bg-coral-100 text-coral-600',
    sky: 'bg-sky-100 text-sky-600',
    teal: 'bg-teal-100 text-teal-600',
    sage: 'bg-sage-100 text-sage-600',
  }

  const focusStyles = {
    coral: 'focus:ring-coral-300',
    sky: 'focus:ring-sky-300',
    teal: 'focus:ring-teal-300',
    sage: 'focus:ring-sage-300',
  }

  return (
    <Link
      to={to}
      className={`flex flex-col items-center gap-2 p-4 min-h-[100px] rounded-xl bg-surface shadow-card hover:shadow-soft transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background ${focusStyles[color]}`}
      aria-label={`${title} resources`}
    >
      <div className={`w-14 h-14 rounded-full flex items-center justify-center text-3xl ${colorStyles[color]}`} aria-hidden="true">
        {icon}
      </div>
      <span className="text-sm font-medium text-foreground text-center leading-tight">{title}</span>
    </Link>
  )
}
