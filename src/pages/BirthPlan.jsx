import { useNavigate } from 'react-router-dom'
import { useBirthPlan } from '../context/BirthPlanContext'
import { Header } from '../components/layout/Header'
import { WizardNavigation, SectionTabs } from '../components/layout/Navigation'
import { ProgressBar } from '../components/ui/ProgressBar'
import { QuestionRenderer } from '../components/sections/QuestionRenderer'
import questionsData from '../data/questions.json'

export function BirthPlan() {
  const navigate = useNavigate()
  const {
    currentSection,
    setCurrentSection,
    nextSection,
    prevSection,
    responses,
  } = useBirthPlan()

  const sections = questionsData.sections
  const section = sections[currentSection]

  const handleBack = () => {
    if (currentSection === 0) {
      navigate('/')
    } else {
      prevSection()
    }
  }

  const handleNext = () => {
    if (currentSection === sections.length - 1) {
      navigate('/review')
    } else {
      nextSection()
    }
  }

  const handleSectionClick = (index) => {
    setCurrentSection(index)
  }

  return (
    <div className="min-h-screen bg-gradient-sky flex flex-col">
      <Header
        showBack
        onBack={handleBack}
        title={section.title}
        showHome
      />

      {/* Progress */}
      <div className="bg-white border-b border-gray-100 dark:bg-gray-900 dark:border-gray-800">
        <div className="max-w-lg mx-auto px-4 py-3">
          <ProgressBar current={currentSection} total={sections.length} />
        </div>
      </div>

      {/* Section tabs */}
      <div className="bg-white border-b border-gray-100 dark:bg-gray-900 dark:border-gray-800">
        <div className="max-w-lg mx-auto">
          <SectionTabs
            sections={sections}
            currentSection={currentSection}
            onSectionClick={handleSectionClick}
          />
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-lg mx-auto px-4 py-6">
          {/* Section header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2 dark:text-gray-100">
              {section.title}
            </h2>
            {section.subtitle && (
              <p className="text-gray-600 dark:text-gray-400">{section.subtitle}</p>
            )}
          </div>

          {/* Questions */}
          <div className="space-y-6">
            {section.questions.map((question) => (
              <QuestionRenderer
                key={question.id}
                question={question}
                sectionId={section.id}
                value={responses[section.id]?.[question.id]}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Navigation */}
      <WizardNavigation
        showBack={true}
        onBack={handleBack}
        onNext={handleNext}
        isLastSection={currentSection === sections.length - 1}
      />
    </div>
  )
}
