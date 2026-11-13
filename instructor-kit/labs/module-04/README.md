# Session 4 labs: Components and TSX (and Checkpoint 1)

Your `labs/` folder sits in your course folder (`shoreline/labs/`). Work in the `starter/` folders; `TASKS.md` says
what to do and when you are done. Open a terminal in the lab's `starter/` folder.

| Folder | What it is | Needs |
|---|---|---|
| `l3_1-components-and-tsx/` | a small "beach day" page built from four components: TSX rules, braces, named exports | `npm install` once in `starter/` (React, Vitest and Testing Library: start it early, it is the biggest download so far) |
| `checkpoint-1/` | Checkpoint 1 (Module 2, TypeScript): 30 minutes, alone | `npm install` once in `starter/` (the same packages as the Module 2 labs) |

Lab 3.1 is the course's first React lab: `npm test` runs Vitest (it renders your components in a simulated browser
and checks what a user would see), and `npm run typecheck` runs `tsc --noEmit`. Vitest RUNS the components without
checking their types, so a lab is done only when both pass. Nothing here touches `shoreline-hq`.
