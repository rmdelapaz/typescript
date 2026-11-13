# Lab 5.2: three contexts

New practice on Lesson 5.2's ideas, away from the HQ: a context with a sensible default, a context with none (the
undefined trap), and a provider that owns its state, in a file of its own.

**Setup (once):** a terminal in `labs/module-13/l5_2-typed-context/starter`, then `npm install`.
**Run:** `npm test` (runs the tests), `npm run typecheck` (`tsc --noEmit`, checks the types), `npm run lint`
(oxlint with the course app's rules). As shipped, all five tests fail, the type check reports one error and the
linter one warning.

## Task 1: a channel with a default (tides in meters or feet)

`src/tides/heightUnit.ts` already creates `HeightUnitContext` with the default `'m'`. Two things are missing:
`TideHeight` must READ the unit (`useContext`, no prop) and show `1.5 m` or `4.9 ft` (1 m = 3.28 ft, one decimal),
and `TideBoard` must PROVIDE its `unit` state around everything in its section, so one click on Show feet changes
both rows. `TideRow`, in between, does not change: the unit skips it. Done when the two Task 1 tests pass.

## Task 2: no sensible default (the undefined trap)

Who leads today's shift at the supply shed has no sensible default. `src/shift/ShiftContext.ts` papers over it with
a "harmless" default object, so a component outside a provider silently does nothing. Fix it the lesson's way: the
context's type is `ShiftValue | undefined` with `undefined` as its default, and `useShift()` throws
`useShift() must be used inside <ShiftProvider>` when there is no provider, and otherwise returns a `ShiftValue`.

Check it twice: the Task 2 test, and `npm run typecheck`. The test file holds a component that reads the context
directly under a `@ts-expect-error` line; while the context cannot be undefined, tsc reports that line as unused
(TS2578). Done when that error is gone. (Predict first: after Task 2, the Task 3 tests fail with a different
message. Which one, and why is that good news?)

## Task 3: the provider owns the state, in its own .tsx

`ShiftProvider` keeps the lead in `useState` (nobody at first), and provides `{ lead, startShift, endShift }` with
`<ShiftContext value={...}>`. Then run `npm run lint`: oxlint warns because `ShiftProvider.tsx` also exports a
function, `leadLabel` (Fast Refresh can only update a file that exports components). Move `leadLabel` to
`ShiftContext.ts` and change the import in `ShiftBanner.tsx`.

**Done when** `npm test` ends with `Tests  5 passed (5)`, `npm run typecheck` prints nothing after its two `>` lines,
and `npm run lint` says `Found 0 warnings and 0 errors.`

**Stretch:** add a third row to `TideBoard`, `<TideRow label="Harbor mark" meters={2} />`, OUTSIDE the provider, and
predict what it shows after Show feet. Then: could `useShift()` use `use(ShiftContext)` instead of `useContext`?
What would change?
