/**
 * Storage abstraction layer for localStorage operations
 * Provides safe JSON parsing, error handling, and domain-specific helpers
 */

import { STORAGE_KEYS } from '../constants/storage'

/**
 * Get an item from localStorage with JSON parsing and error handling
 * @param {string} key - Storage key
 * @param {*} defaultValue - Default value if key doesn't exist or parse fails
 * @returns {*} Parsed value or default
 */
export function getStorageItem(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key)
    if (item === null) return defaultValue
    return JSON.parse(item)
  } catch (e) {
    console.error(`Error reading localStorage key "${key}":`, e)
    return defaultValue
  }
}

/**
 * Set an item in localStorage with JSON stringify and quota handling
 * @param {string} key - Storage key
 * @param {*} value - Value to store (will be JSON stringified)
 * @returns {boolean} Success status
 */
export function setStorageItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (e) {
    if (e.name === 'QuotaExceededError') {
      console.error(`localStorage quota exceeded for key "${key}"`)
    } else {
      console.error(`Error writing localStorage key "${key}":`, e)
    }
    return false
  }
}

/**
 * Remove an item from localStorage safely
 * @param {string} key - Storage key
 * @returns {boolean} Success status
 */
export function removeStorageItem(key) {
  try {
    localStorage.removeItem(key)
    return true
  } catch (e) {
    console.error(`Error removing localStorage key "${key}":`, e)
    return false
  }
}

/**
 * Check if a storage key exists
 * @param {string} key - Storage key
 * @returns {boolean} Whether key exists
 */
export function hasStorageItem(key) {
  return localStorage.getItem(key) !== null
}

// ============================================
// Domain-specific helpers
// ============================================

/**
 * Load timeline data (due date)
 * @returns {Object|null} Timeline data with dueDate
 */
export function loadTimelineData() {
  return getStorageItem(STORAGE_KEYS.TIMELINE, null)
}

/**
 * Save timeline data
 * @param {Object} data - Timeline data to save
 */
export function saveTimelineData(data) {
  setStorageItem(STORAGE_KEYS.TIMELINE, data)
}

/**
 * Load user profile
 * @param {Object} defaults - Default profile structure
 * @returns {Object} User profile
 */
export function loadUserProfile(defaults = {}) {
  const saved = getStorageItem(STORAGE_KEYS.USER_PROFILE, null)
  return saved ? { ...defaults, ...saved } : defaults
}

/**
 * Save user profile
 * @param {Object} profile - Profile to save
 */
export function saveUserProfile(profile) {
  setStorageItem(STORAGE_KEYS.USER_PROFILE, profile)
}

/**
 * Check if onboarding is complete
 * @returns {boolean} Whether onboarding is complete
 */
export function isOnboardingComplete() {
  return localStorage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETE) === 'true'
}

/**
 * Set onboarding completion status
 * @param {boolean} complete - Completion status
 */
export function setOnboardingComplete(complete) {
  localStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETE, String(complete))
}

/**
 * Load birth plan draft
 * @returns {Object|null} Draft data
 */
export function loadBirthPlanDraft() {
  return getStorageItem(STORAGE_KEYS.DRAFT, null)
}

/**
 * Save birth plan draft
 * @param {Object} draft - Draft to save
 */
export function saveBirthPlanDraft(draft) {
  setStorageItem(STORAGE_KEYS.DRAFT, draft)
}

/**
 * Clear birth plan draft
 */
export function clearBirthPlanDraft() {
  removeStorageItem(STORAGE_KEYS.DRAFT)
}

/**
 * Load kick counter sessions
 * @returns {Array} Sessions array
 */
export function loadKickSessions() {
  return getStorageItem(STORAGE_KEYS.KICK_SESSIONS, [])
}

/**
 * Save kick counter sessions
 * @param {Array} sessions - Sessions to save
 */
export function saveKickSessions(sessions) {
  setStorageItem(STORAGE_KEYS.KICK_SESSIONS, sessions)
}

/**
 * Clear kick counter sessions
 */
export function clearKickSessions() {
  removeStorageItem(STORAGE_KEYS.KICK_SESSIONS)
}

/**
 * Load contraction data
 * @returns {Array} Contractions array
 */
export function loadContractions() {
  return getStorageItem(STORAGE_KEYS.CONTRACTIONS, [])
}

/**
 * Save contraction data
 * @param {Array} contractions - Contractions to save
 */
export function saveContractions(contractions) {
  setStorageItem(STORAGE_KEYS.CONTRACTIONS, contractions)
}

/**
 * Clear contraction data
 */
export function clearContractions() {
  removeStorageItem(STORAGE_KEYS.CONTRACTIONS)
}

/**
 * Load hospital checklist state
 * @returns {Object|null} Checklist state
 */
export function loadChecklistState() {
  return getStorageItem(STORAGE_KEYS.HOSPITAL_CHECKLIST, null)
}

/**
 * Save hospital checklist state
 * @param {Object} state - Checklist state to save
 */
export function saveChecklistState(state) {
  setStorageItem(STORAGE_KEYS.HOSPITAL_CHECKLIST, state)
}

/**
 * Clear hospital checklist state
 */
export function clearChecklistState() {
  removeStorageItem(STORAGE_KEYS.HOSPITAL_CHECKLIST)
}

/**
 * Load study properties
 * @param {Object} defaults - Default properties
 * @returns {Object} Study properties
 */
export function loadStudyProperties(defaults = {}) {
  return getStorageItem(STORAGE_KEYS.STUDY_PROPERTIES, defaults)
}

/**
 * Save study properties
 * @param {Object} properties - Properties to save
 */
export function saveStudyProperties(properties) {
  setStorageItem(STORAGE_KEYS.STUDY_PROPERTIES, properties)
}

/**
 * Load dark mode preference
 * @returns {boolean|null} Dark mode preference or null if not set
 */
export function loadDarkModePreference() {
  const saved = localStorage.getItem(STORAGE_KEYS.DARK_MODE)
  if (saved === null) return null
  try {
    return JSON.parse(saved)
  } catch {
    return null
  }
}

/**
 * Save dark mode preference
 * @param {boolean} isDark - Dark mode preference
 */
export function saveDarkModePreference(isDark) {
  localStorage.setItem(STORAGE_KEYS.DARK_MODE, JSON.stringify(isDark))
}
