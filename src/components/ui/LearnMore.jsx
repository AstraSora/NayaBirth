import { useState } from 'react'
import { parseMarkdown } from '../../utils/parseMarkdown'

export function LearnMore({ children, className = '' }) {
  const [isOpen, setIsOpen] = useState(false)

  // If children is a string, parse markdown to render citations as links
  const content = typeof children === 'string'
    ? <span dangerouslySetInnerHTML={{ __html: parseMarkdown(children) }} />
    : children

  return (
    <div className={`mt-3 ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm text-coral-500 hover:text-coral-600 transition-colors"
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
        <div className="mt-3 p-4 bg-muted rounded-xl text-sm text-foreground-secondary animate-fade-in">
          {content}
        </div>
      )}
    </div>
  )
}
