import { useEffect, useState } from 'react'
import { isSite } from './isSite.ts'
import type { LoadState } from './loadState.ts'
import type { Site } from './types.ts'

/** One site from the API, loaded when the component appears and again whenever siteId changes */
export function useSite(apiUrl: string, siteId: string): LoadState<Site> {
  const [state, setState] = useState<LoadState<Site>>({ kind: 'loading' })

  useEffect(() => {
    const controller = new AbortController()
    fetch(`${apiUrl}/api/sites/${encodeURIComponent(siteId)}`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) {
          setState({ kind: 'failed', message: `Could not load the site (${response.status}).` })
          return
        }
        const data: unknown = await response.json()
        if (!isSite(data)) {
          setState({ kind: 'failed', message: 'The API sent something that is not a site.' })
          return
        }
        setState({ kind: 'ready', data })
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return     // we cancelled it: nothing went wrong
        console.error(error)
        setState({ kind: 'failed', message: 'Could not reach the server.' })
      })
    return () => controller.abort()
  }, [apiUrl, siteId])

  return state
}
