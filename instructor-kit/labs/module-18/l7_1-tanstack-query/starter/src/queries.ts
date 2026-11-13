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
// It type-checks and lints cleanly, and it has a bug: the tests say which.
export function siteEventsQuery(siteId: string, viewer: string) {
  return queryOptions({
    queryKey: ['events', 'site', viewer],
    queryFn: ({ signal }) => getSiteEvents(siteId, signal),
  })
}

// Task 3: which failures deserve another try? (TanStack Query's default: every failure, 3 more times)
// TODO 3: never retry an ApiError below 500; retry anything else at most 2 more times
export function shouldRetry(failureCount: number, _error: Error): boolean {
  return failureCount < 3
}
