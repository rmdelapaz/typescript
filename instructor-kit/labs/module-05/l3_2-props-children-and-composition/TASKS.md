# Lab 3.2: props, children and composition

New practice on Lesson 3.2's ideas, outside the course app: three small components, tested in a simulated browser.
`src/data/sites.ts` holds the six real beach sites (saved from `GET /api/sites`, typed `Site[]` with the API's own
`src/api/types.ts`, like the lesson's `src/data/sites.ts`).

**Setup (once):** a terminal in `labs/module-05/l3_2-props-children-and-composition/starter`, then `npm install`.
**Run:** `npm test` (runs the tests) and `npm run typecheck` (checks the types of your code AND the tests). As
shipped, four tests fail and the type check reports errors: some are in `lab.test.tsx`, but every fix belongs in
`src/Tag.tsx`, `src/Panel.tsx` or `src/SiteTile.tsx`. Never edit the test file.

## Task 1: Tag, typed props with a default (`src/Tag.tsx`)

Write a `TagProps` interface: `label` is required; `tone` is optional and can only be `'info'` or `'warning'`. Give
`tone` the default `'info'` in the destructuring and draw `<span className="tag tag-info">` (or `tag-warning`) with
the label inside. The last lines of `lab.test.tsx` say they EXPECT two type errors (a `'danger'` tone and a tag
without a label): while `tone` is any string, the check complains that the first error never happened (TS2578).
Done when the two Task 1 tests pass and `npm run typecheck` has nothing left to say about `Tag`.

## Task 2: Panel, a component that takes children (`src/Panel.tsx`)

The test puts a paragraph and a `Tag` between `<Panel>` and `</Panel>`. Make `Panel` accept them (which type means
"anything React can draw"?) and draw them under the heading. Read the type error the test file gives you first:
which props did TypeScript receive, and which property does `PanelProps` not have? Done when the Task 2 test passes.

## Task 3: SitePhoto and SiteTile, composition (`src/SiteTile.tsx`)

`SitePhoto` needs only the picture: type its prop with an indexed access type (the type of the `image` property of
`Site`) and draw an `<img>` with the picture's `url`, `alt`, `width` and `height`. Then `SiteTile`: a `Panel` titled
with the site's name, holding the `SitePhoto`, a `Tag` with the town and a `Tag` that says `Step-free route`
(default tone) or `No step-free route` (warning tone). `Panel` and `Tag` know nothing about sites; only the tile
does. Done when `npm test` says `Tests  4 passed (4)` and `npm run typecheck` prints nothing after its two `>` lines.

**Stretch:** give `Panel` an optional `footer` prop of type `ReactNode` that is drawn in a `<footer>` only when it is
given, and use it in `SiteTile` for the parking line (`site.parking`). Why is a second `ReactNode` prop fine here,
while ten string props for every piece of the tile would not be (Lesson 3.2, "composition over configuration")?
