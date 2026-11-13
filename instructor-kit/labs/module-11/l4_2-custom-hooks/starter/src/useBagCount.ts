import { useState } from 'react'

// Task 1: a bag counter for one volunteer: the count, a function that adds a bag, a function that resets to the
// start. Returned like useState, as a list the caller names itself: const [bags, addBag, reset] = useBagCount(0)
export function useBagCount(start: number) {
  const [bags, setBags] = useState(start)
  const addBag = () => setBags((current) => current + 1)
  // TODO 1: reset goes back to `start`
  const reset = () => setBags((current) => current)
  return [bags, addBag, reset]
}
