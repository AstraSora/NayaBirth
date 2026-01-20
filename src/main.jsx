import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { ThemeProvider } from './context/ThemeContext'
import { BirthPlanProvider } from './context/BirthPlanContext'
import { AssessmentProvider } from './context/AssessmentContext'
import { ChecklistProvider } from './context/ChecklistContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <BirthPlanProvider>
          <AssessmentProvider>
            <ChecklistProvider>
              <App />
            </ChecklistProvider>
          </AssessmentProvider>
        </BirthPlanProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
)
