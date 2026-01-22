import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBirthPlan } from '../context/BirthPlanContext'
import { Header } from '../components/layout/Header'
import { Button } from '../components/ui/Button'
import { Card, CardContent } from '../components/ui/Card'
import { loadBirthPlan } from '../lib/firebase'

export function Retrieve() {
  const navigate = useNavigate()
  const { loadPlan, setLoading } = useBirthPlan()
  const [pin, setPinInput] = useState('')
  const [loading, setLocalLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!pin.trim() || pin.length !== 6) {
      setError('Please enter a valid 6-character PIN')
      return
    }

    setLocalLoading(true)
    setError(null)

    try {
      const result = await loadBirthPlan(pin.toUpperCase())

      if (result.success) {
        loadPlan(result.data)
        navigate('/review')
      } else {
        setError(result.error || 'Plan not found. Please check your PIN.')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error(err)
    } finally {
      setLocalLoading(false)
    }
  }

  const handlePinChange = (e) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6)
    setPinInput(value)
    if (error) setError(null)
  }

  return (
    <div className="min-h-screen bg-gradient-warm">
      <Header showBack onBack={() => navigate('/')} />

      <main className="max-w-lg mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🔑</div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Continue Your Plan
          </h1>
          <p className="text-foreground-muted">
            Enter the 6-character PIN you received when you saved your birth plan
          </p>
        </div>

        <Card color="white">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit}>
              <label className="block mb-4">
                <span className="text-sm font-medium text-foreground-secondary mb-2 block">
                  Your PIN
                </span>
                <input
                  type="text"
                  value={pin}
                  onChange={handlePinChange}
                  placeholder="ABC123"
                  className="input-field text-center text-2xl font-mono tracking-widest"
                  maxLength={6}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="characters"
                />
              </label>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                loading={loading}
                disabled={pin.length !== 6}
                className="w-full"
              >
                Load My Plan
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-foreground-muted mb-4">
            Don't have a PIN yet?
          </p>
          <Button
            variant="ghost"
            onClick={() => navigate('/birth-plan')}
          >
            Start a New Birth Plan
          </Button>
        </div>
      </main>
    </div>
  )
}
