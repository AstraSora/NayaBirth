/**
 * Pregnancy-related constants
 */

// Total days in a full-term pregnancy (40 weeks)
export const PREGNANCY_DAYS = 280

// Maximum weeks tracked (includes post-term)
export const MAX_WEEKS = 42

// Full term pregnancy in weeks
export const FULL_TERM_WEEKS = 40

// Trimester boundaries (week numbers)
export const TRIMESTER_BOUNDARIES = {
  FIRST: { start: 1, end: 13 },
  SECOND: { start: 14, end: 26 },
  THIRD: { start: 27, end: 40 }
}

/**
 * Get trimester number from week
 * @param {number} week - Current pregnancy week
 * @returns {number} Trimester number (1, 2, or 3)
 */
export function getTrimesterFromWeek(week) {
  if (week <= TRIMESTER_BOUNDARIES.FIRST.end) return 1
  if (week <= TRIMESTER_BOUNDARIES.SECOND.end) return 2
  return 3
}

/**
 * Get trimester label from week
 * @param {number} week - Current pregnancy week
 * @returns {string} Trimester label
 */
export function getTrimesterLabel(week) {
  const trimester = getTrimesterFromWeek(week)
  return trimester === 1 ? 'First' : trimester === 2 ? 'Second' : 'Third'
}

/**
 * Get week range string for a trimester
 * @param {number} trimester - Trimester number (1, 2, or 3)
 * @returns {string} Week range string
 */
export function getTrimesterWeekRange(trimester) {
  switch (trimester) {
    case 1:
      return `Weeks ${TRIMESTER_BOUNDARIES.FIRST.start}-${TRIMESTER_BOUNDARIES.FIRST.end}`
    case 2:
      return `Weeks ${TRIMESTER_BOUNDARIES.SECOND.start}-${TRIMESTER_BOUNDARIES.SECOND.end}`
    case 3:
      return `Weeks ${TRIMESTER_BOUNDARIES.THIRD.start}-${FULL_TERM_WEEKS}`
    default:
      return ''
  }
}
