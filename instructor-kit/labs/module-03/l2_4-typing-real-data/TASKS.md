# Lab 2.4: the crew's impact numbers, checked at the door

New practice on Lesson 2.4's ideas (the lesson's project checks cleanups in the HQ's `client.ts`, and its exercises
check sites; this lab checks the crew's IMPACT TOTALS). `fixtures/impact.json` and `fixtures/meta.json` are the real
answers of `GET /api/impact` and `GET /api/meta`, saved from the course API; `starter/types.ts` is the API's own
`ImpactTotals`, `Meta` and `DebrisCategory`, copied from `shoreline-api/core/types.ts` (do not edit it).

**Setup (once):** a terminal in `labs/module-03/l2_4-typing-real-data/starter`, then `npm install`.

## Task 1: share types between files (`impact.ts`, line 3)

Run `npm test`: it cannot even start, because Node cannot import a type at run time. Then `npm run check`: TS1484
says why, once per name. Fix the one line the way the lesson did. Done when `npm test` runs the tests (four of them
fail with `TODO`) and the TS1484 errors are gone.

## Task 2: type guards (`isDebrisCategory`, `isImpactTotals`)

`isDebrisCategory` already works at run time, but it returns a plain `boolean`, so `knownCategories` cannot prove
its result is `DebrisCategory[]` (read the check's error). Change only its return type. Then write
`isImpactTotals`: a guard for the whole answer (an object, not null, not an array; every number; the `from` and
`to` dates as text or null; a count for EVERY category; the two lists and their rows). The tests feed it the real
answer and three broken ones. Done when the Task 2 tests pass.

## Task 3: types from types (`Headline`, `CategoryCounts`, `CountsEdit`)

Write the three types with `Pick`, `Record` and `Partial` (no property by hand), then `headline` and `addCounts`
(a NEW object: copy `counts` with `{ ...counts }`, then add each category's extra, `?? 0` for the ones the edit
leaves out). Done when `npm test` ends with `ℹ fail 0` and `npm run check` prints nothing after its two `>` lines.

**Stretch:** `labelOf(meta: Meta, category: DebrisCategory): string` from `meta.debrisCategories` (what does `find`
return when nothing matches?), then print the three biggest categories of the real totals with their labels.
