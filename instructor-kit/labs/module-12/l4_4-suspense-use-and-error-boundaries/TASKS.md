# Lab 4.4: Suspense, use() and an error boundary

New practice on Lesson 4.4's ideas, outside the course app (the lesson's own project builds the cleanup page at
/events/e08). The tests' pretend server answers like shoreline-api with its saved answers (`../fixtures/`): a site,
a 404 for an id it does not have, and a 500 when a test asks for one.

**Setup (once):** a terminal in `labs/module-12/l4_4-suspense-use-and-error-boundaries/starter`, then `npm install`.
**Run:** `npm test` (as shipped, five of six tests fail; the click-handler test already passes, because a boundary
that catches nothing behaves the same) and `npm run typecheck` (as shipped, no errors: this lab's lesson is at run
time).

## Task 1: one promise per site (`src/sitePromises.ts`)

`use()` reads a promise while rendering, and a component that suspends is rendered again from the top: a NEW
promise on every render would suspend forever (the lesson measured more than a thousand requests in three seconds).
Keep one promise per id in a `Map` at module level; `forgetSite(id)` deletes it. Done when the Task 1 test passes.

## Task 2: the panel, and a fallback that helps (`src/SitePanel.tsx`)

`SiteFacts` reads `use(sitePromise(siteId))` and shows only the happy path (no loading, no error code in it).
`SitePanel` puts it inside `<Suspense fallback={<p role="status">Loading the site…</p>}>` inside your
`ErrorBoundary` (Task 3) with `onRetry={() => forgetSite(siteId)}`. `SiteProblem` is the fallback: a 404 is
`Site not found` (an h2, nothing to retry); anything else is `Could not load the site.` (role alert) with a
`Try again` button. Why must Try again forget the promise first? (A rejected promise stays rejected.)

## Task 3: the error boundary (`src/ErrorBoundary.tsx`)

A class component (React has no Hook for this): a state typed as a union, `static getDerivedStateFromError`
returning the failed state, a `retry` arrow function (onRetry, then `{ failed: false }`), and `render` showing
`<Fallback error retry />` when it failed. The last test proves what a boundary does NOT catch: an error in a click
handler leaves the page as it is. Done when `npm test` ends with `Tests  6 passed (6)` and `npm run typecheck`
prints nothing after its two `>` lines. Do Task 3 before Task 2's last two tests can pass.

**Stretch:** remove `static` from `getDerivedStateFromError` in your solution and run the tests: what happens, and
what do `npm run typecheck` and the console say? (The lesson's Common Mistakes.)
