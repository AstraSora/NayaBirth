import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useOnboarding } from './context/OnboardingContext'
import { Hub } from './pages/Hub'
import { BirthPlan } from './pages/BirthPlan'
import { Review } from './pages/Review'
import { Retrieve } from './pages/Retrieve'
import { Assessment } from './pages/Assessment'
import { AssessmentResults } from './pages/AssessmentResults'
import { KickCounter } from './pages/KickCounter'
import { ContractionTimer } from './pages/ContractionTimer'
import { HospitalChecklist } from './pages/HospitalChecklist'
import { PregnancyTimeline } from './pages/PregnancyTimeline'
import { Resources } from './pages/Resources'
import { ResourceCategory } from './pages/ResourceCategory'
import { Settings } from './pages/Settings'
import { OnboardingFlow } from './pages/OnboardingFlow'

// Guard component to redirect first-time users to onboarding
function OnboardingGuard({ children }) {
  const { hasCompletedOnboarding, hasExistingData } = useOnboarding()
  const location = useLocation()

  // Allow access to retrieve page without onboarding (for returning users with PIN)
  const allowedPaths = ['/retrieve', '/onboarding']
  if (allowedPaths.some(path => location.pathname.startsWith(path))) {
    return children
  }

  // Redirect to onboarding if not completed and no existing data
  if (!hasCompletedOnboarding && !hasExistingData()) {
    return <Navigate to="/onboarding" replace />
  }

  return children
}

function App() {
  return (
    <OnboardingGuard>
      <Routes>
        {/* Onboarding */}
        <Route path="/onboarding" element={<OnboardingFlow />} />

        {/* Hub Landing */}
        <Route path="/" element={<Hub />} />

        {/* Birth Plan */}
        <Route path="/birth-plan" element={<BirthPlan />} />
        <Route path="/review" element={<Review />} />
        <Route path="/retrieve" element={<Retrieve />} />

        {/* EPDS Assessment */}
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/assessment/results" element={<AssessmentResults />} />

        {/* Tools */}
        <Route path="/kick-counter" element={<KickCounter />} />
        <Route path="/contraction-timer" element={<ContractionTimer />} />
        <Route path="/hospital-checklist" element={<HospitalChecklist />} />
        <Route path="/pregnancy-timeline" element={<PregnancyTimeline />} />

        {/* Resources */}
        <Route path="/resources" element={<Resources />} />
        <Route path="/resources/:category" element={<ResourceCategory />} />

        {/* Settings */}
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </OnboardingGuard>
  )
}

export default App
