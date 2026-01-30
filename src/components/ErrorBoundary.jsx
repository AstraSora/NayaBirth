import { Component } from 'react'
import { Button } from './ui/Button'

/**
 * Top-level Error Boundary component
 * Catches JavaScript errors anywhere in the child component tree
 */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  handleGoHome = () => {
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-warm flex flex-col items-center justify-center p-6">
          <div className="max-w-md w-full bg-surface rounded-2xl shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">😵</div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Oops! Something went wrong
            </h1>
            <p className="text-foreground-secondary mb-6">
              We're sorry, but something unexpected happened. Please try again or return to the home page.
            </p>

            <div className="flex flex-col gap-3">
              <Button onClick={this.handleReset} className="w-full">
                Try Again
              </Button>
              <Button
                variant="secondary"
                onClick={this.handleGoHome}
                className="w-full"
              >
                Go to Home
              </Button>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="text-sm text-foreground-muted cursor-pointer hover:text-foreground-secondary">
                  Technical details
                </summary>
                <pre className="mt-2 p-3 bg-muted rounded-lg text-xs text-foreground-secondary overflow-auto max-h-40">
                  {this.state.error.toString()}
                  {this.state.error.stack && (
                    <>
                      {'\n\n'}
                      {this.state.error.stack}
                    </>
                  )}
                </pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

/**
 * Lightweight Error Boundary for individual features/routes
 * Shows a simpler error message without navigation options
 */
export class FeatureErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('FeatureErrorBoundary caught an error:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false })
  }

  render() {
    if (this.state.hasError) {
      const { fallback } = this.props

      if (fallback) {
        return fallback
      }

      return (
        <div className="bg-coral-50 border border-coral-200 rounded-xl p-6 text-center">
          <div className="text-3xl mb-2">⚠️</div>
          <h3 className="font-semibold text-foreground mb-1">
            Unable to load this section
          </h3>
          <p className="text-sm text-foreground-secondary mb-4">
            Something went wrong. Please try again.
          </p>
          <button
            onClick={this.handleReset}
            className="text-coral-600 hover:text-coral-700 font-medium text-sm"
          >
            Try Again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
