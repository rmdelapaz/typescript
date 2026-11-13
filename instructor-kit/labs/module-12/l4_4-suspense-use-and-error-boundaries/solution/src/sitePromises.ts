import { fetchSite, type SiteFacts } from './api.ts'

// Task 1: one promise per site id, for as long as the page is open
const saved = new Map<string, Promise<SiteFacts>>()

export function sitePromise(id: string): Promise<SiteFacts> {
  let promise = saved.get(id)
  if (promise === undefined) {
    promise = fetchSite(id)
    saved.set(id, promise)
  }
  return promise
}

export function forgetSite(id: string): void {
  saved.delete(id)
}
