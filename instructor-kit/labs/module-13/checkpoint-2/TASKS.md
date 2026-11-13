# Checkpoint 2: Modules 4 and 5 so far (30 minutes, alone)

Three small pieces that use what Lessons 4.1 to 5.2 taught: a typed Hook that loads data in an effect, a reducer
on a discriminated union, and that reducer shared through a typed context. No server is needed: MSW answers the
requests with real shoreline-api answers saved in `src/fixtures.ts`.

**Setup:** a terminal in `labs/module-13/checkpoint-2/starter`, `npm install` once (start it at the break).
**Run:** `npm test` after every change, and `npm run typecheck` at the end. As shipped, all eight tests fail and
the type check reports two errors. Lesson pages and your own `shoreline-hq` are allowed (that is how developers
work); a neighbor's code is not.

## Task 1: `useSite` (Lessons 4.1 and 4.2, about 12 minutes)

In `src/useSite.ts`, write the Hook `useSite(apiUrl, siteId)`: it loads `${apiUrl}/api/sites/${siteId}` in an
effect and returns a `LoadState<Site>` (`./loadState.ts`): `loading` first; `failed` with the message
`Could not load the site (404).` (with the real status) when the answer is not ok; `ready` with the site when
`isSite` (`./isSite.ts`) accepts the JSON. It loads again when `siteId` changes, and the cleanup aborts the old
request. `SiteName.tsx` uses it; do not edit it. Done when the three Task 1 tests pass.

## Task 2: `tallyReducer` (Lesson 5.1, about 10 minutes)

In `src/tally.ts`, replace `TallyAction` with a discriminated union on `type`: `add` (with a `kind`), `undo`
(takes back the last bag added) and `reset`. Then write `tallyReducer`: one `case` per action, a new state object
each time, the SAME state when there is nothing to undo, and `assertNever(action)` (`./assertNever.ts`) in the
`default` case. Done when the three Task 2 tests pass and `npm run typecheck` no longer reports the two unused
`@ts-expect-error` lines (TS2578): your union now rejects an unknown action and an `add` without a kind.

## Task 3: share the tally (Lessons 5.1 and 5.2, about 8 minutes)

`src/TallyContext.ts` already creates a context that is `undefined` outside a provider. Write `useTally()` (the
nearest provider's value, or throw `useTally() must be used inside <TallyProvider>`) and, in
`src/TallyProvider.tsx`, a provider that keeps the tally in `useReducer(tallyReducer, initialTally)` and provides
`{ state, dispatch }`. `TallyPanel.tsx` uses both; do not edit it. Done when the two Task 3 tests pass.

**Done when** `npm test` ends with `Tests  8 passed (8)` and `npm run typecheck` prints nothing after its two `>`
lines. Write your last test summary line in the workbook. Out of time? Write which task you would do next and how.
