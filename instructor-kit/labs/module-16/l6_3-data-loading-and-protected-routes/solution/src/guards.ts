import { data, redirect, type LoaderFunctionArgs } from 'react-router'
import { readSession } from './session.ts'

/** Where to go after signing in: the ?next= address, but only a path inside this app (Task 2) */
export function nextPath(url: URL): string {
  const next = url.searchParams.get('next')
  if (next === null || !next.startsWith('/') || next.startsWith('//') || next.startsWith('/\\')) {
    return '/'
  }
  return next
}

/** The guard for organizers' pages: a loader whose job is to throw (Task 2) */
export function crewOnly({ request }: LoaderFunctionArgs) {
  const session = readSession()
  if (session === null) {
    // Remember the page AND its ?search: an address inside an address must be encoded
    const { pathname, search } = new URL(request.url)
    throw redirect(`/sign-in?next=${encodeURIComponent(pathname + search)}`)
  }
  if (session.user.role !== 'organizer') {
    // Signed in, just not allowed: signing in again would not help, so explain instead of redirecting
    const message = "The crew list has everyone's contact details, so only organizers can open it."
    throw data(message, { status: 403, statusText: 'Organizers only' })
  }
  return null
}
