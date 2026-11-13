// One promise per cleanup and viewer, kept for as long as the page is open (Lessons 4.4 and 5.2).
// use() needs the SAME promise on every render; a new one each time would start over.
// Temporary: TanStack Query keeps a cache like this for every request in Lesson 7.1.
import { getEvent } from './client.ts'
import type { CleanupEventDetail } from './types.ts'

const saved = new Map<string, Promise<CleanupEventDetail>>()

// An organizer gets more than a guest (drafts, the check-in code), so each viewer has their own copy
function cacheKey(id: string, viewer: string): string {
  return `${viewer}/${id}`
}

/** The cleanup with this id, as this viewer sees it: the first call starts the request */
export function eventPromise(id: string, viewer: string): Promise<CleanupEventDetail> {
  const key = cacheKey(id, viewer)
  let promise = saved.get(key)
  if (promise === undefined) {
    promise = getEvent(id)
    saved.set(key, promise)
  }
  return promise
}

/** Forget a saved promise (after an error), so the next eventPromise() asks the API again */
export function forgetEvent(id: string, viewer: string): void {
  saved.delete(cacheKey(id, viewer))
}
