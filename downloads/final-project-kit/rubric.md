# Final Project Rubric

React + TypeScript: Build a Modern Web App, Lesson 11.1. The same rubric is used for self-assessment,
peer review and (in a class) the instructor's review. Each row scores 0 (not yet), 1 (meets) or
2 (strong). The project is **complete** when no row is "not yet"; "strong" rows are what make it a
portfolio piece. "Not yet" is not a failing grade: it is the list of what to do next.

| # | Criterion | Not yet (0) | Meets (1) | Strong (2) |
|---|---|---|---|---|
| 1 | **Plan** (worksheet) | Sections missing, or copied from Shoreline Crew HQ without thought | Every section filled for this brief; decisions have reasons; time log kept | Trade-offs argued with evidence (demo vs real API, state placement, one page vs steps); estimate vs actual hours reflected on |
| 2 | **Types and data** | `any`, type assertions (`as`) to silence errors, or API data used before it is checked | Domain types in one file; unions for statuses with complete `Record` tables; every API answer checked by a guard or schema; `npx tsc -b` clean | Computed values never stored; request types made from the domain types with utility types; a type error found and fixed early is written up in the journal |
| 3 | **Routes and screens** | Missing pages, dead links, or a blank screen on a reload or an unknown address | Every route in the worksheet works; a layout with a skip link; a not-found page and an error page; shareable views keep their state in the address | Lazy routes where the worksheet planned them; guards or loaders for pages some people may not open |
| 4 | **States and messages** | A page that shows nothing (or "undefined") while loading, after an error, or when a list is empty | Loading, error (with Try again), empty and not-found states written for people; focus moves to the new page and to the first problem in a form | Partial failures handled with boundaries; messages tested with server overrides in Vitest |
| 5 | **Server data and state** | Server data copied into `useState`; lists that don't update after a change | TanStack Query factories with keys general to specific; changes through mutations that invalidate the right keys; every piece of state where the placement table says | An optimistic change with a rollback where the brief needs it, tested; no app-wide store entries that could be derived or live in the address |
| 6 | **Forms** | Fields without labels, or errors that only show in the console | One schema for each form's rules and types; field errors under the fields and linked with `aria-describedby`; the server's own rules shown under the field | Field arrays or steps where the brief needs them, with an error summary; input and output types used deliberately |
| 7 | **Accessibility and performance** | Keyboard traps, invisible focus, contrast failures, missing alt text | axe 0 violations on every page type at 1280 and 390 px in light and dark; keyboard walk passes; the build table measured against the budget | A budget test (Lesson 10.1) or the forms chunk kept off the first page, measured; a screen reader check written up |
| 8 | **Tests and CI** | No tests, or tests that fail | Unit and component tests for the helpers, the mock API's rules and the main forms; at least one Playwright journey with axe; `npm run lint` at 0 warnings; both CI jobs green on the latest commit | The "must not happen" test from the worksheet; a regression test for a bug you actually had |
| 9 | **Launch and security** | Not public; or a secret, an API key or `.env.local` in Git or in the build | Public HTTPS link on a free static host; `_redirects` and `_headers` live; a demo banner that says what the demo is; every line of the live launch checklist ticked or noted | Hosting terms and monthly cost written down; the README has the link, a screenshot, how to run it and the main decisions |
| 10 | **Review and reflection** | No peer review given or received | Peer review given with the checklist; every point answered (fixed, or why not) | Review comments specific and kind, with steps to reproduce; a reflection on what you would do differently |

Total: ____ / 20      Rows at "not yet": ____

Reviewer:                         Date:
