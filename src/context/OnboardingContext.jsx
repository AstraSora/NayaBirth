import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const OnboardingContext = createContext(null)

const STORAGE_KEYS = {
  ONBOARDING_COMPLETE: 'nayabirth_onboarding_complete',
  USER_PROFILE: 'nayabirth_user_profile',
  TIMELINE: 'nayabirth-timeline',
  DRAFT: 'nayabirth_draft'
}

const initialProfile = {
  dueDate: null,
  trimester: null,
  stage: null, // 'pregnant' | 'postpartum' | 'planning'
  onboardingCompletedAt: null
}

export function OnboardingProvider({ children }) {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETE) === 'true'
  })

  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USER_PROFILE)
    if (saved) {
      try {
        return { ...initialProfile, ...JSON.parse(saved) }
      } catch (e) {
        console.error('Error loading user profile:', e)
      }
    }
    return initialProfile
  })

  const [onboardingStep, setOnboardingStep] = useState(0)

  // Check for existing data that indicates a returning user
  const hasExistingData = useCallback(() => {
    return !!(
      localStorage.getItem(STORAGE_KEYS.DRAFT) ||
      localStorage.getItem(STORAGE_KEYS.TIMELINE)
    )
  }, [])

  // Persist profile to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile))
  }, [profile])

  // Persist onboarding completion status
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.ONBOARDING_COMPLETE,
      String(hasCompletedOnboarding)
    )
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
      localStorage.setItem(STORAGE_KEYS.TIMELINE, JSON.stringify({ dueDate: profile.dueDate }))
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
    localStorage.removeItem(STORAGE_KEYS.ONBOARDING_COMPLETE)
    localStorage.removeItem(STORAGE_KEYS.USER_PROFILE)
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
    const due = new Date(profile.dueDate)
    const now = new Date()
    const diffTime = due.getTime() - now.getTime()
    const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7))
    const currentWeek = 40 - diffWeeks
    return Math.max(1, Math.min(42, currentWeek))
  }, [profile.dueDate])

  // Derive trimester from due date if not explicitly set
  const getEffectiveTrimester = useCallback(() => {
    if (profile.trimester) return profile.trimester
    const week = getCurrentWeek()
    if (!week) return null
    if (week <= 12) return 1
    if (week <= 26) return 2
    return 3
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
