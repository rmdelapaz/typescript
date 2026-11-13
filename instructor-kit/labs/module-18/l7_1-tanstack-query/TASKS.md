# Lab 7.1: a cache with good keys

New practice on Lesson 7.1, away from the HQ: the cleanups at one beach site (the HQ has no such page). `src/api.ts`
is a tiny API client in the HQ's style (given); `src/queries.ts` holds the factories; `src/SiteCleanups.tsx` reads
one. Mock Service Worker answers the requests with real answers saved from shoreline-api (`fixtures/`), so no
server is needed.

**Setup (once):** a terminal in `labs/module-18/l7_1-tanstack-query/starter`, then `npm install`.
**Run:** `npm test` (Vitest) and `npm run typecheck` (`tsc --noEmit`). As shipped, all 8 tests fail.

## Task 1: a key that leaves something out (`queries.ts`)

`siteEventsQuery(siteId, viewer)` type-checks, lints, and fetches the right cleanups. Run the two Task 1 tests and
read what they say: the second site's answer comes back with the first site's cleanups and no second request. Fix
the key so it holds everything the answer depends on, general to specific (`['events', 'site', siteId, viewer]`),
and say in one sentence why `queryClient.invalidateQueries({ queryKey: ['events'] })` still reaches it.

## Task 2: read the query, narrowed (`SiteCleanups.tsx`)

Read `siteEventsQuery(siteId, viewer)` with `useQuery` and return: `<p role="status">Loading the cleanups…</p>`
while pending, `<p role="alert">Could not load the cleanups. MESSAGE</p>` on an error (the `ApiError`'s message),
`<p>No cleanups at this site yet.</p>` for an empty list, otherwise `<ul aria-label="Cleanups at this site">` with
one `<li>` per title. Use early returns on `isPending` and `isError`: after them, hover `data` in VS Code. No type
arguments anywhere.

## Task 3: retry what can change (`shouldRetry`)

TanStack Query retries every failure 3 more times by default. Make `shouldRetry(failureCount, error)` say no to any
`ApiError` with a status below 500, and allow at most 2 more tries otherwise. The last test counts the requests
MSW receives: 1 for a 404, 3 for a 500.

Done when `npm test` says `Tests  8 passed (8)` and `npm run typecheck` prints nothing after its two `>` lines.
**Stretch:** in `SiteCleanups`, keep the last site's list on screen while the next one loads
(`placeholderData: keepPreviousData`), and show "Updating…" while `isPlaceholderData` is true.
