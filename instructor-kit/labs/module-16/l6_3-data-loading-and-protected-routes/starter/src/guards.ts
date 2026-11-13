import type { LoaderFunctionArgs } from 'react-router'

/** Where to go after signing in: the ?next= address, but only a path inside this app (Task 2) */
export function nextPath(url: URL): string {
  // TODO 2: accept ?next= only when it starts with one '/': not '//' and not '/\\' (browsers read both as
  // another site), and never a full address such as https://elsewhere.example. Anything else: '/'.
  return url.searchParams.get('next') ?? '/'
}

/** The guard for organizers' pages: a loader whose job is to throw (Task 2) */
export function crewOnly(_args: LoaderFunctionArgs) {
  // TODO 2: nobody signed in (readSession() is null): throw redirect('/sign-in?next=' + the address they asked
  // for, pathname AND search, encoded with encodeURIComponent). Signed in but not an organizer: throw
  // data("The crew list has everyone's contact details, so only organizers can open it.",
  //      { status: 403, statusText: 'Organizers only' }). Organizers: return null.
  return null
}
