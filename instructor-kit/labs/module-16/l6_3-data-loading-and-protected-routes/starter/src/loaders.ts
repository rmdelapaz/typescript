import type { LoaderFunctionArgs } from 'react-router'
import { getCrew } from './api.ts'

/** /sites/:siteId: one beach site (Task 1) */
export async function siteLoader({ params, request }: LoaderFunctionArgs) {
  // TODO 1: read params.siteId (throw an Error when it is undefined), await getSite(siteId, request.signal) and
  // return the site. The API answers 404 for an unknown id: catch that ApiError and throw a route answer instead,
  // data('No beach site has this id. Check the link.', { status: 404, statusText: 'Site not found' }).
  throw new Error(`TODO 1: load the site ${params.siteId ?? '(no id)'} for ${request.url}`)
}

/** /crew: the whole crew, organizers only (Task 2) */
export function crewLoader({ request }: LoaderFunctionArgs) {
  // TODO 2: this loader runs AT THE SAME TIME as its parent route's guard, not after it. Call crewOnly(args)
  // first, so a guest's visit never sends the crew request.
  return getCrew(request.signal)
}
