import type { LoadState } from '../utils/loadState.ts'
import buttonStyles from './Button.module.css'
import styles from './LoadStatus.module.css'

interface LoadStatusProps {
  state: LoadState<unknown>
  /** What is loading, for the messages: "the beach sites" */
  what: string
  /** Shows a "Try again" button under the error */
  onRetry?: () => void
}

// The message to show while data is on its way, or when it could not be loaded
export function LoadStatus({ state, what, onRetry }: LoadStatusProps) {
  if (state.kind === 'loading') {
    return (
      <p role="status" className={styles.loading}>
        Loading {what}…
      </p>
    )
  }
  if (state.kind === 'failed') {
    return (
      <div className={styles.failed}>
        <p role="alert">
          Could not load {what}. {state.message}
        </p>
        {onRetry && (
          <button type="button" className={buttonStyles.secondary} onClick={onRetry}>
            Try again
          </button>
        )}
      </div>
    )
  }
  return null
}
