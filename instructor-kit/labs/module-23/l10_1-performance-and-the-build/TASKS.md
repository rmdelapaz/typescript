# Lab 10.1: Tide Watch on a diet

New practice for Lesson 10.1 (Performance and the Build). "Tide Watch" (not shoreline-hq) is a small Vite + React
app: a home page with the next cleanup's tide, and a button that opens two years of tide tables
(`src/tideData.ts`, about 170 kB of JavaScript). Today EVERY visitor downloads the tables. `budget.ts` (given, do
not edit) reads `dist/` the way a first visit does and checks four things.

**Run:** a terminal in `starter/`: `npm install` once, then:

```
npm test                          # Task 1's tests (Vitest)
npm run typecheck                 # tsc, including Task 1's type test
npx vite build && node budget.ts  # Tasks 2 and 3: the build, then the budget
npx vite preview                  # optional: open the app, Network tab, JS filter, Disable cache
```

As shipped: `TODO 1` in the tests, `TS2578` in the type check, and three `FAIL` lines in the budget.

## Task 1: a typed, formula-safe CSV (`src/csv.ts`)

Write `CsvColumn<Row>` and a generic `toCsv<Row>(rows, columns)` (Lesson 10.1, Step 4): numbers as they are, text
with a comma, a quote or a line break in `"…"` with each `"` doubled, text starting with `= + - @` (or a tab or a
carriage return) gets a `'` in front, a heading line first, every line ends with `\r\n`. The last test is a type
test: `npm run typecheck` passes only when a column that reads a property the rows do not have is an error.

## Task 2: the tables only when asked (`src/App.tsx`)

Replace the static import of `TideTables` with `React.lazy` (it exports a NAMED component: return
`{ default: TideTables }` from your own async function) and wrap it in `<Suspense>` with a
`Loading the tide tables…` status. Build and read the table: which file holds the tide data now?

## Task 3: a vendor file (`vite.config.ts`)

Add a `build.rolldownOptions.output.codeSplitting.groups` entry named `vendor` for `react`, `react-dom` and
`scheduler` (`[\\/]` matches both slashes). Build: four `OK` lines. Then change the `<h1>` text, build again, and
compare the names: which file got a new name, which kept its old one, and why does that help a returning visitor?

Done when `npm test` passes, `npm run typecheck` prints nothing after its two `>` lines, and the budget prints
four `OK` lines. Do NOT raise the budget or `chunkSizeWarningLimit` to make a `FAIL` go away.
