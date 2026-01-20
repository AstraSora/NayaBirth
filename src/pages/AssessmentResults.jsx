import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAssessment } from '../context/AssessmentContext'
import { Header } from '../components/layout/Header'
import { Button } from '../components/ui/Button'
import { Card, CardContent } from '../components/ui/Card'

export function AssessmentResults() {
  const navigate = useNavigate()
  const {
    getScoreCategory,
    hasHighRiskAnswer,
    isComplete,
    epdsData,
    reset
  } = useAssessment()

  const [showCrisis, setShowCrisis] = useState(false)

  useEffect(() => {
    // Check if we have results to show
    if (!isComplete()) {
      navigate('/assessment')
      return
    }

    // Show crisis resources if high risk answer
    if (hasHighRiskAnswer()) {
      setShowCrisis(true)
    }
  }, [isComplete, hasHighRiskAnswer, navigate])

  const result = getScoreCategory()
  const { resources } = epdsData

  const colorStyles = {
    teal: {
      bg: 'bg-teal-400/20',
      border: 'border-teal-400',
      text: 'text-teal-600',
      icon: '💚'
    },
    coral: {
      bg: 'bg-coral-100',
      border: 'border-coral-400',
      text: 'text-coral-600',
      icon: '🧡'
    },
    red: {
      bg: 'bg-red-100',
      border: 'border-red-400',
      text: 'text-red-600',
      icon: '❤️'
    }
  }

  const style = colorStyles[result.color] || colorStyles.teal

  const handleStartOver = () => {
    reset()
    navigate('/assessment')
  }

  return (
    <div className="min-h-screen bg-gradient-warm flex flex-col">
      <Header showBack onBack={() => navigate('/')} title="Your Results" />

      <main className="flex-1 max-w-lg mx-auto px-4 py-6 w-full">
        {/* Crisis Banner - Always visible if high risk */}
        {(showCrisis || result.color === 'red') && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6 animate-fade-in">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🆘</span>
              <div>
                <h3 className="font-semibold text-red-800 mb-1">
                  {resources.crisis.title}
                </h3>
                <p className="text-sm text-red-700 mb-4">
                  {resources.crisis.message}
                </p>
                <div className="space-y-2">
                  {resources.crisis.contacts.map((contact, index) => (
                    <a
                      key={index}
                      href={`tel:${contact.phone}`}
                      className="flex items-center gap-3 bg-white rounded-xl p-3 hover:bg-red-50 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-xl">
                        📞
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">{contact.name}</div>
                        <div className="text-sm text-gray-500">{contact.description}</div>
                      </div>
                      <div className="font-bold text-red-600">{contact.phone}</div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Score Display */}
        <div className={`${style.bg} border-2 ${style.border} rounded-2xl p-6 mb-6 text-center animate-fade-in`}>
          <div className="text-4xl mb-3">{style.icon}</div>
          <div className="text-4xl font-bold text-gray-800 mb-2">{result.score}</div>
          <div className={`text-lg font-semibold ${style.text} mb-3`}>{result.title}</div>
          <p className="text-gray-600 text-sm leading-relaxed">{result.message}</p>
        </div>

        {/* Disclaimer */}
        <Card className="mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <span className="text-xl">ℹ️</span>
              <div>
                <h4 className="font-medium text-gray-800 mb-1">Important Information</h4>
                <p className="text-sm text-gray-600">
                  {epdsData.disclaimer}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recommended Next Steps</h3>
          <div className="space-y-3">
            {resources.support.map((item, index) => (
              <Card key={index} color="white">
                <CardContent className="pt-5">
                  <h4 className="font-medium text-gray-800 mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Score Explanation */}
        <div className="bg-gray-50 rounded-2xl p-4 mb-6">
          <h4 className="font-medium text-gray-700 mb-3">Understanding Your Score</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-teal-400"></div>
              <span className="text-gray-600">0-9: Low - Coping well</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-coral-400"></div>
              <span className="text-gray-600">10-12: Moderate - May benefit from support</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <span className="text-gray-600">13+: Elevated - Recommend speaking with provider</span>
            </div>
          </div>
        </div>
      </main>

      {/* Actions */}
      <div className="sticky bottom-0 bg-white border-t border-gray-100 safe-area-bottom">
        <div className="max-w-lg mx-auto px-4 py-4 flex gap-3">
          <Button
            variant="secondary"
            onClick={handleStartOver}
            className="flex-1"
          >
            Take Again
          </Button>
          <Link to="/" className="flex-1">
            <Button variant="primary" className="w-full">
              Back to Hub
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
