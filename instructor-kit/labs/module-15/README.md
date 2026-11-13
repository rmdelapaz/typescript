# Session 15 labs: React Router 8, Search Params and Nested Routes

Copy the whole `labs/` folder into your course folder once (`shoreline/labs/`, next to `shoreline-api/` and
`shoreline-hq/`). Work in the `starter/` folders; `TASKS.md` in each lab says what to do and when you are done.
Run every command from the lab's `starter/` folder (VS Code: right-click the folder > Open in Integrated Terminal).

| Folder | What it is | Needs |
|---|---|---|
| `l6_1-react-router-8/` | a small site guide: a route list with a layout, links that do not reload, a page that reads its id from the address, an error page that keeps the header, the focus after a page change | `npm install` once in `starter/` |
| `l6_2-search-params-nested-routes-and-typed-navigation/` | a cleanup log: typed filters read from the address, a detail page nested inside the list | `npm install` once in `starter/` |

Both labs use React Router 8.5.1, Vitest and Testing Library (the same packages: the second `npm install` is
quick). The tests put the lab's own routes in a memory router, so no browser, no dev server and no API are needed.
`npm test` runs the tests, `npm run typecheck` runs `tsc --noEmit` (Vitest runs the code without checking the
types), `npm run lint` runs oxlint. Nothing here changes `shoreline-hq`.
