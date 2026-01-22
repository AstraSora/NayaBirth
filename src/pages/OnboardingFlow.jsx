import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOnboarding } from '../context/OnboardingContext'
import { WelcomeStep } from '../components/onboarding/WelcomeStep'
import { StageStep } from '../components/onboarding/StageStep'
import { RecommendationsStep } from '../components/onboarding/RecommendationsStep'
import { TourStep } from '../components/onboarding/TourStep'

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
