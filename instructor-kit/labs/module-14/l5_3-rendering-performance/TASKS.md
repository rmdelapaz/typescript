# Lab 5.3: count the work, then remove it

New practice on Lesson 5.3, on three small screens instead of the HQ: a shift roster, a log board with a sort
order in context, and a weight report. Each has a note box, and typing in it makes React do work for nothing. The
tests COUNT that work: `vi.mock` in `src/lab.test.tsx` wraps a component or function from another file and counts
each call, the way the Profiler shows which components rendered. You change only the files with a `TODO`.

**Setup (once):** a terminal in `labs/module-14/l5_3-rendering-performance/starter`, then `npm install` (React,
Vitest, oxlint and the React Compiler packages from Lesson 5.3, for this folder only). Then `npm test`: three tests
fail with a `TODO` message, each saying how many times something was drawn or added up while you typed.

## Task 1: memo needs a stable function (`src/CrewRoster.tsx`)

`RosterList` is wrapped in `memo`, yet typing four letters in the note draws all three rows four times (12). Find
the prop that is new on every render and keep it the same function between renders. Use the updater form of
`setPresent`, so the function needs nothing from the render it was made in. The first test checks that two marks
in a row both stay.

## Task 2: a context value that stays put (`src/SortOrderProvider.tsx`)

`SortToggle` is in `memo` and takes no props, yet it renders on every key press. Why does memo not help here?
Make the provider's value the same object until `order` changes. Done when `npm test` reports no `TODO 2` failure
and the button still switches between Newest first and Oldest first.

## Task 3: skip a calculation (`src/WeightReport.tsx`)

`totalsByBeach` adds up every log on every render. Keep its result until `logs` changes. Watch the third test: a
new array of logs must still be added up again (what would an empty dependency array do?).

Done when `npm test` ends with `Tests  7 passed (7)`, `npm run typecheck` prints nothing after its two `>` lines and
`npm run lint` says `Found 0 warnings and 0 errors.`

## Stretch 1: let the compiler do it

Copy the untouched `starter` folder from the handout to `starter-compiler` (next to `starter`), run `npm install`
there and then `npm run test:compiler`. It runs the same tests through `vite.compiler.config.ts`, which turns on the
React Compiler exactly as Lesson 5.3 does for the HQ. Predict first: which of the three TODO tests pass without a
single Hook? Then run `npm run test:compiler` in your finished `starter` too.

## Stretch 2: the debug handout

`debug_stale_roster.tsx` (in this lab's folder) "fixes" a toggle with `useCallback` the wrong way. Copy it into
`starter/src/` as `StaleRoster.tsx`, run `npm run lint` and read the warning. Predict what the page shows after you
click Ana Lima and then Ben Okafor, then fix it with the updater form. Delete the copy when you are done.
