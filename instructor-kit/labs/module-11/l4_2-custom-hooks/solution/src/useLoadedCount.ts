import { useEffect, useEffectEvent, useState } from 'react'

export interface LoadedCount {
  count: number | null
  reload: () => void
}

// Task 3: the key (and a reload) decide WHEN; useEffectEvent hands the effect the latest HOW
export function useLoadedCount(key: string, load: (signal: AbortSignal) => Promise<number>): LoadedCount {
  const [loaded, setLoaded] = useState<{ count: number | null }>({ count: null })
  const [attempt, setAttempt] = useState(0)
  const loadLatest = useEffectEvent(load)

  useEffect(() => {
    const controller = new AbortController()
    loadLatest(controller.signal)
      .then((count) => setLoaded({ count }))
      .catch(() => {})
    return () => controller.abort()
  }, [key, attempt])

  return { count: loaded.count, reload: () => setAttempt((n) => n + 1) }
}
