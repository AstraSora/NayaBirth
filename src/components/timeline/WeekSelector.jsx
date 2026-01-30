import { useRef, useEffect } from 'react'
import { getWeekDateRange } from '../../lib/dateUtils'
import { MAX_WEEKS } from '../../constants/pregnancy'

export function WeekSelector({ selectedWeek, currentWeek, onSelect, dueDate }) {
  const scrollRef = useRef(null)
  const weeks = Array.from({ length: MAX_WEEKS }, (_, i) => i + 1)

  useEffect(() => {
    if (scrollRef.current) {
      const selectedButton = scrollRef.current.querySelector(`[data-week="${selectedWeek}"]`)
      if (selectedButton) {
        selectedButton.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
      }
    }
  }, [selectedWeek])

  return (
    <div className="bg-surface border-b border-subtle pb-4 overflow-hidden">
      <div className="max-w-lg mx-auto px-4">
        <div className="text-center mb-3">
          <span className="text-3xl font-bold text-foreground">Week {selectedWeek}</span>
          {dueDate && (
            <p className="text-sm text-foreground-muted mt-1">{getWeekDateRange(selectedWeek, dueDate)}</p>
          )}
        </div>

        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto py-3 scrollbar-hide -mx-4 px-4"
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
                        ? 'bg-muted text-foreground-muted'
                        : 'bg-surface text-foreground-secondary hover:bg-muted'
                  }
                `}
                aria-label={`Week ${week}${isCurrent ? ' (current)' : ''}${isSelected ? ' (selected)' : ''}`}
              >
                {week}
              </button>
            )
          })}
        </div>

        <div className="flex justify-center gap-4 mt-3 text-xs text-foreground-muted">
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
