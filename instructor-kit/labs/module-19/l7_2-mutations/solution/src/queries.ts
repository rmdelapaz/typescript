// The lab's cache and its two queries. Given: nothing to change here.
import { QueryClient, queryOptions } from '@tanstack/react-query'
import { getEvent, getMySignups } from './api.ts'

// staleTime Infinity: in this lab nothing refreshes by itself, so a change shows only when you invalidate it
export const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: Infinity, retry: false } },
})

export function eventQuery(eventId: string) {
  return queryOptions({
    queryKey: ['events', 'detail', eventId],
    queryFn: ({ signal }) => getEvent(eventId, signal),
  })
}

export function mySignupsQuery() {
  return queryOptions({
    queryKey: ['me', 'signups'],
    queryFn: ({ signal }) => getMySignups(signal),
  })
}
