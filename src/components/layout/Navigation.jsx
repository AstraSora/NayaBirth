import { Button } from '../ui/Button'

export function WizardNavigation({
  onBack,
  onNext,
  showBack = true,
  nextLabel = 'Continue',
  isLastSection = false,
  disabled = false,
}) {
  return (
    <div className="sticky bottom-0 bg-white/80 backdrop-blur-md border-t border-gray-100 safe-area-bottom dark:bg-gray-900/80 dark:border-gray-800">
      <div className="max-w-lg mx-auto px-4 py-4 flex gap-3">
        {showBack && (
          <Button
            variant="secondary"
            onClick={onBack}
            className="flex-1"
          >
            Back
          </Button>
        )}
        <Button
          variant="primary"
          onClick={onNext}
          disabled={disabled}
          className={showBack ? 'flex-1' : 'w-full'}
        >
          {isLastSection ? 'Review My Plan' : nextLabel}
        </Button>
      </div>
    </div>
  )
}

export function SectionTabs({ sections, currentSection, onSectionClick }) {
  return (
    <nav aria-label="Birth plan sections" className="overflow-x-auto hide-scrollbar">
      <div className="flex gap-2 px-4 py-3 min-w-max" role="tablist">
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => onSectionClick(index)}
            role="tab"
            aria-selected={index === currentSection}
            aria-label={`${section.title} section${index < currentSection ? ' (completed)' : ''}`}
            className={`
              px-4 py-2.5 min-h-[44px] rounded-full text-sm font-medium whitespace-nowrap
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-coral-400 focus:ring-offset-2
              ${index === currentSection
                ? 'bg-coral-400 text-white'
                : index < currentSection
                  ? 'bg-coral-100 text-coral-700 dark:bg-coral-900/40 dark:text-coral-300'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
              }
            `}
          >
            {section.title}
          </button>
        ))}
      </div>
    </nav>
  )
}
