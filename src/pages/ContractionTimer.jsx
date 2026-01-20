import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from '../components/layout/Header'
import { Button } from '../components/ui/Button'
import { Card, CardContent } from '../components/ui/Card'

const STORAGE_KEY = 'nayabirth-contractions'

function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

function formatTime(dateString) {
  return new Date(dateString).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit'
  })
}

export function ContractionTimer() {
  const navigate = useNavigate()
  const [isTimingContraction, setIsTimingContraction] = useState(false)
  const [contractionStart, setContractionStart] = useState(null)
  const [currentDuration, setCurrentDuration] = useState(0)
  const [contractions, setContractions] = useState([])
  const [show511Alert, setShow511Alert] = useState(false)
  const intervalRef = useRef(null)

  // Load contractions from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        setContractions(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to load contractions')
      }
    }
  }, [])

  // Timer effect
  useEffect(() => {
    if (isTimingContraction && contractionStart) {
      intervalRef.current = setInterval(() => {
        setCurrentDuration(Math.floor((Date.now() - contractionStart) / 1000))
      }, 100)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isTimingContraction, contractionStart])

  // Check 5-1-1 rule
  useEffect(() => {
    if (contractions.length >= 3) {
      const recentContractions = contractions.slice(0, 6) // Check last 6 contractions

      // Check if contractions are about 5 minutes apart (4-6 min range)
      const intervalsValid = recentContractions.slice(0, -1).every((c, i) => {
        if (i === 0) return true
        const interval = (new Date(recentContractions[i].startTime) - new Date(recentContractions[i + 1].startTime)) / 1000 / 60
        return interval >= 4 && interval <= 6
      })

      // Check if durations are about 1 minute (45-90 sec range)
      const durationsValid = recentContractions.every(c => c.duration >= 45 && c.duration <= 90)

      // Check if this pattern has been going on for an hour (at least 6 contractions ~5 min apart)
      if (contractions.length >= 6 && intervalsValid && durationsValid) {
        const firstContraction = new Date(contractions[5].startTime)
        const latestContraction = new Date(contractions[0].startTime)
        const hourElapsed = (latestContraction - firstContraction) >= 60 * 60 * 1000

        if (hourElapsed) {
          setShow511Alert(true)
        }
      }
    }
  }, [contractions])

  const startContraction = useCallback(() => {
    setIsTimingContraction(true)
    setContractionStart(Date.now())
    setCurrentDuration(0)
  }, [])

  const stopContraction = useCallback(() => {
    if (!contractionStart) return

    const duration = Math.floor((Date.now() - contractionStart) / 1000)
    const newContraction = {
      id: Date.now(),
      startTime: new Date(contractionStart).toISOString(),
      duration,
      interval: contractions.length > 0
        ? Math.floor((contractionStart - new Date(contractions[0].startTime).getTime()) / 1000)
        : null
    }

    const updated = [newContraction, ...contractions].slice(0, 50) // Keep last 50
    setContractions(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))

    setIsTimingContraction(false)
    setContractionStart(null)
    setCurrentDuration(0)
  }, [contractionStart, contractions])

  const handleClearAll = useCallback(() => {
    setContractions([])
    localStorage.removeItem(STORAGE_KEY)
    setShow511Alert(false)
  }, [])

  // Calculate averages
  const getAverages = () => {
    if (contractions.length === 0) return { avgDuration: 0, avgInterval: 0 }

    const avgDuration = Math.round(
      contractions.reduce((sum, c) => sum + c.duration, 0) / contractions.length
    )

    const contractionsWithInterval = contractions.filter(c => c.interval !== null)
    const avgInterval = contractionsWithInterval.length > 0
      ? Math.round(
          contractionsWithInterval.reduce((sum, c) => sum + c.interval, 0) / contractionsWithInterval.length
        )
      : 0

    return { avgDuration, avgInterval }
  }

  const { avgDuration, avgInterval } = getAverages()

  return (
    <div className="min-h-screen bg-gradient-warm flex flex-col">
      <Header showBack onBack={() => navigate('/')} title="Contraction Timer" />

      <main className="flex-1 max-w-lg mx-auto px-4 py-6 w-full">
        {/* 5-1-1 Alert */}
        {show511Alert && (
          <div className="bg-coral-100 border border-coral-400 rounded-2xl p-4 mb-6 animate-fade-in">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🏥</span>
              <div>
                <h3 className="font-semibold text-coral-700 mb-1">
                  Consider heading to the hospital
                </h3>
                <p className="text-sm text-coral-600">
                  Your contractions appear to follow the 5-1-1 pattern: about 5 minutes apart,
                  lasting about 1 minute, for over 1 hour. Contact your provider or head to
                  Labor & Delivery.
                </p>
                <a
                  href="tel:+19498248200"
                  className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-coral-500 text-white rounded-xl font-medium text-sm"
                >
                  <span>📞</span> Call UCI L&D
                </a>
              </div>
            </div>
          </div>
        )}

        {/* 5-1-1 Info */}
        <Card className="mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <span className="text-2xl" aria-hidden="true">💡</span>
              <div>
                <h2 className="font-medium text-gray-800 mb-1">The 5-1-1 Rule</h2>
                <p className="text-sm text-gray-700">
                  Call your provider when contractions are <strong>5</strong> minutes apart,
                  lasting <strong>1</strong> minute each, for <strong>1</strong> hour.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timer Display */}
        <div className="text-center mb-8">
          <div
            className={`text-7xl font-mono font-bold mb-4 transition-colors ${
              isTimingContraction ? 'text-coral-500' : 'text-gray-800'
            }`}
            aria-live="polite"
            aria-label={`Duration: ${formatDuration(currentDuration)}`}
          >
            {formatDuration(currentDuration)}
          </div>

          {isTimingContraction && (
            <div className="text-gray-600 text-lg mb-6 animate-pulse">
              Timing contraction...
            </div>
          )}

          {/* Big Timer Button */}
          <button
            onClick={isTimingContraction ? stopContraction : startContraction}
            aria-label={isTimingContraction ? 'Stop timing contraction' : 'Start timing contraction'}
            className={`w-48 h-48 rounded-full text-white text-xl font-semibold shadow-soft hover:shadow-lg active:scale-95 transition-all duration-200 flex flex-col items-center justify-center mx-auto focus:outline-none focus:ring-4 focus:ring-offset-2 ${
              isTimingContraction
                ? 'bg-gradient-to-br from-coral-500 to-coral-600 focus:ring-coral-300'
                : 'bg-gradient-to-br from-teal-400 to-teal-500 focus:ring-teal-300'
            }`}
          >
            <span className="text-4xl mb-2" aria-hidden="true">
              {isTimingContraction ? '⏹️' : '▶️'}
            </span>
            <span>{isTimingContraction ? 'Stop' : 'Start'}</span>
          </button>
        </div>

        {/* Stats */}
        {contractions.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 shadow-card text-center">
              <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                {formatDuration(avgDuration)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Avg Duration</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-card text-center">
              <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                {avgInterval > 0 ? formatDuration(avgInterval) : '--:--'}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Avg Interval</div>
            </div>
          </div>
        )}

        {/* Contraction History */}
        {contractions.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                Contractions ({contractions.length})
              </h3>
              <button
                onClick={handleClearAll}
                className="text-sm text-red-500 hover:text-red-600"
              >
                Clear All
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-card overflow-hidden" role="table" aria-label="Contraction history">
              {/* Header */}
              <div className="grid grid-cols-3 gap-2 p-3 bg-gray-50 border-b border-gray-100 text-xs font-medium text-gray-600 dark:text-gray-300" role="row">
                <div role="columnheader">Time</div>
                <div role="columnheader">Duration</div>
                <div role="columnheader">Interval</div>
              </div>

              {/* Rows */}
              <div className="divide-y divide-gray-100 max-h-64 overflow-y-auto">
                {contractions.map((contraction) => (
                  <div
                    key={contraction.id}
                    className="grid grid-cols-3 gap-2 p-3 text-sm"
                    role="row"
                  >
                    <div className="text-gray-800 dark:text-gray-100" role="cell">{formatTime(contraction.startTime)}</div>
                    <div className={`font-medium ${
                      contraction.duration >= 60 ? 'text-coral-600' : 'text-gray-800'
                    }`} role="cell">
                      {formatDuration(contraction.duration)}
                    </div>
                    <div className={`${
                      contraction.interval && contraction.interval <= 300 ? 'text-coral-600 font-medium' : 'text-gray-600'
                    }`} role="cell">
                      {contraction.interval ? formatDuration(contraction.interval) : '—'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {contractions.length === 0 && (
          <div className="text-center text-gray-600 py-8">
            <div className="text-4xl mb-3" aria-hidden="true">⏱️</div>
            <p>Press Start when a contraction begins.</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Press Stop when it ends.</p>
          </div>
        )}
      </main>
    </div>
  )
}
