import { useState } from 'react'

export function LearnMore({ children, className = '' }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`mt-3 ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm text-coral-500 hover:text-coral-600 transition-colors dark:text-coral-400 dark:hover:text-coral-300"
      >
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
        <span>{isOpen ? 'Hide details' : 'Learn more'}</span>
      </button>

      {isOpen && (
        <div className="mt-3 p-4 bg-sky-50 rounded-xl text-sm text-gray-600 animate-fade-in dark:bg-sky-900/30 dark:text-gray-300">
          {children}
        </div>
      )}
    </div>
  )
}
