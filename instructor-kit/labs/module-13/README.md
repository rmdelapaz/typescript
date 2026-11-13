# Session 13 labs: Typed Context (and Checkpoint 2)

Copy the kit's `labs/` folder into your course folder once (`shoreline/labs/`), if you have not already. Work in the
`starter/` folders; `TASKS.md` in each folder says what to do and when you are done. Nothing here changes
`shoreline-hq`, and nothing here needs shoreline-api: the tests answer every request themselves (MSW).

| Folder | What it is | Needs |
|---|---|---|
| `l5_2-typed-context/` | three small contexts: one with a sensible default, one with none (the undefined trap), one provider that owns the state | `npm install` once in `starter/` |
| `checkpoint-2/` | Checkpoint 2: a data Hook, a reducer, a reducer shared through a context (30 minutes, alone) | `npm install` once in `starter/` (start it at the break) |

`npm install` downloads React, Vitest, Testing Library, MSW and TypeScript into that folder only (and oxlint for
the context lab). Then `npm test` runs the tests and `npm run typecheck` checks the types: Vitest runs your code
without checking it, so both must pass.
