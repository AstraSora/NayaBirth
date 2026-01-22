import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { Header } from '../components/layout/Header'

export function Settings() {
  const { isDarkMode, toggleDarkMode } = useTheme()

  return (
    <div className="min-h-screen bg-gradient-warm">
      <Header title="Settings" />

      <main className="max-w-lg mx-auto px-4 py-6 pb-12">
        {/* Appearance Section */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Appearance
          </h2>

          <div className="bg-surface rounded-2xl shadow-card divide-y divide-subtle overflow-hidden">
            {/* Dark Mode Toggle */}
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-muted flex items-center justify-center text-xl" aria-hidden="true">
                    {isDarkMode ? '🌙' : '☀️'}
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">
                      Dark Mode
                    </h3>
                    <p className="text-sm text-foreground-muted">
                      {isDarkMode ? 'Enabled' : 'Disabled'}
                    </p>
                  </div>
                </div>

                {/* Toggle Switch */}
                <button
                  onClick={toggleDarkMode}
                  role="switch"
                  aria-checked={isDarkMode}
                  aria-label="Toggle dark mode"
                  className={`
                    relative inline-flex h-8 w-14 items-center rounded-full transition-colors
                    focus:outline-none focus:ring-2 focus:ring-coral-400 focus:ring-offset-2
                    ${isDarkMode ? 'bg-coral-400' : 'bg-gray-300'}
                  `}
                >
                  <span
                    className={`
                      inline-block h-6 w-6 transform rounded-full bg-white transition-transform
                      ${isDarkMode ? 'translate-x-7' : 'translate-x-1'}
                    `}
                  />
                </button>
              </div>
            </div>
          </div>

          <p className="mt-3 text-sm text-foreground-muted px-2">
            Dark mode reduces eye strain in low-light environments and may help save battery on devices with OLED screens.
          </p>
        </section>

        {/* About Section */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            About
          </h2>

          <div className="bg-surface rounded-2xl shadow-card p-4">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl" aria-hidden="true">🌸</span>
              <div>
                <h3 className="font-bold text-foreground">
                  NayaBirth
                </h3>
                <p className="text-sm text-foreground-muted">
                  UCI Pregnancy Hub
                </p>
              </div>
            </div>
            <p className="text-sm text-foreground-muted">
              Your pregnancy resource center providing tools and information to support you through pregnancy, birth, and beyond.
            </p>
          </div>
        </section>

        {/* Back to Home Link */}
        <div className="mt-8">
          <Link
            to="/"
            className="block text-center py-3 text-coral-600 font-medium hover:text-coral-700 transition-colors focus:outline-none focus:ring-2 focus:ring-coral-400 rounded-xl"
          >
            ← Back to Home
          </Link>
        </div>
      </main>
    </div>
  )
}
