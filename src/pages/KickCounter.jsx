import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAnalytics } from '../hooks/useAnalytics'
import { Header } from '../components/layout/Header'
import { Button } from '../components/ui/Button'
import { Card, CardContent } from '../components/ui/Card'

const KICK_GOAL = 10
const STORAGE_KEY = 'nayabirth-kick-sessions'

function formatTime(seconds) {
  const hrs = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  })
}

export function KickCounter() {
  const navigate = useNavigate()
  const { trackToolUsed } = useAnalytics()
  const [kicks, setKicks] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [startTime, setStartTime] = useState(null)
  const [showHistory, setShowHistory] = useState(false)
  const [sessions, setSessions] = useState([])
  const [showConfetti, setShowConfetti] = useState(false)

  // Load sessions from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        setSessions(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to load sessions')
      }
    }
  }, [])

  // Timer effect
  useEffect(() => {
    let interval = null
    if (isActive) {
      interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000))
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isActive, startTime])

  // Goal reached effect
  useEffect(() => {
    if (kicks === KICK_GOAL && isActive) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)
    }
  }, [kicks, isActive])

  const handleKick = useCallback(() => {
    if (!isActive) {
      setIsActive(true)
      setStartTime(Date.now())
    }
    setKicks(prev => prev + 1)
  }, [isActive])

  const handleSaveSession = useCallback(() => {
    if (kicks === 0) return

    const session = {
      id: Date.now(),
      date: new Date().toISOString(),
      kicks,
      duration: elapsedTime,
      goalReached: kicks >= KICK_GOAL
    }

    const updatedSessions = [session, ...sessions].slice(0, 20) // Keep last 20 sessions
    setSessions(updatedSessions)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSessions))

    // Track tool usage
    trackToolUsed('kick_counter', {
      kicks_recorded: kicks,
      session_duration_seconds: elapsedTime,
      goal_reached: kicks >= KICK_GOAL
    })

    // Reset
    setKicks(0)
    setIsActive(false)
    setElapsedTime(0)
    setStartTime(null)
  }, [kicks, elapsedTime, sessions, trackToolUsed])

  const handleReset = useCallback(() => {
    setKicks(0)
    setIsActive(false)
    setElapsedTime(0)
    setStartTime(null)
  }, [])

  const handleClearHistory = useCallback(() => {
    setSessions([])
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  const progress = Math.min((kicks / KICK_GOAL) * 100, 100)
  const isGoalReached = kicks >= KICK_GOAL

  return (
    <div className="min-h-screen bg-gradient-warm flex flex-col">
      <Header showBack onBack={() => navigate('/')} title="Kick Counter" />

      <main className="flex-1 max-w-lg mx-auto px-4 py-6 w-full">
        {/* Info Card */}
        <Card className="mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <span className="text-2xl" aria-hidden="true">💡</span>
              <div>
                <h2 className="font-medium text-foreground mb-1">Count your baby's kicks</h2>
                <p className="text-sm text-foreground-secondary">
                  Track at the same time daily when baby is active. Goal: Feel {KICK_GOAL} movements within 2 hours.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Counter */}
        <div className="text-center mb-8">
          {/* Progress Ring */}
          <div className="relative w-64 h-64 mx-auto mb-6">
            {/* Background circle */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={isGoalReached ? '#2dd4bf' : '#F8A5A5'}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${progress * 2.83} 283`}
                className="transition-all duration-300"
              />
            </svg>

            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div
                className={`text-6xl font-bold ${isGoalReached ? 'text-teal-600' : 'text-foreground'}`}
                aria-live="polite"
                aria-label={`${kicks} kicks recorded`}
              >
                {kicks}
              </div>
              <div className="text-foreground-secondary text-sm">
                of {KICK_GOAL} kicks
              </div>
              {isActive && (
                <div className="text-foreground-secondary text-lg mt-2 font-mono" aria-label={`Elapsed time: ${formatTime(elapsedTime)}`}>
                  {formatTime(elapsedTime)}
                </div>
              )}
            </div>

            {/* Confetti effect */}
            {showConfetti && (
              <div className="absolute inset-0 flex items-center justify-center text-6xl animate-bounce">
                🎉
              </div>
            )}
          </div>

          {/* Goal reached message */}
          {isGoalReached && (
            <div className="bg-teal-400/20 text-teal-700 rounded-xl p-4 mb-6 animate-fade-in">
              <div className="text-2xl mb-2">🌟</div>
              <p className="font-medium">Goal reached!</p>
              <p className="text-sm">Great job tracking your baby's movements.</p>
            </div>
          )}

          {/* Kick Button */}
          <button
            onClick={handleKick}
            aria-label="Record a kick"
            className="w-40 h-40 rounded-full bg-gradient-to-br from-coral-400 to-coral-500 text-white text-xl font-semibold shadow-soft hover:shadow-lg active:scale-95 transition-all duration-200 flex flex-col items-center justify-center mx-auto focus:outline-none focus:ring-4 focus:ring-coral-300 focus:ring-offset-2"
          >
            <span className="text-4xl mb-1" aria-hidden="true">👶</span>
            <span>I felt a kick!</span>
          </button>
        </div>

        {/* Session Controls */}
        {kicks > 0 && (
          <div className="flex gap-3 mb-6">
            <Button variant="secondary" onClick={handleReset} className="flex-1">
              Reset
            </Button>
            <Button variant="primary" onClick={handleSaveSession} className="flex-1">
              Save Session
            </Button>
          </div>
        )}

        {/* History Toggle */}
        {sessions.length > 0 && (
          <div className="mb-4">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="flex items-center justify-between w-full p-4 bg-surface rounded-xl shadow-card"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">📊</span>
                <span className="font-medium text-foreground">Session History</span>
                <span className="text-sm text-foreground-muted">({sessions.length})</span>
              </div>
              <svg
                className={`w-5 h-5 text-foreground-muted transition-transform ${showHistory ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}

        {/* History List */}
        {showHistory && sessions.length > 0 && (
          <div className="bg-surface rounded-xl shadow-card overflow-hidden animate-fade-in">
            <div className="divide-y divide-subtle">
              {sessions.map((session) => (
                <div key={session.id} className="p-4 flex items-center justify-between">
                  <div>
                    <div className="font-medium text-foreground">
                      {session.kicks} kicks in {formatTime(session.duration)}
                    </div>
                    <div className="text-sm text-foreground-muted">{formatDate(session.date)}</div>
                  </div>
                  {session.goalReached && (
                    <span className="text-teal-500 text-xl">✓</span>
                  )}
                </div>
              ))}
            </div>
            <div className="p-3 bg-muted border-t border-subtle">
              <button
                onClick={handleClearHistory}
                className="text-sm text-red-500 hover:text-red-600"
              >
                Clear History
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
