import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { BirthPlanProvider } from './context/BirthPlanContext'
import { AssessmentProvider } from './context/AssessmentContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <BirthPlanProvider>
        <AssessmentProvider>
          <App />
        </AssessmentProvider>
      </BirthPlanProvider>
    </BrowserRouter>
  </React.StrictMode>
)
