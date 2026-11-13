// Route loaders: the router calls them when an address is opened, and shows the page once they finish (Lesson 6.3)
import { data, type LoaderFunctionArgs } from 'react-router'
import { ApiError, getEvent, getImpact, getSites } from '../api/client.ts'

/** /sites: the six beach sites */
export function sitesLoader({ request }: LoaderFunctionArgs) {
  // request.signal: leaving the page before the answer arrives cancels the request
  return getSites(request.signal)
}

/** /events/:eventId: the cleanup now, its impact report (if it has one) when it arrives */
export async function eventLoader({ params, request }: LoaderFunctionArgs) {
  const { eventId } = params
  if (eventId === undefined) {
    throw new Error('eventLoader needs a route with an :eventId parameter')
  }
  try {
    const event = await getEvent(eventId, request.signal)
    // Not awaited: the page shows without it, and the report follows (use() + Suspense)
    const impact = event.status === 'completed' ? getImpact(eventId) : null
    return { event, impact }
  } catch (error: unknown) {
    if (error instanceof ApiError && error.status === 404) {
      const message = 'There is no cleanup at this address. The link may be wrong, or the cleanup is not public.'
      throw data(message, { status: 404, statusText: 'Cleanup not found' })
    }
    throw error
  }
}
