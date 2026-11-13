import type { LoadState } from './loadState.ts'
import type { Site } from './types.ts'

// Task 1: load `${apiUrl}/api/sites/${siteId}` when the component appears, and again whenever siteId changes.
//   - start as { kind: 'loading' }
//   - an error status (response.ok is false): { kind: 'failed', message: `Could not load the site (STATUS).` }
//   - otherwise read the JSON as unknown, check it with isSite (./isSite.ts): { kind: 'ready', data }
//   - abort the request in the effect's cleanup, and ignore the error an aborted request causes
export function useSite(apiUrl: string, siteId: string): LoadState<Site> {
  return { kind: 'failed', message: `TODO 1: load ${apiUrl}/api/sites/${siteId}` }
}
