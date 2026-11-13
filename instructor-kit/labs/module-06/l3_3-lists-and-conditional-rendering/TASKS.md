# Lab 3.3: lists, lookup tables and unions

New practice on Lesson 3.3's ideas, outside the course app. `src/data/report.ts` is the real impact report of a
completed cleanup (saved from `GET /api/events/e01/impact`, typed with the API's own `ImpactReport`): ten debris
counts in the API's order.

**Setup (once):** a terminal in `labs/module-06/l3_3-lists-and-conditional-rendering/starter`, then `npm install`.
**Run:** `npm test` and `npm run typecheck`. As shipped, five of six tests fail and the type check reports one
error in the test file (Task 2). Never edit `lab.test.tsx`.

## Task 1: the counts, biggest first (`src/DebrisList.tsx`)

Sort the counts biggest first WITHOUT changing the array you were given (the test checks the report afterwards:
which method returns a new array?), show each count with its label from `debrisLabels` (`Cigarette butts: 241`),
keep the key on the element `map` returns, and draw `<p className="empty-state">Nothing counted yet.</p>` when the
list is empty (an early return). Done when the two Task 1 tests pass.

## Task 2: a table TypeScript keeps complete (`src/labels.ts`)

Type `debrisLabels` with the debris category union from `./api/types.ts` instead of `string`, then let the errors
tell you what to add: every category, worded like the API's own labels (the test lists them). The last lines of the
test file EXPECT `debrisLabels.straws` to be an error: while the table is keyed by any string, tsc says the directive
is unused (TS2578). Done when the Task 2 test passes and `npm run typecheck` is silent.

## Task 3: a union decides what to draw (`src/TideBanner.tsx`)

The banner has two bugs that neither `npx tsc` nor a linter reports. Run the tests, read what the page shows for a
`go` call with nobody waiting, and for a `cancelled` call, then fix both: a real boolean on the left of `&&`, and a
`case` for every kind (a cancelled call is `<p role="alert">Cancelled: REASON</p>`). Done when `npm test` says
`Tests  6 passed (6)`.

**Stretch:** add a `{ kind: 'moved'; siteName: string }` call. Before you add its case, run `npm run typecheck`:
does anything tell you the switch is incomplete? (Lesson 5.1's `never` check will.)
