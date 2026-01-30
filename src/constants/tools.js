/**
 * Tool-related constants for kick counter and contraction timer
 */

// Kick Counter
export const KICK_GOAL = 10
export const MAX_KICK_SESSIONS = 20

// Contraction Timer
export const MAX_CONTRACTIONS = 50

// 5-1-1 Rule thresholds
export const CONTRACTION_511 = {
  // Interval range in minutes (4-6 min = "about 5 minutes")
  INTERVAL_MIN: 4,
  INTERVAL_MAX: 6,
  // Duration range in seconds (45-90 sec = "about 1 minute")
  DURATION_MIN: 45,
  DURATION_MAX: 90,
  // Minimum contractions to check pattern
  MIN_CONTRACTIONS: 6,
  // Pattern duration in milliseconds (1 hour)
  PATTERN_DURATION: 60 * 60 * 1000
}

// Contraction intensity thresholds (in seconds)
export const CONTRACTION_INTENSITY = {
  // Duration threshold for highlighting (60 seconds)
  LONG_DURATION: 60,
  // Interval threshold for highlighting (5 minutes = 300 seconds)
  SHORT_INTERVAL: 300
}
