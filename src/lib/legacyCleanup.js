/**
 * One-time cleanup for devices that used an earlier version of the app, which
 * ran Google Analytics. Removes its leftover cookies and stored study data.
 */
export function removeLegacyTracking() {
  try {
    localStorage.removeItem('nayabirth_study_properties')
    const host = window.location.hostname
    document.cookie.split(';').forEach((cookie) => {
      const name = cookie.split('=')[0].trim()
      if (!name.startsWith('_ga')) return
      const expire = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
      document.cookie = expire
      document.cookie = `${expire}; domain=${host}`
      document.cookie = `${expire}; domain=.${host}`
    })
  } catch (e) {
    console.error('Legacy cleanup failed:', e)
  }
}
