# Lab 11.1: Types first on a new brief (Bramblekey Piano Service)

Lesson 11.1 starts every final project the same way: the types, the label tables, the values you will compute
instead of storing, and the one rule only the server can be trusted with, all before a single page. This lab is
that first hour on a brief that is NOT one of the seven, so your own project stays yours.

**The brief, in four lines.** Bramblekey Piano Service is one tuner with a van. Clients (some give only a phone
number) book a visit for a piano (upright, baby grand or grand). A visit goes requested, scheduled, tuned,
invoiced, paid, in that order. The bill is the tuning fee plus extras (parts, repairs), in cents. The tuner does at
most three visits a day.

## Set up (5 minutes)

You practise inside a fresh copy of the final-project kit's starter (Lesson 11.1, Step 3), never inside your own
project:

1. From `final-project-kit.zip`, copy the `starter` folder to a new folder `bramblekey-practice` (next to your
   course folder, for example), open a terminal in it and run `npm ci`.
2. Copy this lab's `starter/src/visits` folder into `bramblekey-practice/src/` (you get `src/visits/`).
3. Run the checks the way the lesson does: `npx tsc -b`, then `npx vitest run`. The starter's own 11 tests still
   pass; 9 of the 15 new ones fail with a `TODO` message, and `tsc` lists your to-do (TS2578 means "this line
   should be an error, and with your types it is not yet").

Edit only `types.ts`, `labels.ts`, `rules.ts` and `handlers.ts` in `src/visits/` (and, in Task 3, the two files
`tsc` sends you to). The `*.test.ts` files and `db.ts` are the brief: do not edit them.

## Task 1: the domain types (TODO 1)

In `src/visits/types.ts`: unions for `PianoKind` and `VisitStatus`; `null` for "known to be empty" (`email`,
`scheduledFor`); no stored `total`; `NewVisit` with `Pick` and `VisitChanges` with `Partial` of a `Pick`. Then the
two label tables in `labels.ts` as `Record`s. Run `npx tsc -b` after each change: the TS2578 lines in
`types.test.ts` disappear one by one.

## Task 2: computed, never stored (TODO 2)

In `src/visits/rules.ts`: `isVisitStatus` (look the value up in the label table with `Object.hasOwn`), the
`nextSteps` table, `visitTotal` (fee plus quantity times unit price for every extra, starting from 0) and
`isOverdue` (a scheduled visit whose day is before today; "YYYY-MM-DD" strings compare in calendar order).

## Task 3: the rule only the server can check (TODO 3)

In `src/visits/handlers.ts`, where the TODO 3 comment is: a tuned, invoiced or paid visit can't be rescheduled,
and a day holds at most `VISITS_PER_DAY` visits (not counting the visit itself). Both answer 409 with the error
code `'conflict'` and the messages in the comment. `'conflict'` is not an `ErrorCode` yet: add it to the union in
`src/api/types.ts` and let `npx tsc -b` tell you the one other place that has to learn about it.

## Done when

- `npx tsc -b` prints nothing
- `npx vitest run` ends with `Tests  26 passed (26)` (`npx vitest run src/visits` alone: 15)
- `npm run lint` reports `Found 0 warnings and 0 errors.`

**Stretch:** a `GET /api/visits?status=` filter that answers 400 for a status `isVisitStatus` refuses, with a test
for each side. **Clean up:** delete `bramblekey-practice` when you are done; your final project starts from its own
clean copy of the starter.
