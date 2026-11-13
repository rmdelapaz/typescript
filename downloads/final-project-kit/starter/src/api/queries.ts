// The cache (Lesson 7.1): the QueryClient, and one queryOptions factory per kind of server data.
import { QueryClient, queryOptions } from '@tanstack/react-query'
import { ApiError, getItem, getItems } from './client.ts'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // An answer counts as fresh for 30 seconds: no new request for it in that time
      staleTime: 30_000,
      // Try again after a network or server failure, never after 4xx: asking again won't change those
      retry: (failureCount, error) =>
        !(error instanceof ApiError && error.status < 500) && failureCount < 2,
    },
  },
})

// Keys go from general to specific, so invalidating ['items'] covers the list and every item

/** Every item */
export function itemsQuery() {
  return queryOptions({
    queryKey: ['items', 'list'],
    queryFn: ({ signal }) => getItems(signal),
  })
}

/** One item */
export function itemQuery(itemId: string) {
  return queryOptions({
    queryKey: ['items', 'detail', itemId],
    queryFn: ({ signal }) => getItem(itemId, signal),
  })
}
