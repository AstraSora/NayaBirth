import { useState, useEffect, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from '../components/layout/Header'
import { Card, CardContent } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import milestoneData from '../data/pregnancyMilestones.json'

const STORAGE_KEY = 'nayabirth-timeline'

function calculateCurrentWeek(dueDate) {
  const today = new Date()
  const due = new Date(dueDate)
  const lmp = new Date(due)
  lmp.setDate(lmp.getDate() - 280)

  const diffTime = today - lmp
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  const week = Math.floor(diffDays / 7) + 1

  return Math.max(1, Math.min(42, week))
}

function getWeekDateRange(week, dueDate) {
  const due = new Date(dueDate)
  const lmp = new Date(due)
  lmp.setDate(lmp.getDate() - 280)

  const weekStart = new Date(lmp)
  weekStart.setDate(weekStart.getDate() + (week - 1) * 7)

  const weekEnd = new Date(weekStart)
  weekEnd.setDate(weekEnd.getDate() + 6)

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short' })
  }

  return `${formatDate(weekStart)} - ${formatDate(weekEnd)}`
}

function DueDateModal({ onSave, onClose }) {
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
      <Card className="w-full max-w-sm animate-fade-in">
        <CardContent className="pt-6">
          <div className="text-center mb-6">
            <span className="text-4xl mb-3 block">📅</span>
            <h2 className="text-xl font-bold text-gray-800 mb-2">When is your due date?</h2>
            <p className="text-sm text-gray-600">
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
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-coral-300 focus:border-coral-400 mb-4"
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

function WeekSelector({ selectedWeek, currentWeek, onSelect, dueDate }) {
  const scrollRef = useRef(null)
  const weeks = Array.from({ length: 42 }, (_, i) => i + 1)

  useEffect(() => {
    if (scrollRef.current) {
      const selectedButton = scrollRef.current.querySelector(`[data-week="${selectedWeek}"]`)
      if (selectedButton) {
        selectedButton.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
      }
    }
  }, [selectedWeek])

  return (
    <div className="bg-white border-b border-gray-100 pb-4">
      <div className="max-w-lg mx-auto px-4">
        <div className="text-center mb-3">
          <span className="text-3xl font-bold text-gray-800">Week {selectedWeek}</span>
          {dueDate && (
            <p className="text-sm text-gray-500 mt-1">{getWeekDateRange(selectedWeek, dueDate)}</p>
          )}
        </div>

        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {weeks.map((week) => {
            const isSelected = week === selectedWeek
            const isCurrent = week === currentWeek
            const isPast = week < currentWeek

            return (
              <button
                key={week}
                data-week={week}
                onClick={() => onSelect(week)}
                className={`
                  flex-shrink-0 w-10 h-10 rounded-full font-medium text-sm
                  transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-coral-300
                  ${isSelected
                    ? 'bg-coral-500 text-white scale-110 shadow-md'
                    : isCurrent
                      ? 'bg-teal-500 text-white'
                      : isPast
                        ? 'bg-gray-100 text-gray-500'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }
                `}
                aria-label={`Week ${week}${isCurrent ? ' (current)' : ''}${isSelected ? ' (selected)' : ''}`}
              >
                {week}
              </button>
            )
          })}
        </div>

        <div className="flex justify-center gap-4 mt-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-teal-500"></span>
            Current week
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-coral-500"></span>
            Selected
          </span>
        </div>
      </div>
    </div>
  )
}

function BabyDevelopmentCard({ week }) {
  const development = milestoneData.babyDevelopment.find(d => d.week === week)

  if (!development) {
    const closest = milestoneData.babyDevelopment.reduce((prev, curr) => {
      return Math.abs(curr.week - week) < Math.abs(prev.week - week) ? curr : prev
    })
    return (
      <Card className="bg-gradient-to-br from-coral-50 to-coral-100">
        <CardContent className="pt-5">
          <div className="flex items-center gap-4">
            <div className="text-5xl">👶</div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Baby is the size of a {closest.size.toLowerCase()}</h3>
              <p className="text-sm text-gray-700">{closest.highlight}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gradient-to-br from-coral-50 to-coral-100">
      <CardContent className="pt-5">
        <div className="flex items-center gap-4">
          <div className="text-5xl">👶</div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Baby is the size of a {development.size.toLowerCase()}</h3>
            <p className="text-sm text-gray-700">{development.highlight}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function MilestoneCard({ milestone, currentWeek, isExpanded, onToggle }) {
  const { categories } = milestoneData
  const category = categories[milestone.category]

  const isPast = milestone.weekEnd < currentWeek && !milestone.ongoing
  const isCurrent = currentWeek >= milestone.week && currentWeek <= milestone.weekEnd
  const isOngoing = milestone.ongoing

  const colorStyles = {
    sky: 'border-sky-200 bg-sky-50',
    teal: 'border-teal-200 bg-teal-50',
    sage: 'border-sage-200 bg-sage-50',
    coral: 'border-coral-200 bg-coral-50'
  }

  const statusStyles = isPast
    ? 'border-teal-300 bg-teal-50/50'
    : isOngoing
      ? 'border-amber-300 bg-amber-50'
      : isCurrent
        ? 'border-2 border-coral-400 bg-white shadow-md'
        : colorStyles[category.color] || 'border-gray-200 bg-white'

  const weekLabel = milestone.week === milestone.weekEnd
    ? `Week ${milestone.week}`
    : `Weeks ${milestone.week}-${milestone.weekEnd}`

  return (
    <div className={`rounded-xl border-2 overflow-hidden transition-all duration-200 ${statusStyles}`}>
      <button
        onClick={() => onToggle(milestone.id)}
        className="w-full p-4 flex items-start gap-3 text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-coral-300"
        aria-expanded={isExpanded}
      >
        <span className="text-2xl flex-shrink-0" aria-hidden="true">{milestone.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              isPast ? 'bg-teal-200 text-teal-700' :
              isOngoing ? 'bg-amber-200 text-amber-700' :
              isCurrent ? 'bg-coral-200 text-coral-700' :
              'bg-gray-200 text-gray-600'
            }`}>
              {weekLabel}
            </span>
            {isPast && !isOngoing && <span className="text-teal-500 text-sm">✓</span>}
            {isOngoing && <span className="text-xs text-amber-600 font-medium">Ongoing</span>}
          </div>
          <h4 className="font-semibold text-gray-800">{milestone.title}</h4>
          <p className="text-sm text-gray-600">{milestone.shortDescription}</p>
        </div>
        <svg
          className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 mt-1 ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 pt-0 animate-fade-in">
          <div className="border-t border-gray-200 pt-3 ml-11">
            <p className="text-sm text-gray-700 leading-relaxed">{milestone.details}</p>
            <div className="mt-3 flex items-center gap-2">
              <span className={`text-xs px-2 py-1 rounded-full ${
                category.color === 'sky' ? 'bg-sky-100 text-sky-700' :
                category.color === 'teal' ? 'bg-teal-100 text-teal-700' :
                category.color === 'sage' ? 'bg-sage-100 text-sage-700' :
                'bg-coral-100 text-coral-700'
              }`}>
                {category.label}
              </span>
              {milestone.priority === 'optional' && (
                <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">Optional</span>
              )}
              {milestone.priority === 'essential' && (
                <span className="text-xs px-2 py-1 rounded-full bg-coral-100 text-coral-600">Essential</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function MilestoneTimeline({ milestones, currentWeek, expandedId, onToggle }) {
  return (
    <div className="relative">
      {/* Vertical timeline line */}
      <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-coral-300" aria-hidden="true" />

      <div className="space-y-4 relative">
        {milestones.map((milestone) => (
          <div key={milestone.id} className="relative pl-10">
            {/* Timeline dot */}
            <div
              className={`absolute left-4 top-5 w-4 h-4 rounded-full border-2 border-white shadow-sm ${
                milestone.weekEnd < currentWeek && !milestone.ongoing
                  ? 'bg-teal-500'
                  : milestone.ongoing
                    ? 'bg-amber-400'
                    : currentWeek >= milestone.week && currentWeek <= milestone.weekEnd
                      ? 'bg-coral-500'
                      : 'bg-gray-300'
              }`}
              aria-hidden="true"
            />
            <MilestoneCard
              milestone={milestone}
              currentWeek={currentWeek}
              isExpanded={expandedId === milestone.id}
              onToggle={onToggle}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export function PregnancyTimeline() {
  const navigate = useNavigate()
  const [dueDate, setDueDate] = useState(null)
  const [selectedWeek, setSelectedWeek] = useState(20)
  const [expandedId, setExpandedId] = useState(null)
  const [showDueDateModal, setShowDueDateModal] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const data = JSON.parse(stored)
        if (data.dueDate) {
          setDueDate(data.dueDate)
          const current = calculateCurrentWeek(data.dueDate)
          setSelectedWeek(current)
        }
      } catch (e) {
        console.error('Failed to parse stored data:', e)
      }
    } else {
      setShowDueDateModal(true)
    }
  }, [])

  const handleSaveDueDate = (newDueDate) => {
    setDueDate(newDueDate)
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ dueDate: newDueDate }))
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
    <div className="min-h-screen bg-gradient-to-b from-coral-50 to-white flex flex-col">
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
                      <p className="text-sm text-gray-500">Due date</p>
                      <p className="font-semibold text-gray-800">
                        {new Date(dueDate).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
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
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
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
                <p className="text-gray-600">No specific milestones for this week.</p>
                <p className="text-sm text-gray-500 mt-1">Keep taking your prenatal vitamins!</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Trimester Info */}
        <Card className="mb-8">
          <CardContent className="pt-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">You're in your</p>
                <p className="font-semibold text-gray-800 text-lg">
                  {selectedWeek <= 13 ? 'First' : selectedWeek <= 26 ? 'Second' : 'Third'} Trimester
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">
                  {selectedWeek <= 13 ? 'Weeks 1-13' : selectedWeek <= 26 ? 'Weeks 14-26' : 'Weeks 27-40'}
                </p>
                <p className="text-xs text-gray-400">
                  {40 - selectedWeek} weeks to go
                </p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4">
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-coral-400 to-coral-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (selectedWeek / 40) * 100)}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1 text-center">
                {Math.round((selectedWeek / 40) * 100)}% of pregnancy complete
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <p className="text-xs text-gray-500 text-center mb-8">
          This timeline is for informational purposes only. Always consult your healthcare provider for personalized advice.
        </p>
      </main>
    </div>
  )
}
