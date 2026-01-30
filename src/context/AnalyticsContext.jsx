/**
 * Analytics Context for NayaBirth Research Study
 * Manages study enrollment, user properties, and event tracking
 */
import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { useOnboarding } from './OnboardingContext'
import { useBirthPlan } from './BirthPlanContext'
import {
  trackEvent,
  setAnalyticsUserProperties,
  setAnalyticsUserId,
  generateStudyUserId
} from '../lib/analytics'

const STORAGE_KEY = 'nayabirth_study_properties'

const AnalyticsContext = createContext(null)

/**
 * Map trimester/stage to pregnancy_stage user property value
 */
function getPregnancyStage(profile) {
  if (!profile) return null
  if (profile.stage === 'postpartum') return 'postpartum'
  if (profile.trimester === 1) return 'first_trimester'
  if (profile.trimester === 2) return 'second_trimester'
  if (profile.trimester === 3) return 'third_trimester'
  return null
}

export function AnalyticsProvider({ children }) {
  const { profile } = useOnboarding()
  const { isSaved } = useBirthPlan()

  const [studyProperties, setStudyProperties] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : {
        study_participant: false,
        study_group: null,
        birth_plan_user: false,
        pregnancy_stage: null,
        enrollment_date: null,
        study_user_id: null
      }
    } catch {
      return {
        study_participant: false,
        study_group: null,
        birth_plan_user: false,
        pregnancy_stage: null,
        enrollment_date: null,
        study_user_id: null
      }
    }
  })

  // Persist study properties to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(studyProperties))
  }, [studyProperties])

  // Sync user properties when profile changes
  useEffect(() => {
    const pregnancyStage = getPregnancyStage(profile)
    if (pregnancyStage && pregnancyStage !== studyProperties.pregnancy_stage) {
      setStudyProperties(prev => ({
        ...prev,
        pregnancy_stage: pregnancyStage
      }))
      setAnalyticsUserProperties({ pregnancy_stage: pregnancyStage })
    }
  }, [profile, studyProperties.pregnancy_stage])

  // Sync birth_plan_user when birth plan is saved
  useEffect(() => {
    if (isSaved && !studyProperties.birth_plan_user) {
      setStudyProperties(prev => ({
        ...prev,
        birth_plan_user: true
      }))
      setAnalyticsUserProperties({ birth_plan_user: 'true' })
    }
  }, [isSaved, studyProperties.birth_plan_user])

  // Set all user properties on mount if study participant
  useEffect(() => {
    if (studyProperties.study_participant && studyProperties.study_user_id) {
      setAnalyticsUserId(studyProperties.study_user_id)
      setAnalyticsUserProperties({
        study_participant: 'true',
        study_group: studyProperties.study_group,
        birth_plan_user: studyProperties.birth_plan_user ? 'true' : 'false',
        pregnancy_stage: studyProperties.pregnancy_stage,
        enrollment_date: studyProperties.enrollment_date
      })
    }
  }, [])

  /**
   * Enroll user in the research study
   * @param {string} group - 'intervention' or 'control'
   */
  const enrollInStudy = useCallback((group) => {
    const userId = generateStudyUserId()
    const enrollmentDate = new Date().toISOString()

    const newProperties = {
      ...studyProperties,
      study_participant: true,
      study_group: group,
      enrollment_date: enrollmentDate,
      study_user_id: userId
    }

    setStudyProperties(newProperties)

    // Set analytics user ID and properties
    setAnalyticsUserId(userId)
    setAnalyticsUserProperties({
      study_participant: 'true',
      study_group: group,
      birth_plan_user: newProperties.birth_plan_user ? 'true' : 'false',
      pregnancy_stage: newProperties.pregnancy_stage,
      enrollment_date: enrollmentDate
    })

    // Track enrollment event
    trackEvent('study_enrolled', {
      study_group: group
    })

    return userId
  }, [studyProperties])

  /**
   * Unenroll from the study (for testing purposes)
   */
  const unenrollFromStudy = useCallback(() => {
    setStudyProperties({
      study_participant: false,
      study_group: null,
      birth_plan_user: studyProperties.birth_plan_user,
      pregnancy_stage: studyProperties.pregnancy_stage,
      enrollment_date: null,
      study_user_id: null
    })
  }, [studyProperties])

  /**
   * Track an event with study context automatically added
   * @param {string} eventName - Event name
   * @param {Object} params - Event parameters
   */
  const track = useCallback((eventName, params = {}) => {
    trackEvent(eventName, {
      ...params,
      study_participant: studyProperties.study_participant,
      study_group: studyProperties.study_group
    })
  }, [studyProperties])

  const value = {
    studyProperties,
    enrollInStudy,
    unenrollFromStudy,
    track,
    isStudyParticipant: studyProperties.study_participant,
    studyGroup: studyProperties.study_group
  }

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  )
}

export function useAnalyticsContext() {
  const context = useContext(AnalyticsContext)
  if (!context) {
    throw new Error('useAnalyticsContext must be used within an AnalyticsProvider')
  }
  return context
}
