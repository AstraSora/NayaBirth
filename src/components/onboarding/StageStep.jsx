import { useState, useMemo } from 'react'
import { useOnboarding } from '../../context/OnboardingContext'
import { Button } from '../ui/Button'

export function StageStep() {
  const { nextStep, prevStep, updateProfile } = useOnboarding()
  const [selectedOption, setSelectedOption] = useState(null)
  const [dueDate, setDueDate] = useState('')

  // Calculate current week from due date
  const currentWeek = useMemo(() => {
    if (!dueDate) return null
    const due = new Date(dueDate)
    const now = new Date()
    const diffTime = due.getTime() - now.getTime()
    const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7))
    const week = 40 - diffWeeks
    return Math.max(1, Math.min(42, week))
  }, [dueDate])

  const handleContinue = () => {
    if (selectedOption === 'dueDate' && dueDate) {
      updateProfile({
        dueDate,
        stage: 'pregnant',
        trimester: currentWeek <= 12 ? 1 : currentWeek <= 26 ? 2 : 3
      })
    } else if (selectedOption === 'trimester1') {
      updateProfile({ stage: 'pregnant', trimester: 1 })
    } else if (selectedOption === 'trimester2') {
      updateProfile({ stage: 'pregnant', trimester: 2 })
    } else if (selectedOption === 'trimester3') {
      updateProfile({ stage: 'pregnant', trimester: 3 })
    } else if (selectedOption === 'postpartum') {
      updateProfile({ stage: 'postpartum' })
    } else if (selectedOption === 'planning') {
      updateProfile({ stage: 'planning' })
    }
    nextStep()
  }

  const handleSkip = () => {
    nextStep()
  }

  const canContinue = selectedOption && (selectedOption !== 'dueDate' || dueDate)

  const options = [
    { id: 'dueDate', label: 'I know my due date', icon: '📅' },
    { id: 'trimester', label: 'I know my trimester', icon: '🗓️' },
    { id: 'postpartum', label: "I'm postpartum", subtitle: 'Recently delivered', icon: '👶' },
    { id: 'planning', label: "I'm planning a pregnancy", icon: '💭' },
  ]

  return (
    <div className="min-h-screen bg-gradient-warm flex flex-col">
      <main className="flex-1 flex flex-col px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Where are you in your pregnancy journey?
          </h1>
          <p className="text-foreground-secondary">
            This helps us show you the most relevant tools and resources.
          </p>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => {
                if (option.id === 'trimester') {
                  setSelectedOption('trimester')
                } else {
                  setSelectedOption(option.id)
                }
              }}
              className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all ${
                selectedOption === option.id ||
                (option.id === 'trimester' && ['trimester1', 'trimester2', 'trimester3'].includes(selectedOption))
                  ? 'bg-coral-100 border-2 border-coral-400'
                  : 'bg-surface border-2 border-transparent hover:border-coral-200'
              }`}
            >
              <span className="text-2xl">{option.icon}</span>
              <div className="text-left">
                <span className="font-medium text-foreground">{option.label}</span>
                {option.subtitle && (
                  <p className="text-sm text-foreground-muted">{option.subtitle}</p>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Due Date Picker */}
        {selectedOption === 'dueDate' && (
          <div className="bg-surface rounded-xl p-4 mb-6 border border-subtle">
            <label className="block text-sm font-medium text-foreground mb-2">
              Enter your due date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-subtle bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-coral-300"
            />
            {currentWeek && (
              <p className="mt-3 text-center text-coral-500 font-semibold">
                You're in week {currentWeek} of your pregnancy
              </p>
            )}
          </div>
        )}

        {/* Trimester Selection */}
        {selectedOption === 'trimester' && (
          <div className="bg-surface rounded-xl p-4 mb-6 border border-subtle">
            <label className="block text-sm font-medium text-foreground mb-3">
              Select your trimester
            </label>
            <div className="space-y-2">
              {[
                { id: 'trimester1', label: 'First trimester', subtitle: 'Weeks 1-12' },
                { id: 'trimester2', label: 'Second trimester', subtitle: 'Weeks 13-26' },
                { id: 'trimester3', label: 'Third trimester', subtitle: 'Weeks 27-40' },
              ].map((tri) => (
                <button
                  key={tri.id}
                  onClick={() => setSelectedOption(tri.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                    selectedOption === tri.id
                      ? 'bg-coral-100 border-2 border-coral-400'
                      : 'bg-muted border-2 border-transparent hover:border-coral-200'
                  }`}
                >
                  <span className="font-medium text-foreground">{tri.label}</span>
                  <span className="text-sm text-foreground-muted">{tri.subtitle}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Navigation */}
        <div className="space-y-3">
          <Button
            onClick={handleContinue}
            size="lg"
            className="w-full"
            disabled={!canContinue}
          >
            Continue
          </Button>

          <div className="flex justify-between">
            <button
              onClick={prevStep}
              className="text-foreground-secondary hover:text-foreground transition-colors px-4 py-2"
            >
              ← Back
            </button>
            <button
              onClick={handleSkip}
              className="text-foreground-muted hover:text-foreground-secondary transition-colors text-sm px-4 py-2"
            >
              Skip this step
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
