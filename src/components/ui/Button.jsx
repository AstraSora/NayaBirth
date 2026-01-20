export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-2xl transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900'

  const variants = {
    primary: 'bg-coral-400 hover:bg-coral-500 text-white shadow-soft focus:ring-coral-400',
    secondary: 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 focus:ring-coral-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100 dark:border-gray-600',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-600 focus:ring-gray-300 dark:hover:bg-gray-800 dark:text-gray-300',
    outline: 'bg-transparent border-2 border-coral-400 text-coral-500 hover:bg-coral-50 focus:ring-coral-400 dark:border-coral-400 dark:text-coral-400 dark:hover:bg-coral-400/10',
  }

  const sizes = {
    sm: 'px-4 py-2.5 text-sm min-h-[44px]',
    md: 'px-6 py-3 text-base min-h-[44px]',
    lg: 'px-8 py-4 text-lg min-h-[52px]',
    icon: 'p-3 min-h-[44px] min-w-[44px]',
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Loading...
        </>
      ) : children}
    </button>
  )
}
