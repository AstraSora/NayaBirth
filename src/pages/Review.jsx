import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBirthPlan } from '../context/BirthPlanContext'
import { Header } from '../components/layout/Header'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardHeader } from '../components/ui/Card'
import { saveBirthPlan, generateUniquePIN } from '../lib/firebase'
import questionsData from '../data/questions.json'

export function Review() {
  const navigate = useNavigate()
  const { responses, pin, setPIN, setSaved } = useBirthPlan()
  const [saving, setSaving] = useState(false)
  const [showPIN, setShowPIN] = useState(false)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState(null)

  const sections = questionsData.sections

  const handleSave = async () => {
    setSaving(true)
    setError(null)

    try {
      let planPIN = pin
      if (!planPIN) {
        planPIN = await generateUniquePIN()
        setPIN(planPIN)
      }

      const result = await saveBirthPlan(planPIN, responses)

      if (result.success) {
        setSaved()
        setShowPIN(true)
      } else {
        setError(result.error || 'Failed to save. Please try again.')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const handleCopyPIN = async () => {
    if (pin) {
      await navigator.clipboard.writeText(pin)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleDownloadPDF = async () => {
    const { generatePDF } = await import('../lib/pdf')
    await generatePDF(responses, sections)
  }

  const handleEdit = (sectionIndex) => {
    navigate('/birth-plan')
    // Use setTimeout to ensure navigation completes before setting section
    setTimeout(() => {
      const { setCurrentSection } = useBirthPlan.getState?.() || {}
      if (setCurrentSection) setCurrentSection(sectionIndex)
    }, 0)
  }

  const getDisplayValue = (question, value) => {
    if (!value) return <span className="text-gray-500 italic dark:text-gray-400">Not answered</span>

    if (question.type === 'checkbox' && Array.isArray(value)) {
      if (value.length === 0) return <span className="text-gray-500 italic dark:text-gray-400">None selected</span>
      const labels = value.map(v => {
        const opt = question.options?.find(o => o.value === v)
        return opt?.label || v
      })
      return labels.join(', ')
    }

    if (question.type === 'radio') {
      const opt = question.options?.find(o => o.value === value)
      return opt?.label || value
    }

    return value
  }

  return (
    <div className="min-h-screen bg-gradient-warm">
      <Header showBack onBack={() => navigate('/birth-plan')} title="Review Your Plan" showHome />

      <main className="max-w-lg mx-auto px-4 py-6 pb-32">
        {/* PIN Display Modal */}
        {showPIN && pin && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card color="white" className="w-full max-w-sm">
              <CardContent className="pt-6 text-center">
                <div className="text-5xl mb-4">🎉</div>
                <h2 className="text-xl font-bold text-gray-800 mb-2 dark:text-gray-100">
                  Plan Saved!
                </h2>
                <p className="text-gray-600 mb-4 dark:text-gray-400">
                  Your unique PIN to access this plan:
                </p>
                <div className="bg-coral-50 rounded-xl p-4 mb-4 dark:bg-coral-900/20">
                  <span className="text-3xl font-mono font-bold text-coral-600 tracking-wider dark:text-coral-400">
                    {pin}
                  </span>
                </div>
                <Button
                  variant="secondary"
                  onClick={handleCopyPIN}
                  className="w-full mb-3"
                >
                  {copied ? '✓ Copied!' : 'Copy PIN'}
                </Button>
                <Button
                  variant="primary"
                  onClick={() => setShowPIN(false)}
                  className="w-full"
                >
                  Done
                </Button>
                <p className="text-xs text-gray-500 mt-4 dark:text-gray-400">
                  Save this PIN - you'll need it to access your plan later
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Summary Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2 dark:text-gray-100">
            Your Birth Plan
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Review your preferences below. Tap any section to make changes.
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm dark:bg-red-900/30 dark:border-red-700 dark:text-red-300">
            {error}
          </div>
        )}

        {/* Sections Summary */}
        <div className="space-y-4">
          {sections.map((section, sectionIndex) => {
            const sectionResponses = responses[section.id] || {}
            const hasResponses = Object.values(sectionResponses).some(v =>
              v !== undefined && v !== null && v !== '' && (!Array.isArray(v) || v.length > 0)
            )

            return (
              <Card key={section.id} color="white">
                <CardHeader className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center
                      ${hasResponses ? 'bg-teal-400 dark:bg-teal-500' : 'bg-gray-200 dark:bg-gray-700'}
                    `}>
                      {hasResponses ? (
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <span className="text-sm text-gray-500 dark:text-gray-400">{sectionIndex + 1}</span>
                      )}
                    </div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100">{section.title}</h3>
                  </div>
                  <button
                    onClick={() => {
                      navigate('/birth-plan')
                    }}
                    className="text-coral-500 text-sm font-medium hover:text-coral-600 dark:text-coral-400 dark:hover:text-coral-300"
                  >
                    Edit
                  </button>
                </CardHeader>
                <CardContent className="pt-0">
                  {section.questions
                    .filter(q => q.type !== 'info')
                    .slice(0, 4)
                    .map((question) => {
                      const value = sectionResponses[question.id]
                      return (
                        <div key={question.id} className="py-2 border-b border-gray-100 last:border-0 dark:border-gray-700">
                          <div className="text-sm text-gray-500 mb-1 dark:text-gray-400">
                            {question.question?.replace('?', '').slice(0, 50)}
                            {question.question?.length > 50 ? '...' : ''}
                          </div>
                          <div className="text-gray-800 dark:text-gray-200">
                            {getDisplayValue(question, value)}
                          </div>
                        </div>
                      )
                    })}
                  {section.questions.filter(q => q.type !== 'info').length > 4 && (
                    <p className="text-sm text-gray-400 pt-2 dark:text-gray-500">
                      +{section.questions.filter(q => q.type !== 'info').length - 4} more items
                    </p>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </main>

      {/* Fixed bottom actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-100 safe-area-bottom dark:bg-gray-900/80 dark:border-gray-800">
        <div className="max-w-lg mx-auto px-4 py-4 space-y-3">
          <div className="flex gap-3">
            <Button
              variant="secondary"
              onClick={handleDownloadPDF}
              className="flex-1"
            >
              🖨️ Print
            </Button>
            <Button
              variant="primary"
              onClick={handleSave}
              loading={saving}
              className="flex-1"
            >
              💾 Save Plan
            </Button>
          </div>
          {pin && (
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              Your PIN: <span className="font-mono font-bold dark:text-gray-200">{pin}</span>
              <button
                onClick={handleCopyPIN}
                className="ml-2 text-coral-500 hover:text-coral-600 dark:text-coral-400 dark:hover:text-coral-300"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
