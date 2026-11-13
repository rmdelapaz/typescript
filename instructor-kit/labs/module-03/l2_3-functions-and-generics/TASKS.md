# Lab 2.3: the crew's shift helpers

New practice on Lesson 2.3's ideas (your `ts-lab/functions.ts` has the lesson's cleanup and volunteer helpers;
this lab types helpers for volunteer SHIFTS). `npm test` runs, `npm run check` checks.

**Setup (once):** a terminal in `labs/module-03/l2_3-functions-and-generics/starter`, then `npm install`.
**Run:** `npm test` (all five tests fail with `TODO`) and `npm run check` (parameters without types, and five
`@ts-expect-error` lines at the end of `lab.test.ts` that should be errors and are not yet).

## Task 1: a function's contract (`hoursLine`, `totalHours`)

`hoursLine(shift)` gives `Maya Okafor: 3h`; its options object can ask for the role (`{ showRole: true }`) or another
unit (`{ unit: ' hours' }`). Write the options as an interface with two optional properties, destructure them in the
parameter list with defaults (and `= {}` so the whole object may be left out), and write the return type.
`totalHours` takes any number of hours: a rest parameter. Done when the Task 1 tests pass and the check accepts the
`showRol` and `'2.5'` lines as errors.

## Task 2: a function type (`ShiftFormatter`, `formatAll`)

Replace `unknown` with a function type: a function that takes a `Shift` and returns a `string`. `formatAll` applies
it to every shift (one line with `map`). Done when the Task 2 test passes and a formatter returning a number is an
error.

## Task 3: three generic helpers (`lastOf`, `sumBy`, `indexById`)

`lastOf` returns the last item of ANY list, or `undefined` for an empty one (be honest in the return type).
`sumBy(items, valueOf)` adds up a number taken from each item. `indexById(items)` returns a `Map` from each item's
`id` to the item: it needs a constraint, because not every type has an `id`. Done when `npm test` ends with
`ℹ fail 0` and `npm run check` prints nothing after its two `>` lines.

**Stretch:** `groupByRole(shifts)` returning `Map<ShiftRole, Shift[]>`, then make it generic:
`groupBy<T, K>(items: T[], keyOf: (item: T) => K): Map<K, T[]>`. Hover a call: which types did TypeScript infer
for `T` and `K`?
