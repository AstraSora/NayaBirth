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
    <div className="sticky bottom-0 bg-white/80 backdrop-blur-md border-t border-gray-100 safe-area-bottom">
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
    <div className="overflow-x-auto hide-scrollbar">
      <div className="flex gap-2 px-4 py-3 min-w-max">
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => onSectionClick(index)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap
              transition-all duration-200
              ${index === currentSection
                ? 'bg-coral-400 text-white'
                : index < currentSection
                  ? 'bg-coral-100 text-coral-600'
                  : 'bg-gray-100 text-gray-500'
              }
            `}
          >
            {section.title}
          </button>
        ))}
      </div>
    </div>
  )
}
