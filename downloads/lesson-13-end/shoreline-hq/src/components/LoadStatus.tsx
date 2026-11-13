import type { LoadState } from '../utils/loadState.ts'
import styles from './LoadStatus.module.css'

interface LoadStatusProps {
  state: LoadState<unknown>
  /** What is loading, for the messages: "the beach sites" */
  what: string
}

// The message to show while data is on its way, or when it could not be loaded
export function LoadStatus({ state, what }: LoadStatusProps) {
  if (state.kind === 'loading') {
    return (
      <p role="status" className={styles.loading}>
        Loading {what}…
      </p>
    )
  }
  if (state.kind === 'failed') {
    return (
      <p role="alert" className={styles.failed}>
        Could not load {what}. {state.message}
      </p>
    )
  }
  return null
}
