import { useEffect, useState } from 'react'
import { describeError, getSites } from '../api/client.ts'
import type { Site } from '../api/types.ts'
import { LoadStatus } from '../components/LoadStatus.tsx'
import { SiteCard } from '../components/SiteCard.tsx'
import type { LoadState } from '../utils/loadState.ts'
import styles from './Page.module.css'

export function SitesPage() {
  const [state, setState] = useState<LoadState<Site[]>>({ kind: 'loading' })

  // After the first render: ask the API for the sites, and cancel the request if the page goes away
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
      <h1>Beach sites</h1>
      <p className={styles.lead}>Six stretches of coast the crew looks after.</p>
      {state.kind === 'ready' ? (
        <div className={styles.grid}>
          {state.data.map((site) => (
            <SiteCard key={site.id} site={site} />
          ))}
        </div>
      ) : (
        <LoadStatus state={state} what="the beach sites" />
      )}
    </>
  )
}
