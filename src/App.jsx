import { Routes, Route } from 'react-router-dom'
import { Welcome } from './pages/Welcome'
import { BirthPlan } from './pages/BirthPlan'
import { Review } from './pages/Review'
import { Retrieve } from './pages/Retrieve'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/birth-plan" element={<BirthPlan />} />
      <Route path="/review" element={<Review />} />
      <Route path="/retrieve" element={<Retrieve />} />
    </Routes>
  )
}

export default App
