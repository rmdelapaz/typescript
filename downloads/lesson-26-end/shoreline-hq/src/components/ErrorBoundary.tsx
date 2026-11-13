import { Component, type ComponentType, type ReactNode } from 'react'

/** What a fallback gets: the error that was thrown, and a way to try the children again */
export interface FallbackProps {
  error: unknown
  retry: () => void
}

interface ErrorBoundaryProps {
  /** The component shown instead of the children after one of them throws while rendering */
  fallback: ComponentType<FallbackProps>
  /** Runs before a retry: undo whatever made it fail (a saved promise, for example) */
  onRetry?: () => void
  children: ReactNode
}

type ErrorBoundaryState = { failed: false } | { failed: true; error: unknown }

// React has no Hook for catching errors yet, so an error boundary is a class component.
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { failed: false }

  // React calls this when a child throws while rendering; the result becomes the new state
  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return { failed: true, error }
  }

  // An arrow function keeps `this` pointing at the boundary when a button calls it
  retry = () => {
    this.props.onRetry?.()
    this.setState({ failed: false })
  }

  render() {
    if (this.state.failed) {
      const Fallback = this.props.fallback
      return <Fallback error={this.state.error} retry={this.retry} />
    }
    return this.props.children
  }
}
