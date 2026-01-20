import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Card, CardContent } from '../components/ui/Card'
import UCIHealthLogo from '../assets/uci-health-logo.svg'

export function Welcome() {
  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Hero Section */}
      <div className="max-w-lg mx-auto px-4 pt-12 pb-8">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🌸</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2 dark:text-gray-100">
            NayaBirth
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Your personalized birth plan companion
          </p>
          {/* UCI Health Partnership Badge */}
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-white/70 rounded-full shadow-sm dark:bg-gray-800/70">
            <span className="text-xs text-gray-500 font-medium dark:text-gray-400">In partnership with</span>
            <img
              src={UCIHealthLogo}
              alt="UCI Health"
              className="h-5"
            />
          </div>
        </div>

        {/* Main illustration area */}
        <div className="relative h-48 mb-8 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-b from-coral-100/50 to-transparent rounded-3xl" />
          <div className="text-8xl">👶</div>
        </div>

        {/* Action buttons */}
        <div className="space-y-4">
          <Link to="/birth-plan" className="block">
            <Button variant="primary" className="w-full text-lg py-4">
              Create My Birth Plan
            </Button>
          </Link>

          <Link to="/retrieve" className="block">
            <Button variant="secondary" className="w-full">
              I have a PIN - Continue my plan
            </Button>
          </Link>
        </div>
      </div>

      {/* Info Cards */}
      <div className="max-w-lg mx-auto px-4 pb-12">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 dark:text-gray-100">
          What to expect
        </h2>

        <div className="space-y-4">
          <Card color="sky">
            <CardContent className="flex items-start gap-4 pt-5">
              <div className="text-3xl">📝</div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1 dark:text-gray-100">
                  Share your preferences
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Answer questions about your labor, delivery, and newborn care wishes
                </p>
              </div>
            </CardContent>
          </Card>

          <Card color="coral">
            <CardContent className="flex items-start gap-4 pt-5">
              <div className="text-3xl">💾</div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1 dark:text-gray-100">
                  Save with a PIN
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Get a unique PIN to access and update your plan anytime
                </p>
              </div>
            </CardContent>
          </Card>

          <Card color="teal">
            <CardContent className="flex items-start gap-4 pt-5">
              <div className="text-3xl">🏥</div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1 dark:text-gray-100">
                  Share with your care team
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Download or share your birth plan with UCI Health staff
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="max-w-lg mx-auto px-4 pb-8 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>
          This tool helps you communicate your preferences. Your care team will
          work with you to honor your wishes when possible.
        </p>
      </footer>
    </div>
  )
}
