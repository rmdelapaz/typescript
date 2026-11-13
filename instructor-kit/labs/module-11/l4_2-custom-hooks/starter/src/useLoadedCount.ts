import { useEffect, useState } from 'react'

export interface LoadedCount {
  count: number | null
  reload: () => void
}

// Task 3: how many items an address has. `key` names WHAT is loaded, `load` says HOW.
// As shipped this is the lesson's "first try": everything the effect uses is in the array, including load.
// TODO 3: a page that passes an inline arrow floods the server. Let only the key (and a reload) decide when to load,
// and read the latest load through useEffectEvent.
export function useLoadedCount(key: string, load: (signal: AbortSignal) => Promise<number>): LoadedCount {
  const [loaded, setLoaded] = useState<{ count: number | null }>({ count: null })

  useEffect(() => {
    const controller = new AbortController()
    load(controller.signal)
      .then((count) => setLoaded({ count }))
      .catch(() => {})
    return () => controller.abort()
  }, [key, load])

  return { count: loaded.count, reload: () => {} }
}
