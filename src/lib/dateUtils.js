/**
 * Date utilities for pregnancy calculations
 * Based on LMP (Last Menstrual Period) method
 */

import {
  PREGNANCY_DAYS,
  MAX_WEEKS,
  FULL_TERM_WEEKS,
  getTrimesterFromWeek,
  getTrimesterLabel,
  getTrimesterWeekRange
} from '../constants/pregnancy'

/**
 * Calculate LMP date from due date
 * @param {string|Date} dueDate - Expected due date
 * @returns {Date} LMP date
 */
export function calculateLMP(dueDate) {
  const due = new Date(dueDate)
  const lmp = new Date(due)
  lmp.setDate(lmp.getDate() - PREGNANCY_DAYS)
  return lmp
}

/**
 * Calculate current pregnancy week from due date
 * Uses LMP-based calculation (standard obstetric method)
 * @param {string|Date} dueDate - Expected due date
 * @returns {number} Current week (1-42)
 */
export function calculateCurrentWeek(dueDate) {
  const today = new Date()
  const lmp = calculateLMP(dueDate)

  const diffTime = today - lmp
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  const week = Math.floor(diffDays / 7) + 1

  return Math.max(1, Math.min(MAX_WEEKS, week))
}

/**
 * Calculate current week using reverse method (weeks until due date)
 * Alternative calculation for comparison
 * @param {string|Date} dueDate - Expected due date
 * @returns {number} Current week (1-42)
 */
export function calculateCurrentWeekFromDue(dueDate) {
  const due = new Date(dueDate)
  const now = new Date()
  const diffTime = due.getTime() - now.getTime()
  const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7))
  const week = FULL_TERM_WEEKS - diffWeeks

  return Math.max(1, Math.min(MAX_WEEKS, week))
}

/**
 * Get date range for a specific pregnancy week
 * @param {number} week - Pregnancy week number
 * @param {string|Date} dueDate - Expected due date
 * @returns {string} Formatted date range (e.g., "01 Jan - 07 Jan")
 */
export function getWeekDateRange(week, dueDate) {
  const lmp = calculateLMP(dueDate)

  const weekStart = new Date(lmp)
  weekStart.setDate(weekStart.getDate() + (week - 1) * 7)

  const weekEnd = new Date(weekStart)
  weekEnd.setDate(weekEnd.getDate() + 6)

  return `${formatDateShort(weekStart)} - ${formatDateShort(weekEnd)}`
}

/**
 * Get trimester information for a given week
 * @param {number} week - Pregnancy week number
 * @returns {Object} Trimester info { number, label, range }
 */
export function getTrimesterInfo(week) {
  return {
    number: getTrimesterFromWeek(week),
    label: getTrimesterLabel(week),
    range: getTrimesterWeekRange(getTrimesterFromWeek(week))
  }
}

/**
 * Calculate pregnancy progress percentage
 * @param {number} week - Current week
 * @returns {number} Progress percentage (0-100)
 */
export function getProgressPercentage(week) {
  return Math.min(100, Math.round((week / FULL_TERM_WEEKS) * 100))
}

/**
 * Get weeks remaining until due date
 * @param {number} week - Current week
 * @returns {number} Weeks remaining
 */
export function getWeeksRemaining(week) {
  return Math.max(0, FULL_TERM_WEEKS - week)
}

/**
 * Format date in short format (e.g., "01 Jan")
 * @param {Date} date - Date to format
 * @returns {string} Formatted date
 */
export function formatDateShort(date) {
  return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short' })
}

/**
 * Format date in long format (e.g., "Mon, January 1, 2025")
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date
 */
export function formatDateLong(date) {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}

/**
 * Format date with time (e.g., "Jan 1, 2:30 PM")
 * @param {Date|string} dateString - Date to format
 * @returns {string} Formatted date with time
 */
export function formatDateTime(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  })
}

/**
 * Format time only (e.g., "2:30 PM")
 * @param {Date|string} dateString - Date to format
 * @returns {string} Formatted time
 */
export function formatTime(dateString) {
  return new Date(dateString).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit'
  })
}

/**
 * Format duration in seconds to MM:SS or HH:MM:SS
 * @param {number} seconds - Duration in seconds
 * @returns {string} Formatted duration
 */
export function formatDuration(seconds) {
  const hrs = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  return `${mins}:${secs.toString().padStart(2, '0')}`
}
