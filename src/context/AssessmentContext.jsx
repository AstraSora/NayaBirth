import { createContext, useContext, useState, useCallback } from 'react'
import epdsData from '../data/epds.json'

const AssessmentContext = createContext(null)

export function AssessmentProvider({ children }) {
  const [answers, setAnswers] = useState({})
  const [currentQuestion, setCurrentQuestion] = useState(0)

  const totalQuestions = epdsData.questions.length

  const setAnswer = useCallback((questionId, score) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: score
    }))
  }, [])

  const getAnswer = useCallback((questionId) => {
    return answers[questionId]
  }, [answers])

  const calculateScore = useCallback(() => {
    return Object.values(answers).reduce((sum, score) => sum + score, 0)
  }, [answers])

  const getScoreCategory = useCallback(() => {
    const score = calculateScore()
    const { scoring } = epdsData

    if (score >= scoring.high.range[0]) {
      return { ...scoring.high, score }
    } else if (score >= scoring.moderate.range[0]) {
      return { ...scoring.moderate, score }
    } else {
      return { ...scoring.low, score }
    }
  }, [calculateScore])

  const isComplete = useCallback(() => {
    return Object.keys(answers).length === totalQuestions
  }, [answers, totalQuestions])

  const hasHighRiskAnswer = useCallback(() => {
    // Question 10 is about self-harm - any non-zero answer is concerning
    return answers[10] !== undefined && answers[10] > 0
  }, [answers])

  const reset = useCallback(() => {
    setAnswers({})
    setCurrentQuestion(0)
  }, [])

  const goToNext = useCallback(() => {
    // Only advance if current question is answered
    const currentQuestionId = epdsData.questions[currentQuestion]?.id
    if (currentQuestion < totalQuestions - 1 && answers[currentQuestionId] !== undefined) {
      setCurrentQuestion(prev => prev + 1)
    }
  }, [currentQuestion, totalQuestions, answers])

  const goToPrevious = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }, [currentQuestion])

  const value = {
    questions: epdsData.questions,
    answers,
    setAnswer,
    getAnswer,
    calculateScore,
    getScoreCategory,
    isComplete,
    hasHighRiskAnswer,
    reset,
    currentQuestion,
    setCurrentQuestion,
    goToNext,
    goToPrevious,
    totalQuestions,
    epdsData
  }

  return (
    <AssessmentContext.Provider value={value}>
      {children}
    </AssessmentContext.Provider>
  )
}

export function useAssessment() {
  const context = useContext(AssessmentContext)
  if (!context) {
    throw new Error('useAssessment must be used within an AssessmentProvider')
  }
  return context
}
