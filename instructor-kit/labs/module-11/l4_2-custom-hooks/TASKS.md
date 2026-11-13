# Lab 4.2: three Hooks of your own

New practice on Lesson 4.2's ideas, outside the course app (the lesson's own project puts useApi,
useDebouncedValue and useDocumentTitle into the HQ). Requests in the tests are answered by MSW with answers saved
from the real shoreline-api (`../fixtures/`); the timer test uses Vitest's fake timers, so no test waits for real.

**Setup (once):** a terminal in `labs/module-11/l4_2-custom-hooks/starter`, then `npm install`.
**Run:** `npm test` (as shipped, all six tests fail; the Task 3 tests count more than twenty requests where one is
enough) and `npm run typecheck` (as shipped, errors for Tasks 1 and 2).

## Task 1: a tuple that keeps its types (`src/useBagCount.ts`)

`useBagCount(start)` returns `[bags, addBag, reset]`, like `useState`. Write `reset`. Then run `npm run typecheck`:
the test's `TypeChecks` component cannot call `addBag()`, because TypeScript inferred an array of
`number | (() => void)`, not a tuple. Two words at the end of the return fix it. Done when the two Task 1 tests pass
(the second one proves that two volunteers' counts never mix: Hooks share logic, never state).

## Task 2: a generic Hook with a timer (`src/useRotatingTip.ts`)

`useRotatingTip(items, intervalMs)` returns one item, the next one every `intervalMs`, starting again after the
last; `undefined` for an empty list (no timer at all then). Make it generic (`<T>`), so a list of strings gives a
string and a list of numbers a number: the test file's `@ts-expect-error` line needs exactly that. Start the timer
in an effect, stop it in the cleanup (the test checks that no timer is left after unmount). Which values go in the
dependency array? Done when the two Task 2 tests pass.

## Task 3: a data Hook that does not flood the server (`src/useLoadedCount.ts`)

As shipped, `useLoadedCount(key, load)` has `load` in its dependency array, and the test's `Counter` passes an
inline arrow (a new function on every render): run the Task 3 tests and read how many requests the first one
counted (the test's pretend server gives up after twenty). Make the key decide when to load: read `load` through `useEffectEvent`, keep `[key, attempt]` in the
array, and make `reload` count one more attempt. Done when `npm test` ends with `Tests  6 passed (6)` and
`npm run typecheck` prints nothing after its two `>` lines.

**Stretch:** give `LoadedCount` an `updating: boolean` that is true while the count shown belongs to an older key
(Lesson 4.2, Exercise 3's idea: remember the key the data was loaded for).
