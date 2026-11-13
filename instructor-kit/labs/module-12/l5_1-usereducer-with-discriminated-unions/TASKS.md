# Lab 5.1: a debris tally with useReducer

New practice on Lesson 5.1's ideas, outside the course app (the lesson's own project is the check-in desk). A
reducer is a plain function, so the first two tasks are tested without rendering anything (Lesson 9.1 does the same
with the HQ's rosterReducer).

**Setup (once):** a terminal in `labs/module-12/l5_1-usereducer-with-discriminated-unions/starter`, then
`npm install`. **Run:** `npm test` (as shipped, all four tests fail) and `npm run typecheck` (as shipped, one error:
Task 3's old `useReducer<…>` line).

## Task 1: a pure reducer (`src/tallyReducer.ts`)

`counted` adds `count` items of one `kind` and remembers the count in the log; a count of 0 or less changes nothing,
so return the SAME state object (React then knows there is nothing to redraw). `reset` starts again. The counts are
a `ReadonlyMap`: `tally.counts.set(...)` does not compile, which is the point; copy first (`new Map(old)`), then
change the copy. Done when the two Task 1 tests pass.

## Task 2: let the compiler find the missing case (`src/tallyReducer.ts`)

The union already has an `undoLast` action, and the reducer ends with `default: return tally`, which swallows it
without a word. Replace that default with `return assertNever(action)` (`src/assertNever.ts` is given) and run
`npm run typecheck`: the error names the action nobody handles. Write its case: remove the newest log entry and
take its items back off the counts (nothing to undo: the same state). Done when the Task 2 test passes.

## Task 3: the panel (`src/TallyPanel.tsx`)

The `useReducer<Tally, TallyAction>(...)` line comes from an older article: React 19's types reject it (TS2344).
Delete the angle brackets: the reducer's annotations are enough. Then make `KindButtons` dispatch
`{ type: 'counted', kind, count: 1 }`, show `Items so far: N.` (worked out from the counts on every render), and add
`Undo last count` with `aria-disabled` while there is nothing to undo (a disabled button would lose the keyboard
focus). Done when `npm test` ends with `Tests  4 passed (4)` and `npm run typecheck` prints nothing after its two
`>` lines.

**Stretch:** a Redo (Lesson 5.1's Going Further): a second list of undone counts, thrown away by a new count. Write
the state type and the action first, and let `assertNever` show you where they go.
