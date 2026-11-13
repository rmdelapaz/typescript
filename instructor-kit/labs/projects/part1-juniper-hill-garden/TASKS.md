# Part 1 project: Juniper Hill Community Garden, the Plot Board

**The client.** Juniper Hill Community Garden is a volunteer-run garden with twelve plots: raised beds, plots in the ground and
benches in the greenhouse. Every spring the volunteers answer the same questions by email: which plots are free,
how big and how sunny they are, and how to ask for one. They want one page that answers all of it: a board of the
season's plots that people can filter, and a form to request a plot.

**What you build.** A small React + TypeScript app from LOCAL typed data (`src/data/plots.ts`: no API, no server).
It uses only Part 1: types and unions (Module 2), components, props, lists, state and events, a form with an action,
CSS Modules and accessibility (Module 3). Kicked off in Session 8, checked in and demonstrated in Session 9, handed
in a week after Session 9. Rubric: `RUBRIC.md` (12 points, complete = no row at 0).

## Setup (10 minutes)

1. Copy `starter/` to a folder of its own NEXT TO the course app, for example `shoreline/juniper-hill/` (never
   inside `shoreline-hq/`). Open that folder in VS Code.
2. `npm install` once (React 19.3, Vite 8.3, TypeScript 7.0, Vitest 5, oxlint 1.93: the course's versions).
3. `npm run dev` shows the page at the address Vite prints (three TODO lines for now). Keep it running.
4. In a second terminal: `npm test` (the tests in `src/project.test.tsx`, do not edit them) and
   `npm run typecheck` (tsc). As handed out, the tests fail with `TODO` messages and tsc reports errors.

Given, so you can concentrate on the TODOs: the page around your components (`App.tsx`), the data, `index.css` (the
garden's tokens and the focus ring), `Badge`, `VisuallyHidden`, `FieldError`, and the shared `Form.module.css` and
`Button.module.css`.

## TODO A: the domain (`src/types.ts`)

Describe the data in `src/data/plots.ts` exactly. `BedKind` is `'raised' | 'ground' | 'greenhouse'`, `PlotStatus`
is `'open' | 'assigned' | 'resting'`, `Plot` has every property the data has (one of them is not on every plot), and
`PlotRequest` holds `name`, `email`, `bed` (a `BedKind`) and `householdSize` (a number). Done when
`npm run typecheck` no longer reports `src/data/plots.ts` and the test file's `@ts-expect-error` line is used.

## TODO B: labels, tones and the filter (`src/utils/labels.ts`)

`bedLabels`: Raised bed, Ground plot, Greenhouse bench. `statusLabels`: Open, Assigned, Resting. `statusTones` (for
the given `Badge`): open `success`, assigned `info`, resting `neutral`. `isBedKind(value)`: a type guard.
`filterPlots(plots, status, bed)`: the plots that match both (either can be `'all'`), in order. `countLine(5, 12)`:
`Showing 5 of 12 plots`. Done when both `TODO B` tests pass.

## TODO C: the plot card (`src/components/PlotCard.tsx` + `PlotCard.module.css`)

An `<article>` with: the heading `Plot 3` (an `h3`); two badges, the bed's label (tone `neutral`) and the status's;
the line `32 sq ft · 6 hours of sun`; `Gardener: Sam Okafor` for plots that have one; a button that shows and hides
the notes, with `aria-expanded`, whose name makes sense out of context: `Show details for Plot 3` (visible
`Show details`, the rest in `VisuallyHidden`). In jsdom, put the space between them OUTSIDE the hidden text:
`Show details{' '}<VisuallyHidden>for Plot 3</VisuallyHidden>`. Its own CSS Module: no styles in `index.css`.

## TODO D: the board (`src/components/PlotBoard.tsx`, and a `PlotFilters` component if you like)

Two `<select>`s labeled `Status` (All statuses, Open, Assigned, Resting) and `Bed` (All beds and the three labels),
a `Clear filters` button while a filter is set, the count line in a `<p role="status">`, then the cards in a list
(`key` = the plot's id) or `No plots match these filters.` The visible list and the count are worked out on every
render, never stored.

## TODO E: the request form (`src/utils/requestForm.ts` + `src/components/RequestForm.tsx`)

Fields (label: `name`): `Your name` (`name`), `Email` (`email`), `Kind of plot` (`bed`, a select with `Choose one`
and the three bed labels), `People in your household` (`householdSize`), a checkbox `I have read the garden rules`
(`rules`, value `yes`), and the button `Send request`. Lesson 3.5's pattern: `<form action={formAction} noValidate>`,
`useActionState` with a state union, a pure `validateRequest(values)` with exactly these messages:

| Field | When | Message |
|---|---|---|
| name | empty / under 2 / over 60 characters | `Enter your name.` / `Use at least 2 characters for your name.` / `Keep your name to 60 characters or fewer.` |
| email | empty / not like `name@example.org` | `Enter your email address.` / `Enter an email address like name@example.org.` |
| bed | not one of the three kinds | `Choose a kind of plot.` |
| householdSize | not a whole number from 1 to 8 | `Household size must be a whole number from 1 to 8.` |
| rules | not ticked | `Agree to the garden rules to send a request.` |

Each message under its field (the given `FieldError`), the field with `aria-invalid` and `aria-describedby`. A
valid request puts `Thank you, Rosa. We will email rosa@example.org when a greenhouse bench opens up.` in a
`<p role="status">` above the form (the bed's label in lower case).

## Done when

```
npm test             Tests  12 passed (12)
npm run typecheck    no output after its two > lines
npm run lint         Found 0 warnings and 0 errors.
npm run build        ends with ✓ built in
```

and the page works with the keyboard alone, at 390 px wide, in light and dark mode.

## Milestones

| When | What |
|---|---|
| End of Session 8 (kickoff) | Setup done; TODO A in class; TODO B started |
| Before Session 9 | TODO B, C and D; TODO E started |
| Session 9 (check-in) | Show one rubric row you are proud of and one you are stuck on; a 3-minute demo |
| One week after Session 9 | Hand in: the folder zipped WITHOUT `node_modules` and `dist` (or a repository link), and your journal entry |

## Stretch (not required for "meets")

A third filter (sunny plots: 7 hours or more) kept in the same derived pattern; a `PlotStatus` of your own added to
the union, with tsc showing you every table to update; a summary line per bed (`Raised beds: 2 open of 4`); a
declaration file `PlotCard.module.d.css.ts` (Lesson 3.6, Exercise 3) so a misspelled class becomes a type error.

## Journal (hand it in with the project)

One plot from the data file to its card: which types, components and props does it pass through? Which of your
values are derived and which are state, and why? One accessibility problem you found yourself (keyboard, names,
contrast) and how you fixed it.
