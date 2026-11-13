# Lab 6.2: a cleanup log with its filters in the address

New practice on Lesson 6.2, on a small app of its own instead of the HQ: a log of the 15 public cleanups
with a status filter and a site filter that live in the address, and each cleanup's details in a nested route
beside the list. The tests (`src/lab.test.tsx`, do not edit) put YOUR route list in a memory router, start at an
address such as `/log?status=completed` and read `router.state.location` after a click.

**Setup (once):** a terminal in `labs/module-15/l6_2-search-params-nested-routes-and-typed-navigation/starter`,
then `npm install` (the same packages as Lab 6.1). `npm test` (all 8 tests fail as shipped), `npm run typecheck`
(one error as shipped: Task 1), `npm run lint`. Files you edit: `src/params.ts`, `src/CleanupLog.tsx`,
`src/routes.tsx`. `src/cleanups.ts` is given.

## Task 1: typed values from the address (`src/params.ts`)

Every search param is `string | null`. Write `readChoice(params, name, allowed)`: the value if it is one of
`allowed`, otherwise `undefined`. Make it generic (`<T extends string>`, `allowed: readonly T[]`, returns
`T | undefined`) so `readChoice(params, 'status', statuses)` is an `EventStatus | undefined`, with no `as`
(hint: `allowed.find(...)` already returns a `T`). The test file assigns the result to an
`EventStatus | undefined`: `npm run typecheck` reports TS2322 until the type is right. Then
`withParams(params, changes)`: a COPY with each change applied, an empty value removing its name. Done when the
two Task 1 tests pass and the type check is clean.

## Task 2: the filters live in the address (`src/CleanupLog.tsx`)

The two filters are in `useState`: a reload, a shared link or Back forgets them. Read them from `?status=` and
`?site=` with `useSearchParams` and `readChoice` (anything not allowed, like `?status=banana`, means "all"), and
write them with `setSearchParams` and `withParams`, so choosing a site keeps the status. A choice is a new
history entry: Back undoes it. Clear filters empties the search. Predict: what does the address look like after
Clear filters? Done when the Task 2 tests pass.

## Task 3: the chosen cleanup, beside the list (`src/routes.tsx`, `src/CleanupLog.tsx`)

Give `/log` two children: an index route with the hint `<p>Pick a cleanup to see its details.</p>` and
`:cleanupId` with `<CleanupDetails />`. Render `<Outlet />` in `CleanupLog` above the count, and write
`CleanupDetails` with `useParams<'cleanupId'>()`: the title as an `<h2>` and `site name · Status` under it, or the
`<h2>` `No cleanup called <id>`. Last, the titles' links: on `/log?status=completed`, opening a cleanup must keep
`?status=completed`. Done when `npm test` says `Tests  8 passed (8)`, `npm run typecheck` prints nothing after its
two `>` lines and `npm run lint` says `Found 0 warnings and 0 errors.`

**Stretch:** misspell the parameter in `CleanupDetails` (`useParams<'cleanupId'>()` but read `cleanupID`), run
`npm run typecheck`, and compare with `useParams()` without a type argument. Then add a `paths.ts` with
`logEntry(id)` built by `generatePath('/log/:cleanupId', { cleanupId: id })` and misspell the name there: what does
tsc say, and what does it still not know?
