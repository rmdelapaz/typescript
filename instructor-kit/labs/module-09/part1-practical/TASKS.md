# Part 1 assessment, practical: Juniper Hill work days (10 points, 30 minutes)

**Open book:** the lesson pages, your own code (Shoreline Crew HQ, your Part 1 project, the labs) and MDN. **Not
allowed:** chat assistants, classmates, copying a classmate's files. Work in `starter/` (installed at home).

The garden's volunteers sign up for work days. `src/types.ts` and `src/data.ts` are given; the tests are in
`src/practical.test.tsx` (do not edit it). Run `npm test` after each change and `npm run typecheck` before you
hand in: Vitest runs the code, only tsc checks the types.

## Task 1: the spots line (`src/workDays.ts`)

`spotsText(day)`: `4 spots left`, `1 spot left`, `Full` or `Cancelled`, from the day's status and spots.

## Task 2: the list and its filter (`src/WorkDayList.tsx`)

One `<li>` per day, `Compost turning, Saturday: 4 spots left`; a checkbox labeled `Hide full and cancelled days`
that keeps only the open days; and a line with `role="status"`: `Showing 3 of 6 work days`.

## Task 3: the sign-up form (`src/SignUpForm.tsx`)

A form with an action (`useActionState`): a field labeled `Your name` (`name="name"`) and a button `Sign up`. An
empty name shows `Enter your name.` under the field, linked to it (`aria-describedby`, `aria-invalid`). Otherwise a
line with `role="status"`: `Thanks, Ana: you are signed up for Compost turning.`

## Points

| Task | Points |
|---|---|
| Task 1: the spots line | 3 |
| Task 2: the list and its filter | 4 |
| Task 3: the sign-up form | 3 |
| **Total** | **10** |

Hand in: the `starter/` folder zipped without `node_modules` (or as your instructor asks), when the time is up.
