/**
 * Study Enrollment Component
 * Allows research participants to enroll in the NayaBirth study
 * using a code provided by the research team
 */
import { useState } from 'react'
import { useAnalyticsContext } from '../../context/AnalyticsContext'
import { Card, CardContent } from '../ui/Card'
import { Button } from '../ui/Button'

/**
 * Enrollment codes and their group mappings
 * INT-XXXX = Intervention group (birth plan users)
 * CTL-XXXX = Control group (non-birth plan users)
 */
function getStudyGroupFromCode(code) {
  const normalized = code.toUpperCase().trim()
  if (normalized.startsWith('INT-')) return 'intervention'
  if (normalized.startsWith('CTL-')) return 'control'
  return null
}

export function StudyEnrollment() {
  const { isStudyParticipant, studyGroup, enrollInStudy, unenrollFromStudy, studyProperties } = useAnalyticsContext()
  const [code, setCode] = useState('')
  const [error, setError] = useState(null)
  const [showEnrollForm, setShowEnrollForm] = useState(false)
  const [showUnenrollConfirm, setShowUnenrollConfirm] = useState(false)

  const handleEnroll = () => {
    const group = getStudyGroupFromCode(code)

    if (!group) {
      setError('Invalid enrollment code. Please check your code and try again.')
      return
    }

    enrollInStudy(group)
    setCode('')
    setError(null)
    setShowEnrollForm(false)
  }

  const handleUnenroll = () => {
    unenrollFromStudy()
    setShowUnenrollConfirm(false)
  }

  // Already enrolled view
  if (isStudyParticipant) {
    return (
      <Card>
        <CardContent className="pt-5">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-full bg-teal-100 flex items-center justify-center text-xl" aria-hidden="true">
              🔬
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-foreground mb-1">
                Research Study Participant
              </h3>
              <p className="text-sm text-foreground-muted mb-2">
                You are enrolled in the NayaBirth research study.
              </p>
              <div className="text-xs text-foreground-muted space-y-1">
                <p>
                  <span className="font-medium">Group:</span>{' '}
                  <span className="capitalize">{studyGroup}</span>
                </p>
                <p>
                  <span className="font-medium">Enrolled:</span>{' '}
                  {new Date(studyProperties.enrollment_date).toLocaleDateString()}
                </p>
              </div>

              {!showUnenrollConfirm ? (
                <button
                  onClick={() => setShowUnenrollConfirm(true)}
                  className="mt-3 text-xs text-foreground-muted hover:text-red-500 transition-colors"
                >
                  Leave study
                </button>
              ) : (
                <div className="mt-3 p-3 bg-red-50 rounded-lg">
                  <p className="text-sm text-red-700 mb-2">
                    Are you sure you want to leave the study?
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      onClick={() => setShowUnenrollConfirm(false)}
                      className="text-xs py-1 px-3"
                    >
                      Cancel
                    </Button>
                    <button
                      onClick={handleUnenroll}
                      className="text-xs py-1 px-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Leave Study
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Not enrolled - show enrollment option
  return (
    <Card>
      <CardContent className="pt-5">
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-full bg-muted flex items-center justify-center text-xl" aria-hidden="true">
            🔬
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-foreground mb-1">
              Research Study
            </h3>
            <p className="text-sm text-foreground-muted">
              Have an enrollment code from the research team?
            </p>

            {!showEnrollForm ? (
              <button
                onClick={() => setShowEnrollForm(true)}
                className="mt-2 text-sm text-coral-500 hover:text-coral-600 font-medium"
              >
                Enter enrollment code
              </button>
            ) : (
              <div className="mt-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value)
                      setError(null)
                    }}
                    placeholder="e.g., INT-1234"
                    className="flex-1 px-3 py-2 border border-subtle rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-coral-300 focus:border-coral-400 bg-surface text-foreground"
                    autoFocus
                  />
                  <Button
                    variant="primary"
                    onClick={handleEnroll}
                    disabled={!code.trim()}
                    className="text-sm"
                  >
                    Enroll
                  </Button>
                </div>
                {error && (
                  <p className="text-sm text-red-500 mt-2">{error}</p>
                )}
                <button
                  onClick={() => {
                    setShowEnrollForm(false)
                    setCode('')
                    setError(null)
                  }}
                  className="mt-2 text-xs text-foreground-muted hover:text-foreground-secondary"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
