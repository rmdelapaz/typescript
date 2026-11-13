# Session 12 labs: Suspense and Error Boundaries, and useReducer

Copy the whole `labs/` folder into your course folder once (`shoreline/labs/`). Work in the `starter/` folders;
`TASKS.md` in each lab says what to do and when you are done. Both labs are React + TypeScript with Vitest:
`npm install` once in `starter/`, then `npm test` (RUNS the code) and `npm run typecheck` (CHECKS the types).

| Folder | What it is | Needs |
|---|---|---|
| `l4_4-suspense-use-and-error-boundaries/` | a promise cache `use()` can read, a panel with Suspense, an error boundary with a useful fallback | `npm install` once in `starter/` |
| `l5_1-usereducer-with-discriminated-unions/` | a debris tally: a typed reducer, an exhaustive switch, a component with `useReducer` | `npm install` once in `starter/` |

No lab needs the API running: requests are answered by MSW inside the tests, with answers saved from the real
shoreline-api (`fixtures/`). When a test makes a component fail on purpose, React prints the error in the test
output: that is React reporting what a boundary caught, not a failing test. Nothing here changes `shoreline-hq`.
