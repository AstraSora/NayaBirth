import { useState, useCallback } from 'react'
import { saveBirthPlan, loadBirthPlan, generateUniquePIN } from '../lib/firebase'

export function useFirestore() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const save = useCallback(async (pin, responses) => {
    setLoading(true)
    setError(null)

    try {
      let planPIN = pin
      if (!planPIN) {
        planPIN = await generateUniquePIN()
      }

      const result = await saveBirthPlan(planPIN, responses)

      if (!result.success) {
        setError(result.error)
      }

      return result
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }, [])

  const load = useCallback(async (pin) => {
    setLoading(true)
    setError(null)

    try {
      const result = await loadBirthPlan(pin)

      if (!result.success) {
        setError(result.error)
      }

      return result
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    loading,
    error,
    save,
    load,
    clearError: () => setError(null)
  }
}
