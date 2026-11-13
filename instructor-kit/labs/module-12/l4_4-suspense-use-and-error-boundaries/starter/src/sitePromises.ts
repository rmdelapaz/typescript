import { fetchSite, type SiteFacts } from './api.ts'

// Task 1: use() needs the SAME promise on every render. Keep one promise per site id: the first call starts
// fetchSite(id), later calls get that promise back, and forgetSite(id) drops it so the next call asks again.
export function sitePromise(id: string): Promise<SiteFacts> {
  throw new Error(`TODO 1: one promise for ${id} (fetchSite: ${fetchSite.name})`)
}

export function forgetSite(id: string): void {
  throw new Error(`TODO 1: forget ${id}`)
}
