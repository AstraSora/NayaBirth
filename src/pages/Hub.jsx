import { Link } from 'react-router-dom'
import { ToolCard } from '../components/hub/ToolCard'
import { ResourceCard } from '../components/hub/ResourceCard'
import UCIHealthLogo from '../assets/uci-health-logo.svg'

export function Hub() {
  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 safe-area-top">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl" aria-hidden="true">🌸</span>
              <div>
                <h1 className="font-bold text-gray-800 text-lg leading-tight">UCI Pregnancy Hub</h1>
                <p className="text-xs text-gray-600">Your pregnancy resource center</p>
              </div>
            </div>
            <img
              src={UCIHealthLogo}
              alt="UCI Health"
              className="h-6"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-lg mx-auto px-4 py-6 pb-12">
        {/* Welcome Message */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome to your pregnancy journey
          </h2>
          <p className="text-gray-700">
            Tools and resources to support you through pregnancy, birth, and beyond.
          </p>
        </div>

        {/* Tools Section */}
        <section className="mb-8" aria-labelledby="tools-heading">
          <h3 id="tools-heading" className="text-lg font-semibold text-gray-800 mb-4">
            Tools
          </h3>
          <div className="space-y-3">
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
          </div>
        </section>

        {/* Resources Section */}
        <section className="mb-8" aria-labelledby="resources-heading">
          <div className="flex items-center justify-between mb-4">
            <h3 id="resources-heading" className="text-lg font-semibold text-gray-800">
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
          <div className="grid grid-cols-3 gap-3">
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
          <h3 id="quicklinks-heading" className="text-lg font-semibold text-gray-800 mb-4">
            Quick Links
          </h3>
          <div className="bg-white rounded-2xl shadow-card divide-y divide-gray-100">
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
            <QuickLink
              href="tel:911"
              icon="🚨"
              title="Emergency"
              subtitle="Call 911 for emergencies"
              emergency
            />
          </div>
        </section>

        {/* Saved Plans Link */}
        <section className="mb-8">
          <Link
            to="/retrieve"
            className="block bg-white rounded-2xl shadow-card p-4 hover:shadow-soft transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-coral-300 focus:ring-offset-2"
            aria-label="Retrieve a saved birth plan using your PIN"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-coral-100 flex items-center justify-center text-2xl" aria-hidden="true">
                💾
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">Have a saved birth plan?</h4>
                <p className="text-sm text-gray-600">Enter your PIN to continue</p>
              </div>
              <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="max-w-lg mx-auto px-4 pb-8 text-center text-sm text-gray-600 safe-area-bottom">
        <p className="mb-2">
          For informational purposes only. Always consult your healthcare provider.
        </p>
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} UCI Health • NayaBirth
        </p>
      </footer>
    </div>
  )
}

function QuickLink({ href, icon, title, subtitle, external, emergency }) {
  const baseClasses = "block min-h-[56px] hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-coral-300"

  const content = (
    <div className="flex items-center gap-4 p-4">
      <div className={`w-11 h-11 rounded-full flex items-center justify-center text-xl flex-shrink-0 ${emergency ? 'bg-red-100' : 'bg-gray-100'}`} aria-hidden="true">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className={`font-medium ${emergency ? 'text-red-700' : 'text-gray-800'}`}>{title}</h4>
        <p className="text-sm text-gray-600 truncate">{subtitle}</p>
      </div>
      <svg className="w-5 h-5 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
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
