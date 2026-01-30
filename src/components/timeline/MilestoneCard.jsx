import { parseMarkdown } from '../../utils/parseMarkdown'
import milestoneData from '../../data/pregnancyMilestones.json'

export function MilestoneCard({ milestone, currentWeek, isExpanded, onToggle }) {
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
        ? 'border-2 border-coral-400 bg-surface shadow-md'
        : colorStyles[category.color] || 'border bg-surface'

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
          <h4 className="font-semibold text-foreground">{milestone.title}</h4>
          <p className="text-sm text-foreground-secondary">{milestone.shortDescription}</p>
        </div>
        <svg
          className={`w-5 h-5 text-foreground-muted flex-shrink-0 transition-transform duration-200 mt-1 ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 pt-0 animate-fade-in">
          <div className="border-t border pt-3 ml-11">
            <p
              className="text-sm text-foreground-secondary leading-relaxed"
              dangerouslySetInnerHTML={{ __html: parseMarkdown(milestone.details) }}
            />
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
                <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-foreground-secondary">Optional</span>
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
