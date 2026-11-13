# Session 11 labs: Custom Hooks, Refs and the DOM

Copy the whole `labs/` folder into your course folder once (`shoreline/labs/`). Work in the `starter/` folders;
`TASKS.md` in each lab says what to do and when you are done. Both labs are React + TypeScript with Vitest:
`npm install` once in `starter/`, then `npm test` (RUNS the code) and `npm run typecheck` (CHECKS the types).

| Folder | What it is | Needs |
|---|---|---|
| `l4_2-custom-hooks/` | three Hooks of your own: a tuple, a generic Hook with a timer, a data Hook that must not flood the server | `npm install` once in `starter/` |
| `l4_3-refs-and-the-dom/` | refs to elements: focus and select, a ref passed as a prop, callback refs kept in a Map | `npm install` once in `starter/` |

No lab needs the API running: requests are answered by MSW inside the tests, with answers saved from the real
shoreline-api (`fixtures/`). Nothing here changes `shoreline-hq`.
