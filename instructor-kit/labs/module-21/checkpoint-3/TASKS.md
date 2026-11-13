# Checkpoint 3: server state and forms (Modules 7 and 8)

30 minutes in class, on your own, notes and the lesson pages allowed. Two code tasks against tests you are given
(`src/checkpoint.test.ts`, do not edit), then four written questions in your workbook. A small app about volunteer
shifts, not shoreline-hq: `src/api.ts` (fetch) and `src/types.ts` are written.

**Run:** a terminal in `starter/`: `npm install` once (your instructor may have done it), then `npm test` and
`npm run typecheck`. As shipped, the tests fail with `TODO C1` and `TODO C2`.

## C1: the form schema (Lesson 8.1), `src/schemas.ts`

`shiftFormSchema` for the "Add a shift" form, whose values all arrive as text:

- `volunteer`: trimmed, at least 2 letters: `Add a name (2 letters or more).`
- `date`: `YYYY-MM-DD`: `Pick a date.`
- `hours`: text in, a whole number from 1 to 12 out; every way it can be wrong (`'0'`, `'13'`, `'2.5'`, `'lots'`)
  gives the one message `Hours must be a whole number from 1 to 12.`

Keep the two exported types: `z.input` is what the form holds, `z.output` what the API gets.

## C2: the query factory and the mutation (Lessons 7.1 and 7.2), `src/queries.ts`

- `shiftsQuery(siteId)`: `queryOptions` with the key `['shifts', siteId]` and `getShifts(siteId)`.
- `addShiftMutation()`: `mutationOptions` that sends the shift with `postShift` and, on success, invalidates every
  query whose key starts with `'shifts'` (every site's list, not only the one you are looking at).

Done when `npm test` shows `Tests  8 passed (8)` and `npm run typecheck` prints nothing after its two `>` lines.
Then the written questions W1 to W4 in your workbook.
