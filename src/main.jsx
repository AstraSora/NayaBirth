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
import { AnalyticsProvider } from './context/AnalyticsContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <ThemeProvider>
          <OnboardingProvider>
            <BirthPlanProvider>
              <AssessmentProvider>
                <ChecklistProvider>
                  <AnalyticsProvider>
                    <App />
                  </AnalyticsProvider>
                </ChecklistProvider>
              </AssessmentProvider>
            </BirthPlanProvider>
          </OnboardingProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
)
