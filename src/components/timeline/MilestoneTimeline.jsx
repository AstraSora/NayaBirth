import { MilestoneCard } from './MilestoneCard'

export function MilestoneTimeline({ milestones, currentWeek, expandedId, onToggle }) {
  return (
    <div className="relative">
      {/* Vertical timeline line */}
      <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-coral-300" aria-hidden="true" />

      <div className="space-y-4 relative">
        {milestones.map((milestone) => (
          <div key={milestone.id} className="relative pl-10">
            {/* Timeline dot */}
            <div
              className={`absolute left-4 top-5 w-4 h-4 rounded-full border-2 border-surface shadow-sm ${
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
