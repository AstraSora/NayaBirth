import { useNavigate } from 'react-router-dom'
import { useBirthPlan } from '../context/BirthPlanContext'
import { useAnalytics } from '../hooks/useAnalytics'
import { Header } from '../components/layout/Header'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardHeader } from '../components/ui/Card'
import questionsData from '../data/questions.json'

export function Review() {
  const navigate = useNavigate()
  const { responses } = useBirthPlan()
  const { trackBirthPlanDownloaded } = useAnalytics()

  const sections = questionsData.sections

  const handleDownloadPDF = async () => {
    const { generatePDF } = await import('../lib/pdf')
    await generatePDF(responses, sections)
    trackBirthPlanDownloaded()
  }

  const getDisplayValue = (question, value) => {
    if (!value) return <span className="text-foreground-muted italic">Not answered</span>

    if (question.type === 'checkbox' && Array.isArray(value)) {
      if (value.length === 0) return <span className="text-foreground-muted italic">None selected</span>
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
        {/* Summary Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Your Birth Plan
          </h1>
          <p className="text-foreground-muted">
            Review your preferences below. Tap any section to make changes.
          </p>
        </div>

        {/* Save reminder - plans are not stored, patient keeps their own copy */}
        <div className="mb-6 p-4 bg-sky-50 border border-sky-200 rounded-xl text-sm text-foreground-secondary">
          <p className="font-medium text-foreground mb-1">📄 Save a copy to keep your plan</p>
          <p>
            Your birth plan isn't stored in the app. Use <span className="font-medium">Save / Print</span> below
            to save it to your device or print a copy to bring to your appointments.
          </p>
        </div>

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
                      ${hasResponses ? 'bg-teal-400' : 'bg-muted'}
                    `}>
                      {hasResponses ? (
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <span className="text-sm text-foreground-muted">{sectionIndex + 1}</span>
                      )}
                    </div>
                    <h3 className="font-semibold text-foreground">{section.title}</h3>
                  </div>
                  <button
                    onClick={() => {
                      navigate('/birth-plan')
                    }}
                    className="text-coral-500 text-sm font-medium hover:text-coral-600"
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
                        <div key={question.id} className="py-2 border-b border-subtle last:border-0">
                          <div className="text-sm text-foreground-muted mb-1">
                            {question.question?.replace('?', '').slice(0, 50)}
                            {question.question?.length > 50 ? '...' : ''}
                          </div>
                          <div className="text-foreground">
                            {getDisplayValue(question, value)}
                          </div>
                        </div>
                      )
                    })}
                  {section.questions.filter(q => q.type !== 'info').length > 4 && (
                    <p className="text-sm text-foreground-muted pt-2">
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
      <div className="fixed bottom-0 left-0 right-0 bg-surface/80 backdrop-blur-md border-t border-subtle safe-area-bottom">
        <div className="max-w-lg mx-auto px-4 py-4">
          <Button
            variant="primary"
            onClick={handleDownloadPDF}
            className="w-full"
          >
            🖨️ Save / Print My Plan
          </Button>
        </div>
      </div>
    </div>
  )
}
