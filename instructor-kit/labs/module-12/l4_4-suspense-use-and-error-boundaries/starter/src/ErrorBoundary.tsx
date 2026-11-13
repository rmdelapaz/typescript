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

// Task 3: a typed error boundary. TODO 3: a state that is either { failed: false } or { failed: true; error },
// the static method React calls when a child throws while rendering, a retry arrow function (onRetry, then try the
// children again), and a render that shows the fallback component when it failed.
export class ErrorBoundary extends Component<ErrorBoundaryProps> {
  render() {
    return this.props.children
  }
}
