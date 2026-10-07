import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { ErrorBoundary } from './components/ErrorBoundary'
import { ThemeProvider } from './context/ThemeContext'
import { BirthPlanProvider } from './context/BirthPlanContext'
import { AssessmentProvider } from './context/AssessmentContext'
import { ChecklistProvider } from './context/ChecklistContext'
import { OnboardingProvider } from './context/OnboardingContext'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import { removeLegacyTracking } from './lib/legacyCleanup'
import './index.css'

removeLegacyTracking()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <ThemeProvider>
          <OnboardingProvider>
            <BirthPlanProvider>
              <AssessmentProvider>
                <ChecklistProvider>
                  <App />
                </ChecklistProvider>
              </AssessmentProvider>
            </BirthPlanProvider>
          </OnboardingProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
)
