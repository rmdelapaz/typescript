# Session 14 labs: Rendering Performance and Component Patterns

Copy the whole `labs/` folder into your course folder once (`shoreline/labs/`, next to `shoreline-api/` and
`shoreline-hq/`). Work in the `starter/` folders; `TASKS.md` in each lab says what to do and when you are done.
Run every command from the folder named in the task. Neither lab needs shoreline-api, and nothing here changes
`shoreline-hq`.

| Folder | What it is | Needs |
|---|---|---|
| `l5_3-rendering-performance/` | memo + useCallback, a context value that stays put, useMemo: the tests COUNT renders and calls; then the same starter with the React Compiler on; a stale-callback handout for oxlint | `npm install` once in `starter/` (React, Vitest, oxlint and the compiler packages) |
| `l5_4-component-patterns/` | a compound ChoiceGroup, a generic DataTable with render props (over a real impact report), a polymorphic Chip with type tests | `npm install` once in `starter/` (React, Vitest) |

`npm test` runs the tests (Vitest), `npm run typecheck` checks the types (tsc): Vitest runs the code without
checking it, so a lab is done when both are clean.
