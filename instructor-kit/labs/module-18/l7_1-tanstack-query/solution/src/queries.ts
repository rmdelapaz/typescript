// The lab's queryOptions factories and retry rule (Lesson 7.1)
import { queryOptions } from '@tanstack/react-query'
import { ApiError, getSiteEvents, getSites } from './api.ts'

/** Given: the six sites, the same for everyone */
export function sitesQuery() {
  return queryOptions({
    queryKey: ['sites'],
    queryFn: ({ signal }) => getSites(signal),
  })
}

// Task 1: the cleanups at one site. Organizers also get drafts, so who asks is part of the question.
// The key holds everything the answer depends on, general to specific: ['events'] still reaches it.
export function siteEventsQuery(siteId: string, viewer: string) {
  return queryOptions({
    queryKey: ['events', 'site', siteId, viewer],
    queryFn: ({ signal }) => getSiteEvents(siteId, signal),
  })
}

// Task 3: which failures deserve another try? Never a 401, 403 or 404: asking again will not change the answer.
export function shouldRetry(failureCount: number, error: Error): boolean {
  return !(error instanceof ApiError && error.status < 500) && failureCount < 2
}
