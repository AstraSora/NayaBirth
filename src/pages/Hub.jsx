import { Link } from 'react-router-dom'
import { ToolCard } from '../components/hub/ToolCard'
import { ResourceCard } from '../components/hub/ResourceCard'

export function Hub() {
  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 safe-area-top">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🌸</span>
              <div>
                <h1 className="font-bold text-gray-800 text-lg leading-tight">UCI Pregnancy Hub</h1>
                <p className="text-xs text-gray-500">Your pregnancy resource center</p>
              </div>
            </div>
            <img
              src="/uci-health-logo.png"
              alt="UCI Health"
              className="h-8 opacity-80"
              onError={(e) => e.target.style.display = 'none'}
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
          <p className="text-gray-600">
            Tools and resources to support you through pregnancy, birth, and beyond.
          </p>
        </div>

        {/* Tools Section */}
        <section className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span>🛠️</span> Tools
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
          </div>
        </section>

        {/* Resources Section */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <span>📚</span> Resources
            </h3>
            <Link to="/resources" className="text-sm text-coral-500 font-medium hover:text-coral-600">
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
        <section className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span>⚡</span> Quick Links
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
            className="block bg-white rounded-2xl shadow-card p-4 hover:shadow-soft transition-all duration-200"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-coral-100 flex items-center justify-center text-2xl">
                💾
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">Have a saved birth plan?</h4>
                <p className="text-sm text-gray-500">Enter your PIN to continue</p>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="max-w-lg mx-auto px-4 pb-8 text-center text-sm text-gray-500 safe-area-bottom">
        <p className="mb-2">
          For informational purposes only. Always consult your healthcare provider.
        </p>
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} UCI Health • NayaBirth
        </p>
      </footer>
    </div>
  )
}

function QuickLink({ href, icon, title, subtitle, external, emergency }) {
  const content = (
    <div className="flex items-center gap-4 p-4">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${emergency ? 'bg-red-100' : 'bg-gray-100'}`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className={`font-medium ${emergency ? 'text-red-700' : 'text-gray-800'}`}>{title}</h4>
        <p className="text-sm text-gray-500 truncate">{subtitle}</p>
      </div>
      <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
      <a href={href} target="_blank" rel="noopener noreferrer" className="block hover:bg-gray-50 transition-colors">
        {content}
      </a>
    )
  }

  return (
    <a href={href} className="block hover:bg-gray-50 transition-colors">
      {content}
    </a>
  )
}
