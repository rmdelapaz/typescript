import { useEffect, useState } from 'react'
import { describeError, getSites } from '../api/client.ts'
import type { Site } from '../api/types.ts'
import { LoadStatus } from '../components/LoadStatus.tsx'
import { NewEventForm } from '../components/NewEventForm.tsx'
import type { LoadState } from '../utils/loadState.ts'
import styles from './Page.module.css'

export function NewEventPage() {
  const [state, setState] = useState<LoadState<Site[]>>({ kind: 'loading' })

  // The form needs the sites for its menu and its checks
  useEffect(() => {
    const controller = new AbortController()
    getSites(controller.signal)
      .then((sites) => setState({ kind: 'ready', data: sites }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        console.error(error)
        setState({ kind: 'failed', message: describeError(error) })
      })
    return () => controller.abort()
  }, [])

  return (
    <>
      <h1>Plan a cleanup</h1>
      <p className={styles.lead}>
        Fill in the basics. Save it as a draft to finish later, or publish it so volunteers can
        sign up.
      </p>
      {state.kind === 'ready' ? (
        <NewEventForm sites={state.data} />
      ) : (
        <LoadStatus state={state} what="the beach sites" />
      )}
    </>
  )
}
