# Part 2 Project: Basalt Peak Routes: instructor notes

Never hand out `solution/` before scoring. It is the model: `npm test` (12 passed), `npx tsc -b`, `npm run lint`
(0 warnings and 0 errors, jsx-a11y on) and `npm run build` pass, and the API answers its smoke test, as
`python3 labs/check_labs.py projects/part2-basalt-peak-routes` proves (8 runs). The rubric, the scoring sheet and the
model's real outputs are also in the kit's `final-assessment.html`, Part 2 section.

## Timings

- **Kickoff, end of Session 16:** hand out `BRIEF.md`, `RUBRIC.md`, `TASKS.md` and `starter/` (with its `api/`).
  Everyone gets both terminals running (`npm run api`, `npm run dev`), signs in as Dana and as Sam, and starts R1.
  The first `npm install` needs the network.
- **At home before Session 17:** about 3 hours for R1 and R2 (R2 is the largest step); R3 started.
- **Session 17:** 50 minutes of studio time with a five-minute rubric check-in per learner or pair, then (after the
  assessment) three-minute demos.
- **Before the hand-in, a week after Session 17:** about 3 to 4 more hours for R3 to R5 and the polish.
- **Scoring:** about 20 minutes per hand-in (install and run 5, try the app 5, read the code 10).

## The API's facts (for demos and questions)

- Walls, in this order: `the-slab` (The Slab), `the-cave` (The Cave), `the-prow` (The Prow), `kids-corner` (Kids'
  Corner).
