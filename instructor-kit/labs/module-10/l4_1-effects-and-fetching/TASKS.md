# Lab 4.1: effects with a cleanup, and fetching that holds up

New practice on Lesson 4.1's ideas, outside the course app (the lesson's own project is the HQ's pages). The
requests in the tests are answered by MSW with answers saved from the real shoreline-api (`../fixtures/`), so no
server needs to run, and the API's slow and failing answers can be tested on purpose.

**Setup (once):** a terminal in `labs/module-10/l4_1-effects-and-fetching/starter`, then `npm install`.
**Run:** `npm test` (as shipped, all seven tests fail) and `npm run typecheck` (as shipped, two errors in the
test file: Task 3).

## Task 1: an effect that cleans up after itself (`src/ConnectionBadge.tsx`)

Show `Connection: Online` or `Connection: Offline` in a `role="status"` paragraph. Start from `navigator.onLine`
(a function passed to `useState` runs once), and follow the window's `online` and `offline` events. The listeners
are the outside world: add them in an effect, and remove exactly the same functions in its cleanup (the radio
check-in: always sign off). Done when the two Task 1 tests pass. Which dependency array, and why?

## Task 2: a fetch that checks, and a component that cancels (`src/api.ts`, `src/SiteCleanups.tsx`)

**2a.** `fetchSiteEvents` asks `GET /api/events?siteId=...`. As shipped, an answer with status 500 comes back as if
it were data. Make it throw an `ApiError` (status and the API's message) when `response.ok` is false.

**2b.** `SiteCleanups` shows the cleanups at one site. Keep a `LoadState<EventSummary[]>`, load in an effect with an
`AbortController`, pass its signal to `fetchSiteEvents`, ignore a canceled request in the catch, and abort in the
cleanup. Load again whenever `siteId` changes. Show `statusText(state, 'the cleanups')` in a `role="status"`
paragraph while loading and a `role="alert"` paragraph when it failed (`The server had a problem (500).`), the
titles in a list, or `No cleanups at this site yet.`

The last Task 2 test is the race from the lesson: Pelican Point's answer is slow, the site changes to Long Strand,
and Pelican Point's answer must never replace Long Strand's. Done when the four Task 2 tests pass.

## Task 3: a loading state that cannot lie (`src/loadState.ts`)

Make `LoadState<T>` a discriminated union on `kind` (loading; failed with a message; ready with data), and write
`statusText`. The last lines of `lab.test.tsx` read `data` from a loading state and build a ready state without
data, and say they EXPECT errors: while `LoadState` is one loose object type, `npm run typecheck` complains that no
error happened (TS2578). Done when `npm test` ends with `Tests  7 passed (7)` and `npm run typecheck` prints
nothing after its two `>` lines.

**Stretch:** give `SiteCleanups` a `Try again` button for the failed state (Lesson 4.1, Exercise 1: an `attempt`
number in the dependency array, and the loading state set in the click handler, not at the top of the effect).
