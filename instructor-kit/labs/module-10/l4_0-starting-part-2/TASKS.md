# Starting Part 2: the environment check, the catch-up code and a Part 1 refresher

## A. Is your course folder ready for Part 2? (everyone, before Session 10 if you can)

Part 2 starts from the code Shoreline Crew HQ has at the end of Part 1 (Lesson 3.6). If you did Part 1, that is
your own `shoreline` folder. **Starting with Part 2, or not sure your code is complete?** Use the course's catch-up
code instead:

1. Install Node.js LTS (24 or newer) and VS Code (Lesson 1.2), then open a NEW terminal: `node -v` starts with
   `v24` or higher.
2. Download `lesson-13-start.zip` from the course site (Lesson 4.1, "Code for this lesson") and unzip it. It holds
   one folder, `lesson-13-start`, with `shoreline-api`, `shoreline-hq` and `ts-lab` inside. Rename that folder to
   `shoreline` and put it somewhere that is NOT synced (not OneDrive, iCloud or Dropbox). Copy the kit's `labs/`
   folder into it.
3. In `shoreline/shoreline-hq`: copy `.env.example` to `.env.local` (it says `VITE_API_URL=http://localhost:4000`),
   then `npm ci` (installs the exact versions in `package-lock.json`).
4. Terminal 1: `cd shoreline-api`, then `node server.ts` (leave it running).
5. Terminal 2, in `shoreline`:

   ```
   node labs/module-10/l4_0-starting-part-2/check_environment.mjs
   ```

   Done when the last line says `READY for React + TypeScript: Build a Modern Web App` (`READY WITH NOTES` is fine:
   read the CHECK lines). `NOT READY`? Each FIX line says what to do.
6. In `shoreline-hq`: `npm run build` ends with a `✓ built in` line. (Optional: `npm run check` in `ts-lab`, the
   Module 2 workbench, prints nothing after its two `>` lines.)

Keep your own Part 1 code if the check says READY with it. The catch-up code is exactly the course's code after
Lesson 3.6: same files, same names as every Part 2 lesson expects.

## B. Part 1 refresher (in the room, or at home before Lesson 4.1)

Two small tasks on what Lesson 4.1 builds on. **Setup (once):** a terminal in
`labs/module-10/l4_0-starting-part-2/starter`, then `npm install`. **Run:** `npm test` (as shipped, five tests fail
with a `TODO` message) and `npm run typecheck` (as shipped, one error: Task 1's labels are not complete yet).

### Task 1: check the API's data, label every terrain (`src/checks.ts`)

`isSiteSummary(value)` is a type predicate (Lesson 2.4): `true` only for an object with string `id`, `name` and
`town`, one of the four terrains, and a boolean `accessible`. Every site in `../fixtures/sites.json` (the real
answer of `GET /api/sites`) must pass; the test's broken values must not. Then make `terrainLabels` a complete
`Record<Terrain, string>` (Lesson 3.3): Rocky shore, Tidal marsh, Sand and rocks. Done when the three Task 1 tests
pass and `npm run typecheck` prints nothing after its two `>` lines.

### Task 2: a component with state, an event and a derived count (`src/SiteChooser.tsx`)

List every site as `Name, Town`, a checkbox labeled `Step-free access only` that hides the sites without
step-free access, and a status line `Showing N of M sites.` (`role="status"`). The shown list and the count are
worked out on every render, never stored in state (Lesson 3.4). Done when `npm test` ends with `Tests  5 passed (5)`.
