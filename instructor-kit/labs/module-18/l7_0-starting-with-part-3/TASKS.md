# Lab 7.0: starting with Part 3

Part 3 starts from the code Shoreline Crew HQ has at the end of Lesson 6.3. Task 1 makes sure your course folder is
exactly that and works. Tasks 2 and 3 are a refresher on three TypeScript habits Lesson 7.1 leans on: checking data
from outside, a generic function, and a union with one case per screen state.

## Task 1: the catch-up check (everyone starting with Part 3; 10 minutes)

If you finished Parts 1 and 2 with the course, your `shoreline/` folder is ready: just run the check (step 5).
Otherwise, from the course site's downloads:

1. Unzip `lesson-24-start.zip` into a NEW folder called `shoreline` (not inside OneDrive, iCloud or Dropbox). It
   holds `shoreline-api`, `shoreline-hq` and `ts-lab`. If the unzip tool added a folder level
   (`shoreline/lesson-24-start/...`), move the three folders up one level.
2. Copy the kit's `labs/` folder into `shoreline/`.
3. In `shoreline-hq`: copy `.env.example` to `.env.local`, then `npm ci` (the exact versions in its lockfile).
4. Terminal 1, in `shoreline-api`: `node server.ts` (leave it running). Terminal 2, in `shoreline-hq`: `npm run dev`.
5. Terminal 3, in `shoreline`: `node labs/module-18/l7_0-starting-with-part-3/check_environment.mjs`

Done when the last line says `READY for React + TypeScript: Build a Modern Web App` (or `READY WITH NOTES`) and
`npm run build` in `shoreline-hq` ends with `✓ built in`. Then sign in at http://localhost:5173/sign-in as
`maya.okafor@example.com` (password `shoreline-demo`) and open Volunteers: you are where Lesson 7.1 begins.

## Task 2: a check and a generic (`refresher.ts`)

A terminal in `labs/module-18/l7_0-starting-with-part-3/starter`, then `npm install` once. `npm test` runs the tests; `npm run check`
type-checks. `fixtures/sites.json` is the real answer of `GET /api/sites`.

- `isSiteSummary(value)` is a type predicate that only checks "is an object". Make it check every field of
  `SiteSummary` (Lesson 2.4: `unknown` in, a proven shape out).
- `parseList` returns `unknown[]`, so `npm run check` refuses the test's `const sites: SiteSummary[] = ...`. Give it
  a type parameter and a predicate parameter `(value: unknown) => value is T`, so the list comes back typed.

## Task 3: one sentence per state (`statusLine`)

Write `statusLine(state)` with a `switch` on `state.kind`: `Loading the sites…`, `Could not load the sites:
MESSAGE`, and for the six real sites `6 sites, 3 step-free`. End with `default: return assertNever(state)`.
Then add `| { kind: 'stale'; data: T }` to `LoadState` and run `npm run check`: which line does tsc point at?
Take it out again.

Done when `npm test` ends with `ℹ fail 0` and `npm run check` prints nothing after its two `>` lines. Lesson 7.1's
query results are the same idea as `LoadState`, made by a library: a union you narrow before you read the data.
