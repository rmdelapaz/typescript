# Lab 8.2: the supply checkout

New practice on Lesson 8.2: before a cleanup, the team lead writes down what they take from the supply shed: as
many rows as needed (an item and how many), each item once, and a photo or scan of the signed sheet.
`src/supplies.ts` (the five items and their labels) is given.

**Setup (once):** a terminal in `labs/module-20/l8_2-complex-forms/starter`, then `npm install`.
**Run:** `npm test` and `npm run typecheck`. As shipped, 9 of the 10 tests fail and the type check reports the
test's "checked data" line.

## Task 1: a list in a schema (`schemas.ts`)

- A count: check the text first (`.trim().regex(/^\d+$/, …)`), then `.transform(Number)` and a 1 to 200 rule, all
  with `Count must be a whole number from 1 to 200.` Not `z.coerce`: an empty box would quietly become 0.
- Each item once: `.superRefine` on the array, `context.addIssue` with `path: [index, 'item']` and
  `LABEL is already in the list: add to its count.` on the REPEATED row. Give it `when`, so it runs while a count is
  still wrong (the fourth test).

## Task 2: rows that come and go (`CheckoutForm.tsx`)

`useFieldArray({ control, name: 'rows' })`, rows keyed by `field.id`. **Add a row** appends the first item not in the
list yet (`getValues('rows')`) and puts the cursor in its count (`focusName`); **Remove row N** removes it and puts
the focus on Add a row (a ref). The labels already say which row.

## Task 3: the signed sheet (`checkSheet.ts`)

JPEG, PNG or PDF, up to 2 MB: `sheet.gif is not a JPEG, PNG or PDF file.` and
`scan.pdf is 2.5 MB. Sheets must be 2 MB or smaller.` (one decimal). Why check at all, when the file box can say
`accept="image/jpeg,image/png,application/pdf"`?

Done when `npm test` says `Tests  10 passed (10)` and `npm run typecheck` prints nothing after its two `>` lines.
**Stretch:** an error summary above the form (Lesson 8.2's `ErrorSummary` pattern): `key={submitCount}`,
`shouldFocusError: false`, one link per problem, `Row N:` in front of row messages.