- Twelve routes, `r01` to `r12`: 9 active (The Slab 3, The Cave 3, The Prow 2, Kids' Corner 1)
  and 3 retired (`r04`, `r08`, `r11`). A new route gets the next id: `r13` on a fresh API. `setOn` dates count
  back from the day the API starts.
- Accounts, password `basalt-demo`: `dana@basaltpeak.example` (Dana Okonkwo-Reyes, setter) and
  `sam@basaltpeak.example` (Sam Whitfield, staff). The tokens `dev-setter` and `dev-staff` always work (the tests use
  `dev-setter`).
- The refusals: `GET /api/routes/r99` is **404** `not_found` "No route with that id."; `POST /api/routes` signed out is
  **401** `unauthorized` "Sign in first."; as staff **403** `forbidden` "Only setters can log or retire routes."; with
  mistakes **400** `validation_failed` "Some fields need attention." with `fieldErrors` ("Name must be 3 to 40
  characters.", "Pick a wall.", "Pick a grade from V0 to V7.", "Pick a hold color."); a wrong password **401** "Email
  or password is incorrect."; a token from before a restart **401** "Your session has ended. Sign in again."
- The API keeps its data in memory: restarting it brings the sample routes back and signs everyone out (the app's
  client forgets a session the API answers 401 to).

## Scoring, row by row

Run first (`npm ci`, `npm test`, `npx tsc -b`, `npm run lint`, `npm run build`), then try the app with `npm run api`
(the addresses below), then read. Score each row from the evidence; write one sentence for every row that is not
"strong".

- **R1 Routing.** `/hall-of-fame` shows Page not found with the header; the header links never reload the page
  (watch the network tab, or the API's request log). Meets = the route list as in `TASKS.md`. Strong = they can say
  why an error thrown by `routeLoader` keeps the header (the pathless `errorElement` route).
- **R2 Data layer and errors.** Search the project for `fetch(`: only `src/api/client.ts`. Read `isClimbRoute` (every
  property, no `as`). `/routes/r99` shows Route not found. Stop the API and reload `/routes`: meets shows the error
  page; strong shows a sentence that says to start the API.
- **R3 The address holds the filters.** Choose a wall and a grade, reload, press Back; paste
  `/routes?wall=the-moon&grade=V4` (the wall is ignored, one route). Look for `useState` holding a filter (not yet).
- **R4 Typed context and the protected route.** Open `/setter` signed out (to sign-in, then back after signing in as
  Dana), as Sam (Only setters can log routes), as Dana (the form). Try `/sign-in?next=//elsewhere.example`: after
  signing in, the home page. Read `useAuth` (throws without a provider) and the guard.
- **R5 The reducer and the write.** Send the form empty, fix one field (its message goes, the others stay), send a
  real route: its page opens and the list shows it. Read the reducer: a new object in every case, `assertNever` in
  the default, no `fetch` in the component.
- **R6 Quality.** `tests.txt` and `build.txt` match what you ran; a keyboard pass through the filters and the form;
  390 px; `NOTES.md` honest. Strong = a decision and its alternative, in their words.

## Where learners lose points

- **Every test fails at first, and early tests name an earlier TODO.** A test that needs `/routes` fails with `TODO R1` until the route exists: work R1 to R5 in order and read the failure's TODO, not only its name.
- **A blank page or `Unexpected Application Error!`:** a loader or a component threw outside the pathless `errorElement` route (the layout itself crashed, often `useAuth()` outside `AuthProvider`). Ask: which route does the error bubble to?
- **`isClimbRoute` returns true for anything:** a check written as `typeof value === 'object'` alone. The R2 client test sends a wrong-shaped answer; it must be refused.
- **The 404 shows Something went wrong instead of Route not found:** the loader rethrows the `ApiError` instead of `throw data(message, { status: 404, statusText: 'Route not found' })`.
- **Filters lost on Back, or a select that cannot be cleared:** the filter is in `useState`, or `withParam` changes the `URLSearchParams` it was given instead of a copy (`new URLSearchParams(params)`).
- **`?next=` comes back as `%2Fsetter` or goes off-site:** `encodeURIComponent` when the guard builds the address; `nextPath` reads it with `searchParams.get` (already decoded) and keeps only a path that starts with one `/`.
- **Staff reach the form:** the guard checks only `session !== null`. The role decides; and the API's own 403 is the second lock.
- **The form forgets what was typed after a refusal, or the messages stay after a fix:** the `failed` case replaces `values`, or the `field` case keeps the old message for that field.

## Three pieces of code worth reading in every hand-in

1. **`src/api/client.ts`, `request()` + `isClimbRoute`:** one place for `fetch`, the Bearer token, `ApiError`, and a
   guard between the network and the components. The difference between meets and not yet in R2 is usually visible
   in ten lines here.
2. **`src/auth/guards.ts`, `settersOnly` + `nextPath`:** the redirect with `?next=`, the 403 with `data()`, and the
   check that keeps `next` inside the app. Ask: "What stops a staff member if this guard is wrong?" (the API's 403).
3. **`src/state/routeDraft.ts` + `SetterPage`'s submit:** the action union, a reducer that returns new objects, and
   what happens with each answer (201 opens the page, 400 fills the fields, 401/403 a message).

## Pairs and resubmission

- **Pairs:** one hand-in, both names; score rows R1 to R5 for the pair and R6 for each learner (each explains a part
  in the demo).
- **Resubmission:** a row at 0 gets a written next step and one resubmission within two weeks (the same rule as Part
  1). Part 2 met = the Basalt Peak Routes project complete under its rubric (no row at 0) AND the Part 2 assessment met (14 or more of 20 points, 70 %).

## Starter, as handed out

TODO files: `src/api/client.ts`, `src/auth/AuthContext.ts`, `src/auth/AuthProvider.tsx`, `src/auth/guards.ts`, `src/pages/RoutePage.tsx`, `src/pages/RoutesPage.tsx`, `src/pages/SetterPage.tsx`, `src/pages/loaders.ts`, `src/routes.tsx`, `src/state/routeDraft.ts`, `src/utils/filters.ts`. Everything else is the same as the model. The starter
passes `npx tsc -b` and `npm run lint` as handed out (so the first type errors a learner sees are their own), and every
test fails with a `TODO R1` to `TODO R5` message.
