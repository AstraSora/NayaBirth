import { Link } from 'react-router-dom'

export function Header({ showBack = false, onBack, title }) {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 safe-area-top">
      <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
        <div className="w-10">
          {showBack && (
            <button
              onClick={onBack}
              className="p-2 -ml-2 text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Go back"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
        </div>

        <div className="flex-1 text-center">
          {title ? (
            <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
          ) : (
            <Link to="/" className="inline-flex items-center gap-2">
              <span className="text-xl">🌸</span>
              <span className="font-bold text-gray-800">NayaBirth</span>
            </Link>
          )}
        </div>

        <div className="w-10" />
      </div>
    </header>
  )
}
