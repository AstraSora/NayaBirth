import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOnboarding } from '../context/OnboardingContext'
import { WelcomeStep } from '../components/onboarding/WelcomeStep'
import { StageStep } from '../components/onboarding/StageStep'

// Placeholder step components - will be implemented in subsequent stories

function RecommendationsStep() {
  const { nextStep, prevStep } = useOnboarding()
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Recommendations</h1>
        <p className="mb-6">Step 3 - Coming soon</p>
        <div className="flex gap-4 justify-center">
          <button onClick={prevStep} className="px-4 py-2 border rounded-lg">Back</button>
          <button onClick={nextStep} className="px-6 py-3 bg-coral-500 text-white rounded-lg">Continue</button>
        </div>
      </div>
    </div>
  )
}

function TourStep() {
  const { prevStep, completeOnboarding } = useOnboarding()
  const navigate = useNavigate()

  const handleFinish = () => {
    completeOnboarding()
    navigate('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Quick Tour</h1>
        <p className="mb-6">Step 4 - Coming soon</p>
        <div className="flex gap-4 justify-center">
          <button onClick={prevStep} className="px-4 py-2 border rounded-lg">Back</button>
          <button onClick={handleFinish} className="px-6 py-3 bg-coral-500 text-white rounded-lg">Finish</button>
        </div>
      </div>
    </div>
  )
}

const STEPS = [
  WelcomeStep,
  StageStep,
  RecommendationsStep,
  TourStep
]

export function OnboardingFlow() {
  const { onboardingStep, hasCompletedOnboarding, hasExistingData } = useOnboarding()
  const navigate = useNavigate()

  // Redirect if already onboarded or has existing data
  useEffect(() => {
    if (hasCompletedOnboarding || hasExistingData()) {
      navigate('/', { replace: true })
    }
  }, [hasCompletedOnboarding, hasExistingData, navigate])

  const CurrentStep = STEPS[onboardingStep] || STEPS[0]

  return <CurrentStep />
}
