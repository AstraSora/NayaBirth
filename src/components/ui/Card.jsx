export function Card({
  children,
  color = 'white',
  className = '',
  ...props
}) {
  const colorStyles = {
    white: 'bg-white dark:bg-gray-800',
    coral: 'bg-gradient-to-br from-coral-50 to-coral-100 dark:from-coral-900/20 dark:to-coral-800/20',
    sky: 'bg-gradient-to-br from-sky-50 to-sky-100 dark:from-sky-900/20 dark:to-sky-800/20',
    teal: 'bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20',
    sage: 'bg-gradient-to-br from-sage-50 to-sage-100 dark:from-sage-900/20 dark:to-sage-800/20',
  }

  return (
    <div
      className={`rounded-2xl shadow-card dark:shadow-none ${colorStyles[color]} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className = '' }) {
  return (
    <div className={`px-5 pt-5 pb-3 ${className}`}>
      {children}
    </div>
  )
}

export function CardContent({ children, className = '' }) {
  return (
    <div className={`px-5 pb-5 ${className}`}>
      {children}
    </div>
  )
}
