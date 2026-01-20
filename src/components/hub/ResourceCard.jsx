import { Link } from 'react-router-dom'

export function ResourceCard({ to, icon, title, color = 'sky' }) {
  const colorStyles = {
    coral: 'bg-coral-100 text-coral-600',
    sky: 'bg-sky-100 text-sky-600',
    teal: 'bg-teal-400/20 text-teal-600',
    sage: 'bg-sage-100 text-sage-600',
  }

  return (
    <Link
      to={to}
      className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white shadow-card hover:shadow-soft transition-all duration-200 active:scale-95"
    >
      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${colorStyles[color]}`}>
        {icon}
      </div>
      <span className="text-sm font-medium text-gray-700 text-center leading-tight">{title}</span>
    </Link>
  )
}
