import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ToolCard } from '../components/hub/ToolCard'
import { ResourceCard } from '../components/hub/ResourceCard'
import { useOnboarding } from '../context/OnboardingContext'
import UCIHealthLogo from '../assets/uci-health-logo.svg'

export function Hub() {
  const [showAllTools, setShowAllTools] = useState(false)
  const { profile, getCurrentWeek, getEffectiveTrimester } = useOnboarding()

  // Generate personalized welcome message
  const welcomeMessage = useMemo(() => {
    const currentWeek = getCurrentWeek()
    const trimester = getEffectiveTrimester()

    if (profile.stage === 'postpartum') {
      return {
        title: 'Welcome back!',
        subtitle: 'How are you feeling today?'
      }
    }

    if (profile.stage === 'planning') {
      return {
        title: 'Welcome to your pregnancy journey',
        subtitle: 'Tools and resources to help you prepare.'
      }
    }

    if (currentWeek) {
      return {
        title: `Welcome back!`,
        subtitle: `You're in week ${currentWeek} of your pregnancy.`
      }
    }

    if (trimester) {
      const trimesterNames = ['', 'first', 'second', 'third']
      return {
        title: 'Welcome back!',
        subtitle: `You're in your ${trimesterNames[trimester]} trimester.`
      }
    }

    return {
      title: 'Welcome to your pregnancy journey',
      subtitle: 'Tools and resources to support you through pregnancy, birth, and beyond.'
    }
  }, [profile.stage, getCurrentWeek, getEffectiveTrimester])

  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Header */}
      <header className="bg-surface/80 backdrop-blur-md border-b border-subtle safe-area-top">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl" aria-hidden="true">🌸</span>
              <div>
                <h1 className="font-bold text-foreground text-lg leading-tight">UCI Pregnancy Hub</h1>
                <p className="text-xs text-foreground-muted">Your pregnancy resource center</p>
              </div>
            </div>
            <Link
              to="/settings"
              className="w-11 h-11 flex items-center justify-center text-foreground-secondary hover:text-foreground hover:bg-muted rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-coral-300"
              aria-label="Settings"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-lg mx-auto px-4 py-6 pb-12">
        {/* Welcome Message */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {welcomeMessage.title}
          </h2>
          <p className="text-foreground-secondary">
            {welcomeMessage.subtitle}
          </p>
        </div>

        {/* Saved Plans Link - for returning users */}
        <section className="mb-8">
          <Link
            to="/retrieve"
            className="block bg-surface rounded-2xl shadow-card p-4 hover:shadow-soft transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-coral-300 focus:ring-offset-2"
            aria-label="Retrieve a saved birth plan using your PIN"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-coral-100 flex items-center justify-center text-2xl" aria-hidden="true">
                💾
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground">Have a saved birth plan?</h4>
                <p className="text-sm text-foreground-muted">Enter your PIN to continue</p>
              </div>
              <svg className="w-5 h-5 text-foreground-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </section>

        {/* Tools Section */}
        <section className="mb-8" aria-labelledby="tools-heading">
          <h3 id="tools-heading" className="text-lg font-semibold text-foreground mb-4">
            Tools
          </h3>
          <div className="space-y-3">
            {/* Featured tools - always visible */}
            <ToolCard
              to="/pregnancy-timeline"
              icon="📅"
              title="Pregnancy Timeline"
              description="Track milestones, tests, and baby development week by week"
              color="coral"
            />
            <ToolCard
              to="/birth-plan"
              icon="📝"
              title="Birth Plan Builder"
              description="Create your personalized birth plan to share with your care team"
              color="coral"
            />
            <ToolCard
              to="/assessment"
              icon="💭"
              title="Postpartum Self-Assessment"
              description="Quick screening to check in on your emotional wellbeing"
              color="teal"
            />

            {/* Conditional tools - shown when expanded */}
            {showAllTools && (
              <>
                <ToolCard
                  to="/kick-counter"
                  icon="👶"
                  title="Kick Counter"
                  description="Track your baby's movements throughout the day"
                  color="sky"
                />
                <ToolCard
                  to="/contraction-timer"
                  icon="⏱️"
                  title="Contraction Timer"
                  description="Time and track your contractions during labor"
                  color="sage"
                />
                <ToolCard
                  to="/hospital-checklist"
                  icon="🎒"
                  title="Hospital Bag Checklist"
                  description="Track what to pack for your hospital stay"
                  color="teal"
                />
              </>
            )}
          </div>

          {/* Show more/less button */}
          <button
            onClick={() => setShowAllTools(!showAllTools)}
            className="w-full mt-3 py-2.5 text-sm font-medium text-coral-600 hover:text-coral-700 hover:bg-coral-50 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-coral-300"
            aria-expanded={showAllTools}
            aria-controls="tools-section"
          >
            {showAllTools ? 'Show less' : 'Show all tools'}
          </button>
        </section>

        {/* Resources Section */}
        <section className="mb-8" aria-labelledby="resources-heading">
          <div className="flex items-center justify-between mb-4">
            <h3 id="resources-heading" className="text-lg font-semibold text-foreground">
              Resources
            </h3>
            <Link
              to="/resources"
              className="text-sm text-coral-600 font-medium hover:text-coral-700 focus:outline-none focus:ring-2 focus:ring-coral-300 rounded px-2 py-1"
              aria-label="View all resources"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <ResourceCard
              to="/resources/pregnancy"
              icon="🤰"
              title="Pregnancy"
              color="coral"
            />
            <ResourceCard
              to="/resources/labor-delivery"
              icon="👶"
              title="Labor & Delivery"
              color="sky"
            />
            <ResourceCard
              to="/resources/postpartum"
              icon="💝"
              title="Postpartum"
              color="teal"
            />
            <ResourceCard
              to="/resources/mental-health"
              icon="🧠"
              title="Mental Health"
              color="sage"
            />
            <ResourceCard
              to="/resources/breastfeeding"
              icon="🍼"
              title="Feeding"
              color="sky"
            />
            <ResourceCard
              to="/resources"
              icon="📖"
              title="All Topics"
              color="coral"
            />
          </div>
        </section>

        {/* Quick Links Section */}
        <section className="mb-8" aria-labelledby="quicklinks-heading">
          <h3 id="quicklinks-heading" className="text-lg font-semibold text-foreground mb-4">
            Quick Links
          </h3>
          <div className="bg-surface rounded-2xl shadow-card divide-y divide-subtle overflow-hidden">
            {/* Emergency link at top with prominent styling */}
            <QuickLink
              href="tel:911"
              icon="🚨"
              title="Emergency"
              subtitle="Call 911 for emergencies"
              emergency
            />
            <QuickLink
              href="tel:+19498248200"
              icon="📞"
              title="UCI Labor & Delivery"
              subtitle="(949) 824-8200"
            />
            <QuickLink
              href="https://www.ucihealth.org/medical-services/womens-health"
              icon="🏥"
              title="UCI Women's Health"
              subtitle="Schedule appointments"
              external
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="max-w-lg mx-auto px-4 pb-8 text-center text-sm text-foreground-muted safe-area-bottom">
        <div className="flex justify-center mb-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-surface/70 rounded-full shadow-sm">
            <span className="text-xs text-foreground-muted">In partnership with</span>
            <img
              src={UCIHealthLogo}
              alt="UCI Health"
              className="h-4"
            />
          </div>
        </div>
        <p className="mb-2">
          For informational purposes only. Always consult your healthcare provider.
        </p>
        <p className="text-xs text-foreground-muted">
          © {new Date().getFullYear()} UCI Health • NayaBirth
        </p>
      </footer>
    </div>
  )
}

