# Part 2 Project: Basalt Peak Routes

> Hi there! I'm Dana Okonkwo-Reyes, head route setter at Basalt Peak Climbing Gym in Millbrook. We reset our four walls every week, and
> right now the only way to know what is up is the whiteboard by the front desk (which nobody can read from the
> parking lot). Climbers keep asking us two things: what is on each wall this week, and where the V4s are. We would
> love a small web app: the routes by wall and grade, a page for each route that we can text to people, and a way
> for us setters to log a new route from a phone while we are still on the ladder. Only setters should be able to
> log routes; the front-desk staff can sign in and look, but please don't let them log anything. Our volunteer
> developer already built us a tiny API for the data (it is in the folder). Thanks a ton! Dana Okonkwo-Reyes, head route setter

Build the gym's route board as a React + TypeScript app: the skills of Part 2 (Modules 4 to 6: fetching, custom
hooks, `useReducer`, typed context, React Router 8 with loaders, search params and a protected route) for a new
client. The API is **given** (`api/`): all your work is in `src/`.

## What you build

| Requirement | Lessons | What it means |
|---|---|---|
| **R1 Routing** | 6.1, 6.2 | Every address has a page in one route list (`src/routes.tsx`): the home page, `/routes`, `/routes/:routeId`, `/sign-in`, `/setter`, and **Page not found** for anything else, inside the gym's layout. Links never reload the page. |
| **R2 Data layer and errors** | 4.1, 4.2, 6.3 | `src/api/client.ts` is the only file that calls `fetch`; every answer is checked by a type guard before anyone uses it; error answers become an `ApiError`. Loaders fetch the walls and routes for each page; a route id the API does not know shows **Route not found** (a 404), never a crash. |
| **R3 The address holds the filters** | 6.2 | `/routes?wall=the-cave&grade=V4`: the Wall and Grade filters live in the address (`useSearchParams`), checked by a guard, so a link can be shared, a reload keeps them and Back undoes a choice. |
| **R4 Typed context and the protected route** | 5.2, 6.3 | A typed `AuthContext` with a `useAuth()` that refuses to work outside its provider. `/setter` is for setters: a guest is sent to sign in and comes back (`?next=`); a staff account sees **Only setters can log routes**. |
| **R5 The reducer and the write** | 5.1, 4.2 | The setter's form is one `useReducer` state (a discriminated union of actions, `assertNever`). It POSTs through `client.ts`, shows the API's refusals under each field, and opens the new route's page when the API says yes. |
| **R6 Quality** | all of Part 2, 3.6 | No `any`, no `as` to silence an error; labeled controls; `npx tsc -b` clean, `npm run lint` 0 warnings and 0 errors, `npm test` (12 passed), `npm run build`; a short `NOTES.md`. |

Not required: retiring routes, sorting, a search box, TanStack Query (that is Part 3). Add something only after
everything above works, and say so in `NOTES.md`.

## What you get (in `starter/`)

- **`api/`, the gym's API (given, do not edit).** No dependencies: Node 24 runs it. `npm run api` starts it at
  http://localhost:4400/api (Shoreline Crew's API keeps 4000, so both can run). The endpoints, the sample data
  and the accounts are in `api/README.md`. The data lives in memory: stop and start it to get the sample routes back.
- **The app, partly built.** Given: the types (`src/api/types.ts`, a copy of the API's), the layout and header,
  the styles (`src/index.css`), the home page, the error page, Page not found, the sign-in form, the session store
  (`src/auth/session.ts`), the parts of `client.ts` that the given pages need, and the tests. The `TODO R1` to
  `TODO R5` comments mark your work; `TASKS.md` lists them in order.
- **The tests (`src/project.test.tsx`, do not edit).** 12 tests named after the requirement they check. They
  run the API's own code through MSW, so `npm test` needs no server. As handed out, every test fails with a TODO.

## Set up (about 15 minutes)

1. Copy `starter/` to a folder of its own NEXT TO the course app, for example `shoreline/basalt-peak/` (never inside
   `shoreline-hq/`). Open that folder in VS Code.
2. `npm install` once (React 19.3, React Router 8.5, Vite 8.3, TypeScript 7.0, Vitest 5, MSW 3, oxlint: the
   course's versions).
3. **Terminal 1:** `npm run api`. It prints `Basalt Peak API running at http://localhost:4400/api` and the two
   accounts. Keep it running.
4. **Terminal 2:** `npm run dev`, then open the address Vite prints. (If Shoreline Crew HQ's dev server runs too,
   Vite takes the next port: fine, the API answers any `http://localhost` page.) The home page shows
   `TODO R2: getRoutes is not written yet` inside the layout: that is your first job after the routes.
5. Optional, in a third terminal: `node api/smoke.ts` checks the running API, one line per answer, and ends with
   `Smoke test passed`.
6. `npm test`: 12 tests, all failing with a TODO at first. Done when it prints `Tests  12 passed (12)`.

Sign in with `dana@basaltpeak.example` (a **setter**) or `sam@basaltpeak.example` (**staff**), password
`basalt-demo`.

## Milestones

- **End of Session 16 (kickoff):** set up with both terminals running, `BRIEF.md` and `TASKS.md` read, R1 started
  (the route list).
- **Session 17 (check-in):** R1 and R2 working (the walls, the list and a route's page come from the API), R3
  started. Bring one question; you show `npm test` and `npx tsc -b` and say which rubric row worries you. A
  three-minute demo: one route from the address to the screen, `/setter` as a guest, as Sam and as Dana, one
  decision you made.
- **One week after Session 17 (hand-in):** everything. When Part 2 runs as a course of its own, this hand-in (with
  the Part 2 assessment) closes the course.

## Rules

- Work alone or in a pair. A pair hands in one project with both names, and `NOTES.md` says in a sentence each who
  did what; each of you explains your part in the demo.
- Open book: the lesson pages, your Shoreline Crew HQ code, the workbook. You may copy your own course code (the
  guards from Lesson 6.3, `assertNever` from Lesson 5.1): say so in `NOTES.md`.
- Do not change `api/` or the tests. If you think one of them is wrong, write it in `NOTES.md`.
- No new packages: everything you need is installed. No `any`, no `as` to silence an error, no `// @ts-ignore`.

## Hand-in

1. Zip your project folder WITHOUT `node_modules` and `dist`, named `basalt-peak-<yourname>.zip` (or share a
   repository link).
2. Add `tests.txt`: the last lines of `npm test` (the `Tests` line), and `build.txt`: the last lines of
   `npm run build`.
3. Add `NOTES.md`: three to six sentences: what works, what does not (an honest note beats a hidden gap), and one
   decision you made and why. Pairs: who did what.
4. Hand it in the way your instructor says (shared folder, LMS upload or USB stick).

Your instructor scores it with `RUBRIC.md`: six rows, 0 (not yet), 1 (meets) or 2 (strong), 12 points; the
project is complete when no row is at 0. Part 2 met = the Basalt Peak Routes project complete under its rubric (no row at 0) AND the Part 2 assessment met (14 or more of 20 points, 70 %).
