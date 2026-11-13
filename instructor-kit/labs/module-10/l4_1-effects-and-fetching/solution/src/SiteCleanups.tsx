import { useEffect, useState } from 'react'
import { ApiError, fetchSiteEvents } from './api.ts'
import { statusText, type LoadState } from './loadState.ts'
import type { EventSummary } from './types.ts'

interface SiteCleanupsProps {
  apiUrl: string
  siteId: string
}

function describe(error: unknown): string {
  if (error instanceof ApiError) return `The server had a problem (${error.status}).`
  return 'Could not reach the server.'
}

// Task 2b: one request per siteId; a newer siteId cancels the older request (the latest run wins)
export function SiteCleanups({ apiUrl, siteId }: SiteCleanupsProps) {
  const [state, setState] = useState<LoadState<EventSummary[]>>({ kind: 'loading' })

  useEffect(() => {
    const controller = new AbortController()
    fetchSiteEvents(apiUrl, siteId, controller.signal)
      .then((events) => setState({ kind: 'ready', data: events }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        setState({ kind: 'failed', message: describe(error) })
      })
    return () => controller.abort()
  }, [apiUrl, siteId])

  if (state.kind === 'loading') return <p role="status">{statusText(state, 'the cleanups')}</p>
  if (state.kind === 'failed') return <p role="alert">{statusText(state, 'the cleanups')}</p>
  if (state.data.length === 0) return <p>No cleanups at this site yet.</p>
  return (
    <ul>
      {state.data.map((event) => (
        <li key={event.id}>{event.title}</li>
      ))}
    </ul>
  )
}
