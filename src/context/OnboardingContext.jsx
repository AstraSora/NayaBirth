import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { STORAGE_KEYS } from '../constants/storage'
import { calculateCurrentWeekFromDue } from '../lib/dateUtils'
import { getTrimesterFromWeek } from '../constants/pregnancy'
import {
  loadUserProfile,
  saveUserProfile,
  isOnboardingComplete,
  setOnboardingComplete,
  loadTimelineData,
  saveTimelineData,
  loadBirthPlanDraft
} from '../lib/storage'

const OnboardingContext = createContext(null)

const initialProfile = {
  dueDate: null,
  trimester: null,
  stage: null, // 'pregnant' | 'postpartum' | 'planning'
  onboardingCompletedAt: null
}

export function OnboardingProvider({ children }) {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(() => {
    return isOnboardingComplete()
  })

  const [profile, setProfile] = useState(() => {
    return loadUserProfile(initialProfile)
  })

  const [onboardingStep, setOnboardingStep] = useState(0)

  // Check for existing data that indicates a returning user
  // Only consider it "existing data" if there's actual meaningful content
  const hasExistingData = useCallback(() => {
    // Check if timeline has a due date set
    const timelineData = loadTimelineData()
    if (timelineData?.dueDate) return true

    // Check if birth plan draft has any actual responses
    const draftData = loadBirthPlanDraft()
    if (draftData) {
      // Check if any section has actual data
      if (draftData.responses) {
        const hasResponses = Object.values(draftData.responses).some(section =>
          Object.keys(section).length > 0
        )
        if (hasResponses) return true
      }
      // Check if there's a PIN (indicating saved plan)
      if (draftData.pin) return true
    }

    return false
  }, [])

  // Persist profile to localStorage
  useEffect(() => {
    saveUserProfile(profile)
  }, [profile])

  // Persist onboarding completion status
  useEffect(() => {
    setOnboardingComplete(hasCompletedOnboarding)
  }, [hasCompletedOnboarding])

  const updateProfile = useCallback((updates) => {
    setProfile(prev => ({ ...prev, ...updates }))
  }, [])

  const completeOnboarding = useCallback(() => {
    const completedAt = new Date().toISOString()
    setProfile(prev => ({ ...prev, onboardingCompletedAt: completedAt }))
    setHasCompletedOnboarding(true)

    // Sync due date with timeline if set
    if (profile.dueDate) {
      saveTimelineData({ dueDate: profile.dueDate })
    }
  }, [profile.dueDate])

  const skipOnboarding = useCallback(() => {
    setHasCompletedOnboarding(true)
    setProfile(prev => ({
      ...prev,
      onboardingCompletedAt: new Date().toISOString()
    }))
  }, [])

  const resetOnboarding = useCallback(() => {
    setOnboardingComplete(false)
    saveUserProfile(initialProfile)
    setHasCompletedOnboarding(false)
    setProfile(initialProfile)
    setOnboardingStep(0)
  }, [])

  const nextStep = useCallback(() => {
    setOnboardingStep(prev => prev + 1)
  }, [])

  const prevStep = useCallback(() => {
    setOnboardingStep(prev => Math.max(0, prev - 1))
  }, [])

  const goToStep = useCallback((step) => {
    setOnboardingStep(step)
  }, [])

  // Calculate current week from due date
  const getCurrentWeek = useCallback(() => {
    if (!profile.dueDate) return null
    return calculateCurrentWeekFromDue(profile.dueDate)
  }, [profile.dueDate])

  // Derive trimester from due date if not explicitly set
  const getEffectiveTrimester = useCallback(() => {
    if (profile.trimester) return profile.trimester
    const week = getCurrentWeek()
    if (!week) return null
    return getTrimesterFromWeek(week)
  }, [profile.trimester, getCurrentWeek])

  const value = {
    hasCompletedOnboarding,
    hasExistingData,
    profile,
    onboardingStep,
    updateProfile,
    completeOnboarding,
    skipOnboarding,
    resetOnboarding,
    nextStep,
    prevStep,
    goToStep,
    getCurrentWeek,
    getEffectiveTrimester
  }

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboarding() {
  const context = useContext(OnboardingContext)
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider')
  }
  return context
}
