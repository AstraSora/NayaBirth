/**
 * Core analytics utilities for Firebase Analytics
 * Provides privacy-safe tracking for the NayaBirth research study
 */
import { logEvent, setUserId, setUserProperties } from 'firebase/analytics'
import { analytics } from './firebase'

/**
 * Generate a privacy-safe anonymous study user ID
 * Format: study_[timestamp]_[random]
 */
export function generateStudyUserId() {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 8)
  return `study_${timestamp}_${random}`
}

/**
 * Track an analytics event with null checks
 * @param {string} eventName - Name of the event to track
 * @param {Object} params - Event parameters
 */
export function trackEvent(eventName, params = {}) {
  if (!analytics) {
    console.debug('[Analytics] Analytics not available, skipping event:', eventName)
    return
  }

  try {
    logEvent(analytics, eventName, {
      ...params,
      timestamp: new Date().toISOString()
    })
    console.debug('[Analytics] Event tracked:', eventName, params)
  } catch (error) {
    console.error('[Analytics] Failed to track event:', eventName, error)
  }
}

/**
 * Set user properties for segmentation
 * @param {Object} properties - User properties to set
 */
export function setAnalyticsUserProperties(properties) {
  if (!analytics) {
    console.debug('[Analytics] Analytics not available, skipping user properties')
    return
  }

  try {
    setUserProperties(analytics, properties)
    console.debug('[Analytics] User properties set:', properties)
  } catch (error) {
    console.error('[Analytics] Failed to set user properties:', error)
  }
}

/**
 * Set the anonymous study user ID
 * @param {string} userId - Anonymous user ID
 */
export function setAnalyticsUserId(userId) {
  if (!analytics) {
    console.debug('[Analytics] Analytics not available, skipping user ID')
    return
  }

  try {
    setUserId(analytics, userId)
    console.debug('[Analytics] User ID set:', userId)
  } catch (error) {
    console.error('[Analytics] Failed to set user ID:', error)
  }
}
