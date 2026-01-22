import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOnboarding } from '../../context/OnboardingContext'
import { getRecommendedTools } from '../../lib/getRecommendedTools'
import { Button } from '../ui/Button'

export function RecommendationsStep() {
  const { nextStep, prevStep, completeOnboarding, profile, getCurrentWeek, getEffectiveTrimester } = useOnboarding()
  const navigate = useNavigate()

  const recommendations = useMemo(() => {
    return getRecommendedTools({
      trimester: getEffectiveTrimester(),
      stage: profile.stage
    })
  }, [profile.stage, getEffectiveTrimester])

  const currentWeek = getCurrentWeek()
  const trimester = getEffectiveTrimester()

  // Build context message based on stage
  const getContextMessage = () => {
    if (profile.stage === 'postpartum') {
      return "Congratulations on your new arrival!"
    }
    if (profile.stage === 'planning') {
      return "Preparing for your pregnancy journey"
    }
    if (currentWeek) {
      return `At week ${currentWeek} of your pregnancy...`
    }
    if (trimester) {
      const trimesterNames = ['', 'first', 'second', 'third']
      return `In your ${trimesterNames[trimester]} trimester...`
    }
    return "Based on your pregnancy journey..."
  }

  const handleExploreTool = (tool) => {
    completeOnboarding()
    navigate(tool.route)
  }

  const handleSeeAllTools = () => {
    completeOnboarding()
    navigate('/')
  }

  const handleContinueToTour = () => {
    nextStep()
  }

  const primaryTool = recommendations.find(t => t.isPrimary)
  const secondaryTools = recommendations.filter(t => !t.isPrimary)

  return (
    <div className="min-h-screen bg-gradient-warm flex flex-col">
      <main className="flex-1 flex flex-col px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Recommended for you
          </h1>
          <p className="text-foreground-secondary">
            {getContextMessage()}
          </p>
        </div>

        {/* Primary Recommendation */}
        {primaryTool && (
          <div className="mb-6">
            <div className="bg-surface rounded-2xl p-6 shadow-soft border-2 border-coral-200">
              <div className="flex items-start gap-4 mb-4">
                <span className="text-4xl">{primaryTool.icon}</span>
                <div className="flex-1">
                  <h2 className="font-bold text-lg text-foreground mb-1">
                    {primaryTool.name}
                  </h2>
                  <p className="text-sm text-foreground-secondary mb-2">
                    {primaryTool.description}
                  </p>
                  <p className="text-sm text-coral-500 font-medium">
                    {primaryTool.relevanceText}
                  </p>
                </div>
              </div>
              <Button
                onClick={() => handleExploreTool(primaryTool)}
                className="w-full"
              >
                Explore {primaryTool.name}
              </Button>
            </div>
          </div>
        )}

        {/* Secondary Recommendations */}
        {secondaryTools.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-foreground-muted uppercase tracking-wide mb-3">
              Also recommended
            </h3>
            <div className="space-y-3">
              {secondaryTools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => handleExploreTool(tool)}
                  className="w-full flex items-center gap-4 p-4 bg-surface rounded-xl hover:bg-surface-hover transition-colors text-left"
                >
                  <span className="text-2xl">{tool.icon}</span>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{tool.name}</h4>
                    <p className="text-sm text-foreground-muted">{tool.relevanceText}</p>
                  </div>
                  <svg className="w-5 h-5 text-foreground-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* No Stage Selected Message */}
        {!profile.stage && !trimester && (
          <div className="text-center py-8 text-foreground-muted">
            <p>Complete the previous step to get personalized recommendations.</p>
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Navigation */}
        <div className="space-y-3">
          <Button
            onClick={handleContinueToTour}
            variant="outline"
            size="lg"
            className="w-full"
          >
            Continue to quick tour
          </Button>

          <div className="flex justify-between items-center">
            <button
              onClick={prevStep}
              className="text-foreground-secondary hover:text-foreground transition-colors px-4 py-2"
            >
              ← Back
            </button>
            <button
              onClick={handleSeeAllTools}
              className="text-coral-500 hover:text-coral-600 transition-colors text-sm font-medium px-4 py-2"
            >
              See all tools →
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
