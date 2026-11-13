# Lab 6.3: a site desk with loaders, a guard and a sign-in action

New practice on Lesson 6.3, on a small app of its own instead of the HQ: a page for one beach site whose loader
fetches it before the page appears, one error page for every route, a crew list only organizers may open, and a
sign-in form handled by a route action that sends people back where they were going. The tests (`src/lab.test.tsx`,
do not edit) put YOUR route list in a memory router and read `router.state.location`, which is exactly what the
address bar would show; MSW answers the requests with real shoreline-api answers (`src/fixtures.ts`).

**Setup (once):** a terminal in `labs/module-16/l6_3-data-loading-and-protected-routes/starter`, then `npm install`
(the same packages as Session 15's labs). `npm test` (all 8 tests fail as shipped; the first failure shows `TODO 1`), `npm run typecheck` (one error as shipped: Task 1's type test), `npm run lint`. Files you edit:
`src/loaders.ts`, `src/SitePage.tsx`, `src/ErrorPage.tsx`, `src/guards.ts`, `src/signInAction.ts`,
`src/routes.tsx`. Everything else is given: `api.ts` (the only file that calls `fetch`; `ApiError` has `status`
and `fieldErrors`), `session.ts` (the session store: `readSession`, `saveSession`, `onSessionChange`), the layout,
the crew page and the sign-in page.

## Task 1: a loader, its type and one error page

In `src/loaders.ts`, write `siteLoader`: read `params.siteId`, `await getSite(siteId, request.signal)` and return
the site. An unknown id is not a crash: turn the API's 404 into a route answer with
`data('No beach site has this id. Check the link.', { status: 404, statusText: 'Site not found' })`. Put it on the
`sites/:siteId` route (`src/routes.tsx`), and make `SitePage` read it with `useLoaderData<typeof siteLoader>()`
(an `import type` is enough). Then `src/ErrorPage.tsx`: `useRouteError()` gives `unknown`; narrow it with
`isRouteErrorResponse` (heading = `statusText`, text = `data` when it is a string, no alert) and show anything else
in a `role="alert"` box with the heading "Something went wrong on this page" and the error's message. Done when the
three Task 1 tests pass and `npm run typecheck` is clean. Predict first: what does `useLoaderData()` return without
the type argument?

## Task 2: the guard

In `src/guards.ts`: `nextPath(url)` accepts `?next=` only when it is a path inside the app (it starts with one `/`,
not `//` and not `/\`); anything else gives `/`. `crewOnly` is a loader whose job is to throw: a guest gets
`redirect('/sign-in?next=' + encodeURIComponent(pathname + search))`, a signed-in volunteer gets
`data(message, { status: 403, statusText: 'Organizers only' })`. In `src/routes.tsx`, move the crew page into the
children of a route with no path and `loader: crewOnly`. Then run the tests: one still fails, because a parent's
loader and its child's loader run AT THE SAME TIME (the lesson's Exercise 3). Call `crewOnly(args)` first in
`crewLoader`. Done when the Task 2 tests pass.

## Task 3: the sign-in action

`SignInPage` already uses the router's `<Form method="post">` and `useActionData<typeof signInAction>()`. Write
`signInAction` in `src/signInAction.ts`: `await request.formData()`, narrow both fields with `typeof`,
`saveSession(await postSignIn({ email, password }))`; return a `SignInResult` for a 400 (the field errors) or a 401
(the API's message, the email kept); on success `throw redirect(nextPath(new URL(request.url)))`. Predict: after a
wrong password, what is the address? Done when `npm test` says `Tests  8 passed (8)`, `npm run typecheck` prints
nothing after its two `>` lines and `npm run lint` says `Found 0 warnings and 0 errors.`

**Stretch:** in `crewOnly`, replace `readSession()` with a Hook, `useSyncExternalStore(onSessionChange,
readSession)`, and run `npm run lint`: what does oxlint say, and why can a loader never call a Hook? (Put it back.)
Then remove `crewOnly(args)` from `crewLoader` again and read the failing test's message: which request slipped
past the guard?
