export function Card({
  children,
  color = 'white',
  className = '',
  ...props
}) {
  // Using CSS component classes that auto-switch with theme
  const colorStyles = {
    white: 'card',
    coral: 'card-coral',
    sky: 'card-sky',
    teal: 'card-teal',
    sage: 'card-sage',
  }

  return (
    <div
      className={`${colorStyles[color]} ${className}`}
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
