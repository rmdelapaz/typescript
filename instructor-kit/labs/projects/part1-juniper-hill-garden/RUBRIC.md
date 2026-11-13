# Juniper Hill Community Garden: Plot Board rubric (Part 1 project)

React + TypeScript: Build a Modern Web App, Part 1 (Sessions 1 to 9). Each row scores 0 (not yet), 1 (meets) or
2 (strong), the same scale as the final project's rubric (Lesson 11.1). The project is **complete** when no row is
"not yet". You use this sheet to assess yourself in Session 9, a classmate uses it in the demo, and your instructor
scores with it after the hand-in.

| # | Criterion | Not yet (0) | Meets (1) | Strong (2) |
|---|---|---|---|---|
| 1 | **Types and data** | `any`, `as` to silence an error, or types that do not match `src/data/plots.ts` (`npm run typecheck` fails) | Unions for `BedKind` and `PlotStatus`; `Plot` describes the data exactly (the optional `gardener` included); `Record` tables for every label and tone; `npm run typecheck` prints no error | Doc comments on the types; can show that adding a status to the union makes tsc list every table that needs it; no value stored that can be computed |
| 2 | **Components and props** | One large component, or props without a typed interface | `PlotCard`, the filters and the board are separate components with typed props; the given `Badge` and `VisuallyHidden` are reused, not copied | Small components a teammate can read; callbacks named for what happened (`onStatusChange`); nothing passed down that a component does not use |
| 3 | **Lists, state and events** | Tests D fail, keys from the index, or the visible list or its count kept in state | Keys from `plot.id`; two pieces of filter state; the list and the count derived on every render; the details toggle with `aria-expanded`; Clear filters resets both | Select values narrowed with a type guard before they reach state; the empty state worded for people |
| 4 | **A form with actions** | Tests E fail, or errors that only show in the console | `useActionState` with a state union; `FormData` read as text and checked by a pure `validateRequest`; each message under its field with `aria-invalid` and `aria-describedby`; the confirmation in the status line | What the person typed is kept after an error (`defaultValue`, the select's `key`); can explain why the action returns a new state instead of setting several states |
| 5 | **Styling and accessibility** | Unlabeled controls, a `div` with `onClick`, focus that disappears, or component styles in `index.css` | A CSS Module per component (camelCase classes); tokens and the focus ring stay in `index.css`; `npm run lint` reports 0 warnings and 0 errors with jsx-a11y on; every button name makes sense out of context | A keyboard pass and a 390 px check written down; light and dark mode both readable |
| 6 | **Checks and explanation** | Tests or the build fail, or cannot say what a line of their own code does | `npm test`, `npm run typecheck`, `npm run lint` and `npm run build` all pass; a 3-minute demo: one plot from the data file to its card, and one request from the form to the status line | Names one decision and its alternative (derive or store; a `Record` or a `switch`; one board component or several) and when each wins |

Total: ____ / 12      Rows at "not yet": ____

**Part 1 result.** Part 1 met = the Plot Board project complete under its rubric (no row at 0) AND the Part 1 assessment met (14 or more of 20 points, 70 %). A row at 0 is not a fail: it is the list of what to fix before you hand in again.
