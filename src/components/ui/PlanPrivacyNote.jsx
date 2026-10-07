import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBirthPlan } from '../../context/BirthPlanContext'

/**
 * Privacy disclosure for the birth plan, with a way to erase the in-progress
 * plan (for shared or family devices).
 */
export function PlanPrivacyNote({ className = '' }) {
  const navigate = useNavigate()
  const { reset } = useBirthPlan()
  const [confirming, setConfirming] = useState(false)

  const handleClear = () => {
    reset()
    setConfirming(false)
    navigate('/birth-plan')
  }

  return (
    <div className={`p-4 bg-sky-50 border border-sky-200 rounded-xl text-sm text-foreground-secondary ${className}`}>
      <p className="font-medium text-foreground mb-1">🔒 Your plan stays with you</p>
      <p>
        Nothing you enter is saved or sent anywhere. Your plan stays on this device only until you close
        this page, so use <span className="font-medium">Save / Print</span> to keep a copy.
      </p>
      {!confirming ? (
        <button
          type="button"
          onClick={() => setConfirming(true)}
          className="mt-3 text-sm font-medium text-coral-600 hover:text-coral-700 underline focus:outline-none focus:ring-2 focus:ring-coral-300 rounded"
        >
          Clear my plan
        </button>
      ) : (
        <div className="mt-3 flex items-center gap-3">
          <span className="text-foreground">Erase everything you entered?</span>
          <button
            type="button"
            onClick={handleClear}
            className="px-3 py-1.5 rounded-lg bg-coral-500 text-white font-medium hover:bg-coral-600 focus:outline-none focus:ring-2 focus:ring-coral-300"
          >
            Yes, clear
          </button>
          <button
            type="button"
            onClick={() => setConfirming(false)}
            className="px-3 py-1.5 rounded-lg text-foreground-secondary hover:text-foreground focus:outline-none focus:ring-2 focus:ring-coral-300"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  )
}
