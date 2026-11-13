// Route guards: loaders that decide who may open a page, before the page renders (Lesson 6.3)
import { data, redirect, type LoaderFunctionArgs } from 'react-router'
import { readSession } from './session.ts'

/**
 * Where to go after signing in: the ?next= address, but only if it is a path inside this app.
 * Anything else (https://elsewhere.example, //elsewhere.example) goes to the home page.
 */
export function nextPath(url: URL): string {
  const next = url.searchParams.get('next')
  if (next === null || !next.startsWith('/') || next.startsWith('//') || next.startsWith('/\\')) {
    return '/'
  }
  return next
}

/** For the setters' pages: guests sign in first, staff are turned away */
export function settersOnly({ request }: LoaderFunctionArgs): null {
  const session = readSession()
  if (session === null) {
    // Remember the page (and its ?search) so the sign-in page can send people back to it
    const { pathname, search } = new URL(request.url)
    throw redirect(`/sign-in?next=${encodeURIComponent(pathname + search)}`)
  }
  if (session.user.role !== 'setter') {
    const message = 'Your staff account can read every route, but only setters can log new ones. Ask Dana.'
    throw data(message, { status: 403, statusText: 'Only setters can log routes' })
  }
  return null
}
