# Session 16 labs: Data Loading and Protected Routes

Copy the whole `labs/` folder into your course folder once (`shoreline/labs/`, next to `shoreline-api/` and
`shoreline-hq/`). Work in the `starter/` folder; `TASKS.md` says what to do and when you are done. Run every
command from the lab's `starter/` folder (VS Code: right-click the folder > Open in Integrated Terminal).

| Folder | What it is | Needs |
|---|---|---|
| `l6_3-data-loading-and-protected-routes/` | a small site desk: a page whose loader fetches one beach site, one error page for every route, a crew page only organizers may open, and a sign-in form handled by a route action | `npm install` once in `starter/` |

The lab uses React Router 8.5.1, Vitest, Testing Library and MSW (the same packages as Session 15's labs, so the
`npm install` is quick). The tests put the lab's own routes in a memory router, and MSW answers the requests with
real answers saved from shoreline-api, so no browser, no dev server and no API are needed. `npm test` runs the
tests, `npm run typecheck` runs `tsc --noEmit` (Vitest runs the code without checking the types), `npm run lint`
runs oxlint. Nothing here changes `shoreline-hq`.

The Part 2 project (Basalt Peak Climbing Gym) is in `labs/projects/part2-basalt-peak-routes/`: start with its
`BRIEF.md`.
