export function Card({
  children,
  color = 'white',
  className = '',
  ...props
}) {
  const colorStyles = {
    white: 'bg-white',
    coral: 'bg-gradient-to-br from-coral-50 to-coral-100',
    sky: 'bg-gradient-to-br from-sky-50 to-sky-100',
    teal: 'bg-gradient-to-br from-teal-300/20 to-teal-400/20',
    sage: 'bg-gradient-to-br from-sage-50 to-sage-100',
  }

  return (
    <div
      className={`rounded-2xl shadow-card ${colorStyles[color]} ${className}`}
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
