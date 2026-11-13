# Lab 9.1: Tests for the volunteer thank-you card

New practice for Lesson 9.1 (Testing Components). The app code is written and works; **you write the tests**.
A small lab app, not shoreline-hq: `src/hours.ts` (hours worked, a badge from 10/25/50 hours, "1 hour"/"2.5
hours"), `src/VolunteerCard.tsx` (a thank-you card that needs `<CrewProvider>` around it) and `src/types.ts`.
Do not change those files, except in Task 3.

**Run:** a terminal in `starter/`: `npm install` once, then `npm test` (Vitest, once; `npx vitest` keeps watching)
and `npm run typecheck` (tsc: Vitest runs your tests without checking their types). As shipped, `npm test` fails
with `TODO 1` and `TODO 2`.

## Task 1: unit tests and a typed factory (`src/test/factories.ts`, `src/hours.test.ts`)

1. Write `makeShift(changes)`: a complete worked shift of 3 hours, with `changes` spread on top (`Partial<Shift>`).
2. Test these rules, one `it` each (replace the TODO tests):
   - `hoursWorked` adds up the hours of worked shifts (3 + 2.5 = 5.5); a planned or a missed shift counts 0
     (one `it.each(['planned', 'missed'] as const)`); no shifts is 0.
   - `badgeFor`: 0 and 9.5 hours none, 10 and 24.5 bronze, 25 silver, 50 gold (one `it.each` table; try it
     without `as const` and read `npm run typecheck`).
   - `formatHours`: `1 hour`, `2.5 hours`.
3. Make one test fail on purpose (change an expected value), read the message, put it back.

## Task 2: component tests and a render helper (`src/test/render.tsx`, `src/VolunteerCard.test.tsx`)

1. `renderWithCrew(ui, { crewName })`: renders `ui` inside `<CrewProvider>`; `crewName` optional, default
   `Shoreline Crew`, documented in a `RenderOptions` interface.
2. Test what a person sees, by role and name first: the card is an `article` named after the volunteer with a
   level-3 heading; `12 hours worked with Pelican Point Friends` and `Bronze helper`; a new volunteer (one
   planned shift) has `0 hours worked with Shoreline Crew`, no badge and no `Missed shifts` list (`queryBy`);
   missed shifts are listed with date and beach; the link named `Profile of Theo Nakamura` goes to
   `/volunteers/v04`; rendered WITHOUT the provider, the card throws `useCrewName must be used inside <CrewProvider>`.

## Task 3: prove your tests catch bugs

`../debug_hours.ts` and `../debug_VolunteerCard.tsx` each hide two bugs. Keep a copy of the real file, copy the
handout over it, run `npm test`, read which tests fail and why, then put the real file back:

```
cp src/hours.ts hours.ok.ts && cp ../debug_hours.ts src/hours.ts
npm test
cp hours.ok.ts src/hours.ts
```

Done when: each handout turns at least two of your tests red, and with the real files `npm test` passes and
`npm run typecheck` prints nothing after its two `>` lines. A bug none of your tests notices is a missing test.

**Stretch:** a test that the card shows `Gold helper` at exactly 50 hours with three shifts (13 + 20 + 17).
