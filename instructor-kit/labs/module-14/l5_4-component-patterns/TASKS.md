# Lab 5.4: three patterns, three new components

New practice on Lesson 5.4's three patterns, on small components the HQ does not have: a compound ChoiceGroup
(like Tabs), a generic DataTable with render props (like DataList) over two REAL impact reports from shoreline-api
(`src/impactReports.ts`, captured once: no server needed), and a polymorphic Chip (like Button). The tests in
`src/lab.test.tsx` check what each draws; `src/chipTypes.tsx` checks what TypeScript accepts. Do not edit either.

**Setup (once):** a terminal in `labs/module-14/l5_4-component-patterns/starter`, then `npm install`. Then
`npm test` (tests fail with `TODO 1`, `TODO 2` and `TODO 3`) and `npm run typecheck` (errors, among them `TS2339`
in the test file and `TS2578` in `chipTypes.tsx`).

## Task 1: a compound ChoiceGroup (`src/ChoiceGroup.tsx`)

`<ChoiceGroup label="Weight unit" defaultValue="kg">` with `<Choice value="kg">` parts inside, written as plain JSX.
Share the chosen value through the private `ChoiceContext`, make `useChoice` throw a message that says what to fix,
and let each `Choice` show `aria-pressed` and choose itself on click. Remove the `console.log` placeholders.

## Task 2: a generic DataTable (`src/DataTable.tsx`)

Make `Column`, `DataTableProps` and `DataTable` generic in the type of one row, so `getKey` and every `cell` render
prop are checked against it. The tests use the same component for debris counts and for whole reports: hover over
`item` and `report` in the test file once it compiles. Then draw the rows and the empty message.

## Task 3: a polymorphic Chip (`src/Chip.tsx`)

Type Chip like Lesson 5.4's Button: `C extends ElementType = 'span'`, `ComponentPropsWithRef<C>` without the props
Chip owns, and `type="button"` by default on a button. Done when `npm run typecheck` is clean: every
`@ts-expect-error` line in `chipTypes.tsx` is then a real error.

Done when `npm test` ends with `Tests  9 passed (9)` and `npm run typecheck` prints nothing after its two `>` lines.

**Stretch:** add a `layout?: 'grid' | 'plain'`-style option of your own to DataTable (for example `dense?: boolean`)
and a test for it; or give ChoiceGroup an `onChange` callback typed `(value: string) => void`.
