/**
 * Analytics event tracking hook for NayaBirth
 * Provides typed tracking functions for all app events
 */
import { useCallback } from 'react'
import { useAnalyticsContext } from '../context/AnalyticsContext'

export function useAnalytics() {
  const { track } = useAnalyticsContext()

  /**
   * Track when user starts the birth plan wizard
   */
  const trackBirthPlanStarted = useCallback(() => {
    track('birth_plan_started')
  }, [track])

  /**
   * Track when user completes a birth plan section
   * @param {string} sectionId - ID of the completed section
   * @param {string} sectionName - Human-readable section name
   */
  const trackBirthPlanSectionCompleted = useCallback((sectionId, sectionName) => {
    track('birth_plan_section_completed', {
      section_id: sectionId,
      section_name: sectionName
    })
  }, [track])

  /**
   * Track when user saves their birth plan
   * @param {boolean} hasPin - Whether a PIN was generated/used
   */
  const trackBirthPlanSaved = useCallback((hasPin) => {
    track('birth_plan_saved', {
      has_pin: hasPin
    })
  }, [track])

  /**
   * Track when user clicks on a resource article
   * @param {string} categoryId - Resource category ID
   * @param {string} resourceId - Resource/article ID
   * @param {string} title - Article title
   */
  const trackResourceClicked = useCallback((categoryId, resourceId, title) => {
    track('resource_clicked', {
      category_id: categoryId,
      resource_id: resourceId,
      resource_title: title
    })
  }, [track])

  /**
   * Track when user finishes reading an article (collapses it)
   * @param {string} categoryId - Resource category ID
   * @param {string} resourceId - Resource/article ID
   * @param {string} title - Article title
   * @param {number} durationSeconds - Time spent reading in seconds
   */
  const trackArticleRead = useCallback((categoryId, resourceId, title, durationSeconds) => {
    track('article_read', {
      category_id: categoryId,
      resource_id: resourceId,
      resource_title: title,
      duration_seconds: durationSeconds
    })
  }, [track])

  /**
   * Track EPDS assessment completion
   * Privacy: Only tracks category, NOT the actual score
   * @param {number} score - The EPDS score (logged only for category determination)
   * @param {string} category - Score category: 'low', 'moderate', or 'elevated'
   */
  const trackEPDSCompleted = useCallback((score, category) => {
    track('epds_completed', {
      score_category: category
    })
  }, [track])

  /**
   * Track tool usage (kick counter, contraction timer, checklist)
   * @param {string} toolName - Name of the tool
   * @param {Object} metadata - Tool-specific metadata
   */
  const trackToolUsed = useCallback((toolName, metadata = {}) => {
    track('tool_used', {
      tool_name: toolName,
      ...metadata
    })
  }, [track])

  /**
   * Track survey completion (for future surveys)
   * @param {string} surveyType - Type of survey completed
   * @param {Object} metadata - Survey-specific metadata
   */
  const trackSurveyCompleted = useCallback((surveyType, metadata = {}) => {
    track('survey_completed', {
      survey_type: surveyType,
      ...metadata
    })
  }, [track])

  return {
    trackBirthPlanStarted,
    trackBirthPlanSectionCompleted,
    trackBirthPlanSaved,
    trackResourceClicked,
    trackArticleRead,
    trackEPDSCompleted,
    trackToolUsed,
    trackSurveyCompleted
  }
}
