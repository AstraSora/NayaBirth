import { Routes, Route } from 'react-router-dom'
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

function App() {
  return (
    <Routes>
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
    </Routes>
  )
}

export default App
