// Route loaders (Lesson 6.3). Since Lesson 7.1 they fill the cache, and the pages read it.
import { data, type LoaderFunctionArgs } from 'react-router'
import { ApiError, readSession } from '../api/client.ts'
import { eventQuery, impactTotalsQuery, queryClient, sitesQuery, viewerId } from '../api/queries.ts'

/** /sites: the six beach sites */
export async function sitesLoader() {
  // staleTime 'static': cached sites (however old) are good enough to show at once
  await queryClient.query({ ...sitesQuery(), staleTime: 'static' })
  return null
}

/** /events/:eventId: the cleanup must be in the cache before the page shows */
export async function eventLoader({ params }: LoaderFunctionArgs) {
  const { eventId } = params
  if (eventId === undefined) {
    throw new Error('eventLoader needs a route with an :eventId parameter')
  }
  // The page builds the same key from these two values
  const viewer = viewerId(readSession())
  try {
    await queryClient.query({ ...eventQuery(eventId, viewer), staleTime: 'static' })
  } catch (error: unknown) {
    if (error instanceof ApiError && error.status === 404) {
      const message = 'There is no cleanup at this address. The link may be wrong, or the cleanup is not public.'
      throw data(message, { status: 404, statusText: 'Cleanup not found' })
    }
    throw error
  }
  return { eventId, viewer }
}

/** /impact: the crew's totals */
export async function impactLoader() {
  await queryClient.query({ ...impactTotalsQuery(), staleTime: 'static' })
  return null
}
