import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from '../components/layout/Header'
import { Card, CardContent } from '../components/ui/Card'
import { calculateCurrentWeek, formatDateLong } from '../lib/dateUtils'
import { loadTimelineData, saveTimelineData } from '../lib/storage'
import milestoneData from '../data/pregnancyMilestones.json'

import {
  DueDateModal,
  WeekSelector,
  BabyDevelopmentCard,
  MilestoneTimeline,
  TrimesterProgress
} from '../components/timeline'

export function PregnancyTimeline() {
  const navigate = useNavigate()
  const [dueDate, setDueDate] = useState(null)
  const [selectedWeek, setSelectedWeek] = useState(20)
  const [expandedId, setExpandedId] = useState(null)
  const [showDueDateModal, setShowDueDateModal] = useState(false)

  useEffect(() => {
    const stored = loadTimelineData()
    if (stored?.dueDate) {
      setDueDate(stored.dueDate)
      const current = calculateCurrentWeek(stored.dueDate)
      setSelectedWeek(current)
    } else {
      setShowDueDateModal(true)
    }
  }, [])

  const handleSaveDueDate = (newDueDate) => {
    setDueDate(newDueDate)
    saveTimelineData({ dueDate: newDueDate })
    const current = calculateCurrentWeek(newDueDate)
    setSelectedWeek(current)
    setShowDueDateModal(false)
  }

  const currentWeek = dueDate ? calculateCurrentWeek(dueDate) : 20

  const relevantMilestones = useMemo(() => {
    return milestoneData.milestones
      .filter(m => {
        // Show if milestone overlaps with selected week
        const overlaps = selectedWeek >= m.week && selectedWeek <= m.weekEnd
        // Show if it's within 2 weeks before or after selected week
        const nearby = m.week <= selectedWeek + 2 && m.weekEnd >= selectedWeek - 2
        // Show ongoing milestones
        const ongoing = m.ongoing
        return overlaps || nearby || ongoing
      })
      .sort((a, b) => {
        // Sort by start week, then by priority
        if (a.week !== b.week) return a.week - b.week
        const priorityOrder = { essential: 0, recommended: 1, optional: 2, conditional: 3 }
        return (priorityOrder[a.priority] || 2) - (priorityOrder[b.priority] || 2)
      })
  }, [selectedWeek])

  const handleToggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-gradient-warm flex flex-col">
      <Header
        showBack
        onBack={() => navigate('/')}
        showHome
        title="Pregnancy Timeline"
      />

      {showDueDateModal && (
        <DueDateModal
          onSave={handleSaveDueDate}
          onClose={() => setShowDueDateModal(false)}
        />
      )}

      <WeekSelector
        selectedWeek={selectedWeek}
        currentWeek={currentWeek}
        onSelect={setSelectedWeek}
        dueDate={dueDate}
      />

      <main className="flex-1 max-w-lg mx-auto px-4 py-6 w-full">
        {/* Baby Development Card */}
        <div className="mb-6">
          <BabyDevelopmentCard week={selectedWeek} />
        </div>

        {/* Due Date Info */}
        {dueDate && (
          <button
            onClick={() => setShowDueDateModal(true)}
            className="w-full mb-6 text-left"
          >
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🎯</span>
                    <div>
                      <p className="text-sm text-foreground-muted">Due date</p>
                      <p className="font-semibold text-foreground">
                        {formatDateLong(dueDate)}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm text-coral-600">Change</span>
                </div>
              </CardContent>
            </Card>
          </button>
        )}

        {/* Milestones Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            {selectedWeek === currentWeek ? "What's happening now" : `Week ${selectedWeek} milestones`}
          </h2>

          {relevantMilestones.length > 0 ? (
            <MilestoneTimeline
              milestones={relevantMilestones}
              currentWeek={currentWeek}
              expandedId={expandedId}
              onToggle={handleToggleExpand}
            />
          ) : (
            <Card>
              <CardContent className="pt-5 text-center">
                <span className="text-4xl mb-2 block">📋</span>
                <p className="text-foreground-secondary">No specific milestones for this week.</p>
                <p className="text-sm text-foreground-muted mt-1">Keep taking your prenatal vitamins!</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Trimester Progress */}
        <TrimesterProgress selectedWeek={selectedWeek} />

        {/* Disclaimer */}
        <p className="text-xs text-foreground-muted text-center mb-8">
          This timeline is for informational purposes only. Always consult your healthcare provider for personalized advice.
        </p>
      </main>
    </div>
  )
}
