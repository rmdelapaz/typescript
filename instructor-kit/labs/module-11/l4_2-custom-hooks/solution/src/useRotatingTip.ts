import { useEffect, useState } from 'react'

// Task 2: a generic Hook: T comes from the list the caller passes
export function useRotatingTip<T>(items: readonly T[], intervalMs: number): T | undefined {
  const [index, setIndex] = useState(0)
  const count = items.length

  useEffect(() => {
    if (count === 0) return
    const timer = setInterval(() => setIndex((current) => (current + 1) % count), intervalMs)
    return () => clearInterval(timer)
  }, [count, intervalMs])

  return items[index % Math.max(count, 1)]
}
