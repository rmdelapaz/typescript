import { data, type LoaderFunctionArgs } from 'react-router'
import { ApiError, getCrew, getSite } from './api.ts'
import { crewOnly } from './guards.ts'

/** /sites/:siteId: one beach site (Task 1) */
export async function siteLoader({ params, request }: LoaderFunctionArgs) {
  const { siteId } = params
  if (siteId === undefined) {
    throw new Error('siteLoader needs a route with a :siteId parameter')
  }
  try {
    // request.signal: leaving the page before the answer arrives cancels the request
    return await getSite(siteId, request.signal)
  } catch (error: unknown) {
    // An expected failure becomes a route answer: the error page shows its statusText and message
    if (error instanceof ApiError && error.status === 404) {
      throw data('No beach site has this id. Check the link.', { status: 404, statusText: 'Site not found' })
    }
    throw error
  }
}

/** /crew: the whole crew, organizers only (Task 2) */
export function crewLoader(args: LoaderFunctionArgs) {
  // The parent route's crewOnly runs at the same time as this loader, not before it: check here too
  crewOnly(args)
  return getCrew(args.request.signal)
}
