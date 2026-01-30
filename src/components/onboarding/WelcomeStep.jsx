import { useNavigate } from 'react-router-dom'
import { useOnboarding } from '../../context/OnboardingContext'
import { Button } from '../ui/Button'
import UCIHealthLogo from '../../assets/uci-health-logo.svg'

export function WelcomeStep() {
  const { nextStep, skipOnboarding } = useOnboarding()
  const navigate = useNavigate()

  const handleSkip = () => {
    skipOnboarding()
    navigate('/')
  }

  const handleRetrieve = () => {
    navigate('/retrieve')
  }

  const features = [
    { icon: '📝', text: 'Build your birth plan' },
    { icon: '📅', text: 'Track weekly milestones' },
    { icon: '📚', text: 'Access trusted resources' },
    { icon: '🏥', text: 'Prepare for delivery' },
  ]

  return (
    <div className="min-h-screen bg-gradient-warm flex flex-col">
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        {/* UCI Health Partnership Badge */}
        <div className="mb-8 flex flex-col items-center">
          <div className="bg-white rounded-2xl shadow-soft px-5 py-3 flex flex-col items-center gap-1">
            <span className="text-xs text-foreground-muted">In partnership with</span>
            <img
              src={UCIHealthLogo}
              alt="UCI Health"
              className="h-6"
            />
          </div>
        </div>

        {/* App Logo & Title */}
        <div className="text-center mb-8">
          <span className="text-6xl mb-4 block" aria-hidden="true">🌸</span>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome to NayaBirth
          </h1>
          <p className="text-lg text-foreground-secondary">
            Your pregnancy companion from UCI Health
          </p>
        </div>

        {/* Feature List */}
        <div className="w-full max-w-sm mb-8">
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li
                key={index}
                className="flex items-center gap-4 bg-surface/80 backdrop-blur-sm rounded-xl p-4 shadow-sm"
              >
                <span className="text-2xl" aria-hidden="true">{feature.icon}</span>
                <span className="text-foreground font-medium">{feature.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Primary CTA */}
        <div className="w-full max-w-sm">
          <Button
            onClick={nextStep}
            size="lg"
            className="w-full"
          >
            Get Started
          </Button>
        </div>
      </main>

      {/* Footer Links */}
      <footer className="px-6 py-8 text-center space-y-4">
        <button
          onClick={handleSkip}
          className="text-foreground-secondary hover:text-foreground transition-colors text-sm underline underline-offset-2"
        >
          I've used this app before
        </button>

        <div className="text-foreground-muted text-sm">
          <button
            onClick={handleRetrieve}
            className="text-coral-500 hover:text-coral-600 transition-colors font-medium"
          >
            Already have a saved birth plan?
          </button>
        </div>
      </footer>
    </div>
  )
}
