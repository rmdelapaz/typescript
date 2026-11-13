// Route guards: loaders that decide who may open a page, before the page renders (Lesson 6.3)
import type { LoaderFunctionArgs } from 'react-router'

/**
 * Where to go after signing in: the ?next= address, but only if it is a path inside this app.
 * Anything else (https://elsewhere.example, //elsewhere.example) goes to the home page.
 */
export function nextPath(url: URL): string {
  // TODO R4: '/setter' for /sign-in?next=%2Fsetter; '/' when next is missing or not a path inside the app
  throw new Error(`TODO R4: nextPath is not written yet (${url.search})`)
}

/** For the setters' pages: guests sign in first, staff are turned away */
export function settersOnly({ request }: LoaderFunctionArgs): null {
  // TODO R4: with readSession() (src/auth/session.ts):
  //   nobody signed in  -> throw redirect('/sign-in?next=' + encodeURIComponent(path and search of request.url))
  //   not a setter      -> throw data(a sentence for people, { status: 403, statusText: 'Only setters can log routes' })
  //   a setter          -> return null
  throw new Error(`TODO R4: settersOnly is not written yet (${new URL(request.url).pathname})`)
}
