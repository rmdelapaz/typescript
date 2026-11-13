# Lab 2.2: the supply shed's gear

New practice on Lesson 2.2's ideas (your `ts-lab/shapes.ts` describes sites and cleanups; this lab describes the
gloves, grabbers, buckets and vests the crew lends out). Same rhythm as your `ts-lab`: `npm test` runs,
`npm run check` checks.

**Setup (once):** a terminal in `labs/module-02/l2_2-shaping-data/starter`, then `npm install`.
**Run:** `npm test` (four tests fail, two of them with `TODO 2`) and `npm run check` (the tests read an `id` the
empty interface does not have, the checkout line reads properties not every checkout has, and the type tests at
the end of `lab.test.ts` say they expected errors that did not happen).

## Task 1: describe the gear (`gear.ts`, the types)

Make `GearKind` exactly the four words, and write `GearItem` from the list below it: `id`, `name`, `kind`, a `size`
that some items do not have (S, M or L), and `checkedOutTo`, which is a name or `null` when the item is on the
shelf. Annotate nothing else: the list is already typed `GearItem[]`. Done when `npm run check` reports nothing
in `gear.ts` and the three `@ts-expect-error` lines at the end of `lab.test.ts` are accepted (a shovel, an XL and a
size read as if it were always there must all be errors).

## Task 2: handle every case (`holder`, `sizeLabel`, `stockLine`)

`holder` gives the name, or `on the shelf`; `sizeLabel` gives the size, or `one size`. Use the lesson's null
toolkit, not `!`. `stockLine` already runs, but the test with 0 grabbers left fails: find out why, and fix it with
one operator. Done when the Task 2 tests pass.

## Task 3: three kinds of checkout (`checkoutLine`)

A checkout is out (with whom, since when), returned (in good or damaged condition) or lost. `npm run check` says the
current `checkoutLine` reads `who` from a checkout that may not have one. Narrow on `kind` and return the four lines
the test expects. Done when `npm test` ends with `ℹ fail 0` and `npm run check` prints nothing after its two `>`
lines.

**Stretch:** write `kindFrom(value: unknown): GearKind | null` for a kind read from a saved form: `typeof` first,
then compare with each of the four words. Which of Lesson 2.2's narrowing tools did you use?
