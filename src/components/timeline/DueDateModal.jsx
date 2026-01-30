import { useState } from 'react'
import { Card, CardContent } from '../ui/Card'
import { Button } from '../ui/Button'

export function DueDateModal({ onSave, onClose }) {
  const [dueDate, setDueDate] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (dueDate) {
      onSave(dueDate)
    }
  }

  const today = new Date().toISOString().split('T')[0]
  const maxDate = new Date()
  maxDate.setMonth(maxDate.getMonth() + 10)

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-sm animate-fade-in overflow-hidden">
        <CardContent className="pt-6">
          <div className="text-center mb-6">
            <span className="text-4xl mb-3 block">📅</span>
            <h2 className="text-xl font-bold text-foreground mb-2">When is your due date?</h2>
            <p className="text-sm text-foreground-secondary">
              We'll calculate your current week and show relevant milestones.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              min={today}
              max={maxDate.toISOString().split('T')[0]}
              className="w-full max-w-full px-4 py-3 border border-strong bg-surface text-foreground rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-coral-300 focus:border-coral-400 mb-4 box-border"
              style={{ WebkitAppearance: 'none' }}
              required
            />

            <Button type="submit" className="w-full" disabled={!dueDate}>
              Set Due Date
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
