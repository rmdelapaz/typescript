# Lab 11.2: Advanced types you will meet

Lesson 11.2 teaches you to READ the types libraries compute from other types, and to write one of each once. This
lab gives you three small files to finish, on new tables and a new JavaScript helper. TypeScript on Node, like
Module 2: Node runs the tests (`npm test`), `tsc` checks the types (`npm run check`).

In `starter/`: `npm install` once, then `npm test` (two tests fail: a crash and a `TODO 2`) and `npm run check`
(errors TS7016, TS2578 and TS2344: your to-do list). Edit `tables.ts` and `computed.ts`, and add one new file.
Never edit `advanced.test.ts`, `tides.ts` or `tide-clock.js`.

## Task 1: satisfies, not as (TODO 1, `tables.ts`)

`terrainTips` is written with `as`, so TypeScript trusts it and `terrainTip('marsh')` crashes at run time. Change
`as` to `satisfies`, read the error (TS2741 names the missing key), add the line. Then `reportTitles`: its
annotation throws the keys away, so `reportTitle('volunteers')` compiles (the test's `@ts-expect-error` is TS2578,
unused). Keep the keys with `satisfies`.

## Task 2: types from types (TODO 2, `computed.ts`)

- `Getters<T>`: a mapped type with `as` and `Capitalize`, so `Getters<SiteFilters>` is
  `{ getTerrain: () => Terrain; getMinSpots: () => number; getSearch: () => string }`
- `Unwrap<T>`: a conditional type with `infer`: a Promise's value, any other type unchanged
- `ChangeEvent`: a template literal type for every `collection:change` pair; then write `changeEvent`

The `Expect<Equal<...>>` lines at the top of the test file are type tests: while a type is wrong they are TS2344.

## Task 3: a declaration file (`tide-clock.d.ts`)

`tides.ts` imports `tide-clock.js`, a JavaScript file with no types: error TS7016, so everything from it would be
`any`. Write `tide-clock.d.ts` next to it, declaring the two things it exports with real types (read the
JavaScript to find them; the list is frozen, so make it read-only). Never `any`.

## Done when

`npm test` ends with `ℹ fail 0` and `npm run check` prints nothing after its two `>` lines.

**Stretch:** a branded `SiteSlug` (`string & { readonly __brand: 'SiteSlug' }`) with one checking constructor,
`toSiteSlug`, that accepts only lowercase words joined by hyphens, and a `@ts-expect-error` test that a plain
string is refused where a `SiteSlug` is needed.
