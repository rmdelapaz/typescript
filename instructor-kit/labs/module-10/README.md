# Session 10 labs: Effects and Fetching (Part 2 starts here)

Copy the whole `labs/` folder into your course folder once (`shoreline/labs/`, next to `shoreline-api/`,
`shoreline-hq/` and `ts-lab/`). Work in the `starter/` folders; `TASKS.md` in each lab says what to do and when you
are done. Run every command from the folder named in the task.

| Folder | What it is | Needs |
|---|---|---|
| `l4_0-starting-part-2/` | the environment check for Part 2 (run it from your course folder) and a Part 1 refresher: a type check for API data and a small component with state and an event | the API running for the check; `npm install` once in `starter/` for the refresher |
| `l4_1-effects-and-fetching/` | effects with a cleanup, a fetch that checks the answer, a page part that loads per site and cancels the old request, and a loading state as a discriminated union | `npm install` once in `starter/` |

The labs never need the API: their requests are answered by MSW (Mock Service Worker) inside the tests, with
answers saved from the real shoreline-api (`fixtures/`). `npm test` RUNS your code with Vitest (it removes the types
first, like the dev server); `npm run typecheck` CHECKS the types with `tsc`. Nothing here changes `shoreline-hq`.
