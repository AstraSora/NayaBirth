import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAssessment } from '../context/AssessmentContext'
import { Header } from '../components/layout/Header'
import { Button } from '../components/ui/Button'

export function Assessment() {
  const navigate = useNavigate()
  const {
    questions,
    currentQuestion,
    setCurrentQuestion,
    setAnswer,
    getAnswer,
    goToNext,
    goToPrevious,
    totalQuestions,
    isComplete,
    reset,
    epdsData
  } = useAssessment()

  const question = questions[currentQuestion]
  const selectedAnswer = getAnswer(question.id)
  const progress = ((currentQuestion + 1) / totalQuestions) * 100

  // Reset on mount
  useEffect(() => {
    reset()
  }, [])

  const handleSelectOption = (score) => {
    setAnswer(question.id, score)
    // Auto-advance after a short delay
    setTimeout(() => {
      if (currentQuestion < totalQuestions - 1) {
        goToNext()
      }
    }, 300)
  }

  const handleBack = () => {
    if (currentQuestion === 0) {
      navigate('/')
    } else {
      goToPrevious()
    }
  }

  const handleSubmit = () => {
    if (isComplete()) {
      navigate('/assessment/results')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-warm flex flex-col">
      <Header showBack onBack={handleBack} title="Wellbeing Check" />

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-lg mx-auto px-4 py-3">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Question {currentQuestion + 1} of {totalQuestions}</span>
            <span aria-live="polite">{Math.round(progress)}%</span>
          </div>
          <div
            className="h-2 bg-gray-100 rounded-full overflow-hidden"
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Progress: ${Math.round(progress)}%`}
          >
            <div
              className="h-full bg-teal-400 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Intro Message (only on first question) */}
      {currentQuestion === 0 && (
        <div className="max-w-lg mx-auto px-4 pt-4">
          <div className="bg-teal-100 rounded-xl p-4 text-sm text-gray-700">
            <p className="font-medium text-gray-800 mb-1">{epdsData.timeframe}</p>
          </div>
        </div>
      )}

      {/* Question */}
      <main className="flex-1 max-w-lg mx-auto px-4 py-6 w-full" role="form" aria-label="Assessment questionnaire">
        <div className="animate-fade-in">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 leading-relaxed" id="question-text">
            {question.text}
          </h2>

          <div className="space-y-3" role="radiogroup" aria-labelledby="question-text">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelectOption(option.score)}
                role="radio"
                aria-checked={selectedAnswer === option.score}
                className={`w-full text-left p-4 min-h-[56px] rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 ${
                  selectedAnswer === option.score
                    ? 'border-teal-400 bg-teal-100'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                    selectedAnswer === option.score
                      ? 'border-teal-400 bg-teal-400'
                      : 'border-gray-300'
                  }`} aria-hidden="true">
                    {selectedAnswer === option.score && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <span className="text-gray-800">{option.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Navigation */}
      <div className="sticky bottom-0 bg-white border-t border-gray-100 safe-area-bottom">
        <div className="max-w-lg mx-auto px-4 py-4 flex gap-3">
          <Button
            variant="secondary"
            onClick={handleBack}
            className="flex-1"
          >
            {currentQuestion === 0 ? 'Cancel' : 'Back'}
          </Button>

          {currentQuestion === totalQuestions - 1 ? (
            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={!isComplete()}
              className="flex-1"
            >
              See Results
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={goToNext}
              disabled={selectedAnswer === undefined}
              className="flex-1"
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
