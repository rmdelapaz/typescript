import { useEffect, useEffectEvent, useState } from 'react'
import { describeError } from '../api/client.ts'
import { useAuth } from '../auth/AuthContext.ts'
import type { LoadState } from '../utils/loadState.ts'

/** What useApi gives a component: the state of the request, and a way to send it again */
export interface ApiResult<T> {
  state: LoadState<T>
  reload: () => void
}

/**
 * Loads data when the component appears, and again whenever `key` or the signed-in person changes.
 * key: what is loaded (a short text that changes when the request should change)
 * load: how to load it (gets an AbortSignal so the request can be canceled)
 */
export function useApi<T>(key: string, load: (signal: AbortSignal) => Promise<T>): ApiResult<T> {
  const [state, setState] = useState<LoadState<T>>({ kind: 'loading' })
  const [attempt, setAttempt] = useState(0)
  // Who asks is part of the question: signing in or out loads the data again
  const viewer = useAuth().session?.user.id ?? 'guest'
  // The latest load function, without making the effect run again when it changes
  const loadLatest = useEffectEvent(load)

  useEffect(() => {
    const controller = new AbortController()
    loadLatest(controller.signal)
      .then((data) => setState({ kind: 'ready', data }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        console.error(error)
        setState({ kind: 'failed', message: describeError(error) })
      })
    return () => controller.abort()
  }, [key, viewer, attempt])

  function reload() {
    setState({ kind: 'loading' })
    setAttempt((count) => count + 1)
  }

  return { state, reload }
}
