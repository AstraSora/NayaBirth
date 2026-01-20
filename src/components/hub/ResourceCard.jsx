import { Link } from 'react-router-dom'

export function ResourceCard({ to, icon, title, color = 'sky' }) {
  const colorStyles = {
    coral: 'bg-coral-100 dark:bg-gray-700 text-coral-600 dark:text-coral-400',
    sky: 'bg-sky-100 dark:bg-gray-700 text-sky-600 dark:text-sky-400',
    teal: 'bg-teal-100 dark:bg-gray-700 text-teal-600 dark:text-teal-400',
    sage: 'bg-sage-100 dark:bg-gray-700 text-sage-600 dark:text-sage-400',
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
      className={`flex flex-col items-center gap-2 p-4 min-h-[100px] rounded-xl bg-white dark:bg-gray-800 shadow-card dark:shadow-none hover:shadow-soft dark:hover:shadow-none transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-gray-900 ${focusStyles[color]}`}
      aria-label={`${title} resources`}
    >
      <div className={`w-14 h-14 rounded-full flex items-center justify-center text-3xl ${colorStyles[color]}`} aria-hidden="true">
        {icon}
      </div>
      <span className="text-sm font-medium text-gray-800 dark:text-gray-100 text-center leading-tight">{title}</span>
    </Link>
  )
}
