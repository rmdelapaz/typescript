// Route guards: loaders that decide who may open a page, before the page renders (Lesson 6.3)
import { data, redirect, type LoaderFunctionArgs, type ShouldRevalidateFunctionArgs } from 'react-router'
import { readSession } from '../api/client.ts'

/**
 * Where to go after signing in: the ?next= address, but only if it is a path inside the HQ.
 * Anything else (https://elsewhere.example, //elsewhere.example) goes to the home page.
 */
export function nextPath(url: URL): string {
  const next = url.searchParams.get('next')
  if (next === null || !next.startsWith('/') || next.startsWith('//') || next.startsWith('/\\')) {
    return '/'
  }
  return next
}

/** For pages with contact details and planning tools: guests sign in first, volunteers are turned away */
export function organizersOnly({ request }: LoaderFunctionArgs) {
  const session = readSession()
  if (session === null) {
    // Remember the page (and its ?search) so the sign-in page can send people back to it
    const { pathname, search } = new URL(request.url)
    throw redirect(`/sign-in?next=${encodeURIComponent(pathname + search)}`)
  }
  if (session.user.role !== 'organizer') {
    const message = "This page has the crew's contact details and planning tools, so only organizers can open it."
    throw data(message, { status: 403, statusText: 'Organizers only' })
  }
  return null
}

/**
 * When the router may skip organizersOnly: a change to the ?search alone (typing in a search box).
 * A loader makes every navigation wait for it, and a box that waits loses letters.
 */
export function onlyWhenThePathChanges({
  currentUrl,
  nextUrl,
  defaultShouldRevalidate,
}: ShouldRevalidateFunctionArgs) {
  const sameAddress = currentUrl.pathname === nextUrl.pathname
  if (sameAddress && currentUrl.search !== nextUrl.search) {
    return false
  }
  return defaultShouldRevalidate
}

/** The sign-in page is for people who are not signed in yet: everyone else goes on to ?next= */
export function guestsOnly({ request }: LoaderFunctionArgs) {
  if (readSession() !== null) {
    throw redirect(nextPath(new URL(request.url)))
  }
  return null
}
