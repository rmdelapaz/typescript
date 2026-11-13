// One promise per cleanup, kept for as long as the page is open (Lesson 4.4).
// use() needs the SAME promise on every render; a new one each time would start over.
// Temporary: TanStack Query keeps a cache like this for every request in Lesson 7.1.
import { getEvent } from './client.ts'
import type { CleanupEventDetail } from './types.ts'

const saved = new Map<string, Promise<CleanupEventDetail>>()

/** The cleanup with this id: the first call starts the request, later calls get the same promise */
export function eventPromise(id: string): Promise<CleanupEventDetail> {
  let promise = saved.get(id)
  if (promise === undefined) {
    promise = getEvent(id)
    saved.set(id, promise)
  }
  return promise
}

/** Forget a saved promise (after an error), so the next eventPromise(id) asks the API again */
export function forgetEvent(id: string): void {
  saved.delete(id)
}
