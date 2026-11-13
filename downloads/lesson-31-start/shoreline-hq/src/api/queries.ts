// Shoreline Crew HQ's cache (Lesson 7.1): the QueryClient, and one queryOptions factory per kind of data.
// A factory pairs a key (where the answer is kept) with the function that fetches it.
import { QueryClient, queryOptions } from '@tanstack/react-query'
import {
  ApiError,
  getEvent,
  getEvents,
  getImpact,
  getImpactTotals,
  getRoster,
  getSites,
  getVolunteer,
  getVolunteers,
  type Session,
} from './client.ts'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // An answer counts as fresh for 30 seconds: no new request for it in that time
      staleTime: 30_000,
      // Try again after a network or server failure, but never after 401, 403 or 404:
      // asking again will not change those answers
      retry: (failureCount, error) =>
        !(error instanceof ApiError && error.status < 500) && failureCount < 2,
    },
  },
})

/** Who is asking: a person's id, or 'guest'. Some answers depend on it, so it goes in their keys. */
export function viewerId(session: Session | null): string {
  return session?.user.id ?? 'guest'
}

/** The six beach sites (the same for everyone) */
export function sitesQuery() {
  return queryOptions({
    queryKey: ['sites'],
    queryFn: ({ signal }) => getSites(signal),
  })
}

/** Cleanups for a search string such as 'status=scheduled&perPage=50' (drafts for organizers) */
export function eventsQuery(search: string, viewer: string) {
  return queryOptions({
    queryKey: ['events', 'list', search, viewer],
    queryFn: ({ signal }) => getEvents(search, signal),
  })
}

/** One cleanup with its site (a draft only for organizers) */
export function eventQuery(eventId: string, viewer: string) {
  return queryOptions({
    queryKey: ['events', 'detail', eventId, viewer],
    queryFn: ({ signal }) => getEvent(eventId, signal),
  })
}

/** A completed cleanup's impact report (public) */
export function eventImpactQuery(eventId: string) {
  return queryOptions({
    queryKey: ['events', 'impact', eventId],
    queryFn: ({ signal }) => getImpact(eventId, signal),
  })
}

/** A cleanup's sign-ups with contact details (organizers only) */
export function rosterQuery(eventId: string, viewer: string) {
  return queryOptions({
    queryKey: ['events', 'roster', eventId, viewer],
    queryFn: ({ signal }) => getRoster(eventId, signal),
  })
}

/** One page of the crew for a search string such as 'skill=first-aid&page=2' (organizers only) */
export function volunteersQuery(search: string, viewer: string) {
  return queryOptions({
    queryKey: ['volunteers', 'list', search, viewer],
    queryFn: ({ signal }) => getVolunteers(search, signal),
  })
}

/** One person on the crew (organizers only) */
export function volunteerQuery(volunteerId: string, viewer: string) {
  return queryOptions({
    queryKey: ['volunteers', 'detail', volunteerId, viewer],
    queryFn: ({ signal }) => getVolunteer(volunteerId, signal),
  })
}

/** The crew's totals for the impact dashboard (public) */
export function impactTotalsQuery() {
  return queryOptions({
    queryKey: ['impact'],
    queryFn: ({ signal }) => getImpactTotals(signal),
  })
}
