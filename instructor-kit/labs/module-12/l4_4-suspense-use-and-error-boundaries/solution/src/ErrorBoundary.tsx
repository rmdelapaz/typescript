import { Component, type ComponentType, type ReactNode } from 'react'

/** What a fallback gets: the error that was thrown, and a way to try the children again */
export interface FallbackProps {
  error: unknown
  retry: () => void
}

interface ErrorBoundaryProps {
  fallback: ComponentType<FallbackProps>
  onRetry?: () => void
  children: ReactNode
}

type ErrorBoundaryState = { failed: false } | { failed: true; error: unknown }

// Task 3: catches errors thrown while rendering the children (a rejected use() too) and shows the fallback
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { failed: false }

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return { failed: true, error }
  }

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
