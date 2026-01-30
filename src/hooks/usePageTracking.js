/**
 * Automatic page view tracking hook
 * Tracks page_view on route change and page_view_complete with duration on leave
 */
import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useAnalyticsContext } from '../context/AnalyticsContext'

/**
 * Map URL paths to human-readable page names
 */
const PAGE_NAMES = {
  '/': 'Home',
  '/onboarding': 'Onboarding',
  '/birth-plan': 'Birth Plan',
  '/review': 'Birth Plan Review',
  '/retrieve': 'Retrieve Birth Plan',
  '/assessment': 'Wellbeing Assessment',
  '/assessment/results': 'Assessment Results',
  '/kick-counter': 'Kick Counter',
  '/contraction-timer': 'Contraction Timer',
  '/hospital-checklist': 'Hospital Checklist',
  '/pregnancy-timeline': 'Pregnancy Timeline',
  '/resources': 'Resources',
  '/settings': 'Settings'
}

/**
 * Get page name from path, with dynamic route support
 */
function getPageName(pathname) {
  // Check exact matches first
  if (PAGE_NAMES[pathname]) {
    return PAGE_NAMES[pathname]
  }

  // Handle dynamic routes
  if (pathname.startsWith('/resources/')) {
    const category = pathname.replace('/resources/', '')
    return `Resources - ${category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ')}`
  }

  // Default to formatted pathname
  return pathname.replace(/\//g, ' ').trim() || 'Unknown'
}

/**
 * Hook to automatically track page views and time on page
 */
export function usePageTracking() {
  const location = useLocation()
  const { track } = useAnalyticsContext()
  const pageStartTime = useRef(Date.now())
  const previousPath = useRef(null)

  useEffect(() => {
    const currentPath = location.pathname
    const currentPageName = getPageName(currentPath)

    // Track page_view_complete for previous page (if exists)
    if (previousPath.current && previousPath.current !== currentPath) {
      const durationSeconds = Math.round((Date.now() - pageStartTime.current) / 1000)
      track('page_view_complete', {
        page_name: getPageName(previousPath.current),
        page_path: previousPath.current,
        duration_seconds: durationSeconds
      })
    }

    // Track page_view for current page
    track('page_view', {
      page_name: currentPageName,
      page_path: currentPath
    })

    // Update refs for next navigation
    previousPath.current = currentPath
    pageStartTime.current = Date.now()

    // Track page_view_complete on unmount/page leave
    return () => {
      const durationSeconds = Math.round((Date.now() - pageStartTime.current) / 1000)
      track('page_view_complete', {
        page_name: currentPageName,
        page_path: currentPath,
        duration_seconds: durationSeconds
      })
    }
  }, [location.pathname, track])
}
