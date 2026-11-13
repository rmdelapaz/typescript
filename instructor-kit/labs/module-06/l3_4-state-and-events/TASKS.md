# Lab 3.4: state, events and where state lives

New practice on Lesson 3.4's ideas, outside the course app. The tests click, pick and type like a person
(Testing Library's user-event). `src/data/sites.ts` holds the six real beach sites.

**Setup (once):** a terminal in `labs/module-06/l3_4-state-and-events/starter`, then `npm install`.
**Run:** `npm test` and `npm run typecheck`. As shipped, four of five tests fail and the type check reports
errors in `ShiftPicker.tsx`. Never edit `lab.test.tsx`.

## Task 1: copy, don't change (`src/ShiftPicker.tsx`)

Click Join in the tests' place: nothing happens on the page. Two bugs: `useState([])` (read what tsc says about
`never`) and `push` on the array React already holds (React compares the old and new value: same array, nothing to
redraw). Give the state a type argument and update it with an updater function that returns a NEW array: one more id
for Join, one less for Leave. Done when the two Task 1 tests pass and `npm run typecheck` is silent.

## Task 2: lift the state up (`src/TerrainFilter.tsx`, `src/SiteFinder.tsx`)

The menu keeps its own state, so the list beside it never hears about it. Make `TerrainFilter` controlled (props
`value: TerrainChoice` and `onChange: (choice: TerrainChoice) => void`, no `useState`), check the select's string
with `isTerrain` before passing it up (no `as`), and give `SiteFinder` the state with `useState<TerrainChoice>`.
Work the visible sites out on every render. Done when both Task 2 tests pass.

## Task 3: one keystroke behind (`src/SupplySearch.tsx`)

Type `gl` and the count says 4: it was filtered with the text from BEFORE the last keystroke. Do not fix the update;
remove the second piece of state and derive the matches. Done when `npm test` says `Tests  5 passed (5)` and
`npm run typecheck` prints nothing after its two `>` lines.

**Stretch:** add a "Clear" button to `SiteFinder` that appears only while a terrain is picked (`&&` with a real
boolean) and puts the menu back to "All terrains". Which component owns the click, and which one changes?
