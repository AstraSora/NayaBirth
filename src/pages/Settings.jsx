import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useOnboarding } from '../context/OnboardingContext'
import { Header } from '../components/layout/Header'

export function Settings() {
  const { isDarkMode, toggleDarkMode } = useTheme()
  const { resetOnboarding, profile } = useOnboarding()
  const navigate = useNavigate()
  const [showResetDialog, setShowResetDialog] = useState(false)

  const handleResetOnboarding = () => {
    resetOnboarding()
    setShowResetDialog(false)
    navigate('/onboarding')
  }

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

        {/* Pregnancy Info Section */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Pregnancy Info
          </h2>

          <div className="bg-surface rounded-2xl shadow-card p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-muted flex items-center justify-center text-xl" aria-hidden="true">
                  🤰
                </div>
                <div>
                  <h3 className="font-medium text-foreground">
                    Update Pregnancy Info
                  </h3>
                  <p className="text-sm text-foreground-muted">
                    {profile.stage === 'postpartum' ? 'Postpartum' :
                     profile.trimester ? `Trimester ${profile.trimester}` :
                     'Not set'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowResetDialog(true)}
                className="px-4 py-2 text-sm font-medium text-coral-500 hover:text-coral-600 hover:bg-coral-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-coral-300"
              >
                Reset
              </button>
            </div>
          </div>

          <p className="mt-3 text-sm text-foreground-muted px-2">
            Update your due date or pregnancy stage to get personalized recommendations.
          </p>
        </section>

        {/* Reset Confirmation Dialog */}
        {showResetDialog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="bg-surface rounded-2xl shadow-lg max-w-sm w-full p-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Reset Pregnancy Info?
              </h3>
              <p className="text-foreground-muted mb-6">
                This will restart the welcome setup. Your saved birth plans will not be affected.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowResetDialog(false)}
                  className="flex-1 px-4 py-3 text-foreground-secondary border border-subtle rounded-xl hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-coral-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleResetOnboarding}
                  className="flex-1 px-4 py-3 bg-coral-400 text-white rounded-xl hover:bg-coral-500 transition-colors focus:outline-none focus:ring-2 focus:ring-coral-300"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        )}

        {/* About Section */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            About
          </h2>

          <div className="bg-surface rounded-2xl shadow-card divide-y divide-subtle overflow-hidden">
            {/* App Info */}
            <div className="p-4">
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

            {/* Medical Disclaimer */}
            <div className="p-4">
              <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                <span aria-hidden="true">⚕️</span>
                Medical Disclaimer
              </h4>
              <p className="text-sm text-foreground-muted">
                NayaBirth provides general educational information only and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult your healthcare provider with questions about your pregnancy or medical condition.
              </p>
            </div>

            {/* Content Sources */}
            <div className="p-4">
              <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                <span aria-hidden="true">📚</span>
                Content Sources
              </h4>
              <p className="text-sm text-foreground-muted mb-3">
                Information in this app is informed by guidelines from:
              </p>
              <ul className="text-sm text-foreground-muted space-y-1">
                <li>• American College of Obstetricians and Gynecologists (ACOG)</li>
                <li>• Centers for Disease Control and Prevention (CDC)</li>
                <li>• American Academy of Pediatrics (AAP)</li>
                <li>• World Health Organization (WHO)</li>
                <li>• Cleveland Clinic</li>
                <li>• Mayo Clinic</li>
                <li>• Postpartum Support International</li>
              </ul>
            </div>

            {/* EPDS Attribution */}
            <div className="p-4">
              <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                <span aria-hidden="true">📋</span>
                Screening Tool Attribution
              </h4>
              <p className="text-sm text-foreground-muted">
                The emotional wellbeing screening uses the Edinburgh Postnatal Depression Scale (EPDS), developed by Cox, J.L., Holden, J.M., & Sagovsky, R. (1987). <em>British Journal of Psychiatry</em>, 150, 782-786.
              </p>
            </div>
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
