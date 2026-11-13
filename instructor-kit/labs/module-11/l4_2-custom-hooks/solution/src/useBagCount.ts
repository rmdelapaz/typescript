import { useState } from 'react'

// Task 1: the count and two functions, as a readonly tuple (as const): each position keeps its own type
export function useBagCount(start: number) {
  const [bags, setBags] = useState(start)
  const addBag = () => setBags((current) => current + 1)
  const reset = () => setBags(start)
  return [bags, addBag, reset] as const
}
