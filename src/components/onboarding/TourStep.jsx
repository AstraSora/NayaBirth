import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOnboarding } from '../../context/OnboardingContext'
import { Button } from '../ui/Button'

const TOUR_CARDS = [
  {
    id: 1,
    icon: '📝',
    title: 'Build Your Birth Plan',
    description: 'Create and share your birth preferences with your care team. Answer simple questions to document your wishes for labor, delivery, and postpartum care.',
  },
  {
    id: 2,
    icon: '📅',
    title: 'Track Your Journey',
    description: 'Follow your week-by-week timeline with personalized milestones, upcoming appointments, and important tests to remember.',
  },
  {
    id: 3,
    icon: '📚',
    title: 'Access Resources',
    description: 'Evidence-based information from UCI Health covering pregnancy, labor, postpartum recovery, mental health, and feeding.',
  },
]

export function TourStep() {
  const { prevStep, completeOnboarding } = useOnboarding()
  const navigate = useNavigate()
  const [currentCard, setCurrentCard] = useState(0)
  const scrollContainerRef = useRef(null)

  const handleFinish = () => {
    completeOnboarding()
    navigate('/')
  }

  const handleSkip = () => {
    completeOnboarding()
    navigate('/')
  }

  const handleDotClick = (index) => {
    setCurrentCard(index)
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.offsetWidth
      scrollContainerRef.current.scrollTo({
        left: cardWidth * index,
        behavior: 'smooth'
      })
    }
  }

  // Update current card on scroll
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const cardWidth = container.offsetWidth
      const scrollLeft = container.scrollLeft
      const newIndex = Math.round(scrollLeft / cardWidth)
      if (newIndex !== currentCard && newIndex >= 0 && newIndex < TOUR_CARDS.length) {
        setCurrentCard(newIndex)
      }
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [currentCard])

  const isLastCard = currentCard === TOUR_CARDS.length - 1

  return (
    <div className="min-h-screen bg-gradient-warm flex flex-col">
      <main className="flex-1 flex flex-col px-6 py-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Quick Tour
          </h1>
          <p className="text-foreground-secondary">
            Here's what you can do with NayaBirth
          </p>
        </div>

        {/* Scrollable Cards */}
        <div
          ref={scrollContainerRef}
          className="flex-1 flex overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-6 px-6"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {TOUR_CARDS.map((card, index) => (
            <div
              key={card.id}
              className="flex-shrink-0 w-full snap-center px-2"
            >
              <div className="bg-surface rounded-2xl p-8 shadow-soft h-full flex flex-col items-center justify-center text-center">
                <span className="text-6xl mb-6">{card.icon}</span>
                <h2 className="text-xl font-bold text-foreground mb-4">
                  {card.title}
                </h2>
                <p className="text-foreground-secondary leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 my-6">
          {TOUR_CARDS.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                currentCard === index
                  ? 'bg-coral-400 w-6'
                  : 'bg-foreground-muted/30 hover:bg-foreground-muted/50'
              }`}
              aria-label={`Go to card ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="space-y-3">
          {isLastCard ? (
            <Button
              onClick={handleFinish}
              size="lg"
              className="w-full"
            >
              Get Started
            </Button>
          ) : (
            <Button
              onClick={() => handleDotClick(currentCard + 1)}
              size="lg"
              className="w-full"
            >
              Next
            </Button>
          )}

          <div className="flex justify-between items-center">
            <button
              onClick={prevStep}
              className="text-foreground-secondary hover:text-foreground transition-colors px-4 py-2"
            >
              ← Back
            </button>
            <button
              onClick={handleSkip}
              className="text-foreground-muted hover:text-foreground-secondary transition-colors text-sm px-4 py-2"
            >
              Skip tour
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
