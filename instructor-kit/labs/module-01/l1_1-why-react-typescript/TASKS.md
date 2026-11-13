# Lab 1.1: describe real data, read the compiler

New practice on Lesson 1.1's ideas (the lesson's own project is in the TypeScript Playground; this lab runs on
your computer). Node 24 runs the `.ts` files directly (it removes the types, like `node spots.ts` in the lesson);
`npm run check` runs `tsc --noEmit`, which CHECKS them.

**Setup (once):** a terminal in `labs/module-01/l1_1-why-react-typescript/starter`, then `npm install`.
**Run:** `npm test` (runs the tests) and `npm run check` (type-checks everything). As shipped, five tests fail
with a `TODO` message, and the check reports four errors: three in `bags.ts` (Task 2) and one in `lab.test.ts`
(Task 3: read it, but fix it in `events.ts`).

## Task 1: a cleanup, as the API sends it (`events.ts`)

Open `../fixtures/events.json` (the real answer of `GET /api/events`, saved from the course API). Write the
`CleanupEvent` interface with at least `id`, `title`, `status`, `date`, `startTime`, `endTime`, `capacity` and
`spotsTaken`, then `summary(event)`:

```
Storm Debris Sweep (completed), 09:00 to 12:00: 10 spots left
```

Done when the two Task 1 tests pass. Type `event.` inside `summary` in VS Code: the list you see comes from your
interface.

## Task 2: three mistakes, three messages (`bags.ts`)

Run `npm run check`. It reports three errors in `bags.ts`. For each, write down the line, the error code and the
cause in your own words (the workbook has a table), fix the line, run the check again. Do not change the interface.
(Which weight you give Pelican Point Beach is up to you.) Done when `npm run check` reports nothing in `bags.ts` and
the Task 2 tests pass.

## Task 3: only four words (`events.ts`)

Make `EventStatus` the four words a status can be, use it for `status` in `CleanupEvent`, and write
`statusLabel(status)` (`'scheduled'` gives `'Scheduled'`). The last lines of `lab.test.ts` assign `'canceled'`
(one L) to an `EventStatus` and say they EXPECT an error: while `EventStatus` is `string`, the check complains that
no error happened. Done when `npm test` ends with `ℹ fail 0` and `npm run check` prints nothing after its two
`>` lines.

**Stretch:** add `suppliesProvided` to the interface (an array of text: how do you write that type?) and make
`summary` add `, bring nothing` when the list is empty.