function QuickLink({ href, icon, title, subtitle, external, emergency }) {
  const baseClasses = `block min-h-[56px] hover:bg-surface-hover transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-coral-300 ${emergency ? 'border-l-4 border-red-500 bg-red-50/50' : ''}`

  const content = (
    <div className="flex items-center gap-4 p-4">
      <div className={`${emergency ? 'w-12 h-12 text-2xl' : 'w-11 h-11 text-xl'} rounded-full flex items-center justify-center flex-shrink-0 ${emergency ? 'bg-red-100' : 'bg-muted'}`} aria-hidden="true">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className={`${emergency ? 'font-semibold text-red-700' : 'font-medium text-foreground'}`}>{title}</h4>
        <p className={`text-sm truncate ${emergency ? 'text-red-600' : 'text-foreground-muted'}`}>{subtitle}</p>
      </div>
      <svg className={`w-5 h-5 flex-shrink-0 ${emergency ? 'text-red-500' : 'text-foreground-muted'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        {external ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        )}
      </svg>
    </div>
  )

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClasses}
        aria-label={`${title} - ${subtitle} (opens in new tab)`}
      >
        {content}
      </a>
    )
  }

  return (
    <a
      href={href}
      className={baseClasses}
      aria-label={`${title} - ${subtitle}`}
    >
      {content}
    </a>
  )
}
