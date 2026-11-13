import { describeError } from '../api/client.ts'
import styles from './LoadStatus.module.css'

/** What LoadStatus reads from a TanStack Query result (any query fits) */
export interface QueryStatus {
  status: 'pending' | 'error' | 'success'
  error: unknown
  /** Shows a "Try again" button under the error */
  refetch?: () => unknown
}

interface LoadStatusProps {
  query: QueryStatus
  /** What is loading, for the messages: "the items" */
  what: string
}

// The message to show while data is on its way, or when it could not be loaded (Lesson 7.1)
export function LoadStatus({ query, what }: LoadStatusProps) {
  const { status, error, refetch } = query
  if (status === 'pending') {
    return <p role="status">Loading {what}…</p>
  }
  if (status === 'error') {
    return (
      <div className={styles.failed}>
        <p role="alert">
          Could not load {what}. {describeError(error)}
        </p>
        {refetch && (
          <button type="button" onClick={() => void refetch()}>
            Try again
          </button>
        )}
      </div>
    )
  }
  return null
}
