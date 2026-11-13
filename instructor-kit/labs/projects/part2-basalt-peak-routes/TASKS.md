# Part 2 Project: Basalt Peak Routes: tasks (in `starter/`)

Read `BRIEF.md` first (the client, the requirements, the setup with two terminals). Each `TODO R1` to `TODO R5`
comment in `src/` marks your work; R6 is the quality of all of it. Work in this order and run `npm test` after each
step. The tests are named after the requirement they score, but a test also needs the earlier steps: until
`/routes` exists, the R3 tests fail with `TODO R1`. Read the TODO in the failure, not only the test's name.

The texts below are the ones the tests look for (headings, labels, buttons, messages): use them exactly.

## R1 Routing (`src/routes.tsx`; Lessons 6.1, 6.2)

Add the three missing routes inside the pathless `errorElement` route: `routes` (`RoutesPage`, `routesLoader`),
`routes/:routeId` (`RoutePage`, `routeLoader`) and `setter` (`SetterPage`, `setterLoader`), and make the last route
(`path: '*'`) show the given `NotFoundPage`. The layout and its header links are given. Done when both R1 tests pass
(the `Routes` link opens **Routes on the walls**, which needs R3's loader too).

## R2 Data layer and errors (`src/api/client.ts`, `src/pages/loaders.ts`, `src/pages/RoutePage.tsx`; Lessons 4.1, 4.2, 6.3)

1. `isClimbRoute(value)`: a type guard that checks every property of `ClimbRoute` (`src/api/types.ts`), like the
   given `isWall`; the status is `'active'` or `'retired'`.
2. `getRoutes(filters, signal)`: `GET /routes`, with `?wall=` and `?grade=` only for the filters that are set; and
   `getRoute(id, signal)`: `GET /routes/:id`. Both through the given `requestJSON`, which throws an `ApiError` for an
   error answer and an `Error` (`Unexpected data from GET /api/routes`) for an answer of the wrong shape.
3. `routeLoader`: the route and the walls at once (`Promise.all`, `request.signal`). An `ApiError` with status 404
   becomes `throw data(message, { status: 404, statusText: 'Route not found' })`, with a message such as
   `There is no route "r99" at Basalt Peak. The link may be wrong.`; the given `ErrorPage` shows both.
4. `RoutePage`: a link back to the routes on its wall, the route's name as the `<h1>`, then a
   `<dl className="route-facts">` with Grade, Wall (its name, `The Cave`), Holds, Set by, Set on, and Status
   (`On the wall` or `Retired: taken down`).

The given home page then lists the walls (`The Slab: 3 active routes` ... `Kids' Corner: 1 active route`).

## R3 The address holds the filters (`src/utils/filters.ts`, `routesLoader`, `src/pages/RoutesPage.tsx`; Lesson 6.2)

1. `readFilters(params)`: `wall` and `grade` from the address, each kept only when `isWallId` / `isGrade` says yes
   (`?wall=the-moon` is ignored). `withParam(params, name, value)`: a COPY with one value set; `''` removes it.
2. `routesLoader`: the filters from `new URL(request.url).searchParams`, then the walls and the matching routes at
   once.
3. `RoutesPage`: `<h1>Routes on the walls</h1>`; two labeled selects, **Wall** (`All walls` with the value `''`,
   then the four walls) and **Grade** (`All grades`, then V0 to V7), whose values come from the address
   (`useSearchParams` + `readFilters`) and go back into it (`setSearchParams(withParam(...))`); the line
   `Showing 9 active routes.` (`Showing 1 active route.` for one); then each route's name as a link to
   `/routes/<id>`, with its grade, wall and hold color. Back must undo a choice.

## R4 Typed context and the protected route (`src/auth/`; Lessons 5.2, 6.3)

1. `AuthContext.ts`: `useAuth()` throws `useAuth() must be used inside <AuthProvider>` when there is no provider.
2. `AuthProvider.tsx`: the session from the given `session.ts` with `useSyncExternalStore(onSessionChange,
   readSession)`, `isSetter` from its role, `signOut` = `saveSession(null)`. The header then says
   `Signed in as Dana Okonkwo-Reyes`.
3. `guards.ts`: `nextPath(url)` (the `?next=` path, or `/` when it is missing or not a path inside the app, such as
   `//elsewhere.example`) and `settersOnly`: a guest is redirected to `/sign-in?next=%2Fsetter`
   (`encodeURIComponent` of the path and search); a signed-in non-setter gets
   `throw data(sentence, { status: 403, statusText: 'Only setters can log routes' })`; a setter gets `null`.
   The given `signInAction` already redirects to `nextPath(...)` after a sign-in.

## R5 The reducer and the write (`src/state/routeDraft.ts`, `postRoute`, `src/pages/SetterPage.tsx`; Lesson 5.1)

1. `routeDraftReducer`: a `switch` on `action.type` with `assertNever(action)` in the `default`; it returns a NEW
   state every time. `field`: that value changes, that field's message goes, the others stay. `submitted`: status
   `'sending'`, message `''`. `failed`: status `'editing'`, the message, and the `fieldErrors` of this form's four
   fields. `reset`: `emptyDraft`.
2. `postRoute(form)` in `client.ts`: `POST /routes` with the form as JSON (the given `jsonBody`); `request()` adds
   the Bearer token.
3. `SetterPage`: `useReducer(routeDraftReducer, emptyDraft)`; four labeled fields **Name** (an input), **Wall**,
   **Grade** and **Hold color** (selects whose first option has the value `''`); a `<p role="alert">` for the form's
   message; each field's messages under it with the given `FieldError` (`aria-invalid`, `aria-describedby`); the
   button **Log route**, which says `Logging…` and is disabled while the POST is on its way. On success, open
   `/routes/<the new id>` (`useNavigate`); on an `ApiError`, dispatch `failed` with its message and `fieldErrors`.

## R6 Quality

No `any`, no `as` to silence an error. Every control has a label; everything works with the keyboard. Then:

```
npm test             Tests  12 passed (12)
npx tsc -b           no output
npm run lint         Found 0 warnings and 0 errors.
npm run build        ends with ✓ built in …
```

and the app works against `npm run api`: log a route as Dana and open its page; open `/setter` as a guest and as
Sam; try `/routes/r99` and `/routes?wall=the-moon`.

## Stretch (not required for "meets")

A **Retire** button on a route's page for setters (`PATCH /api/routes/:id` with `{ "status": "retired" }`); a
status filter (`?status=retired`, the API accepts `active`, `retired` or `all`); the sign-in page sending signed-in
people straight on (a `guestsOnly` guard, as in Lesson 6.3); a document title per page.

## Journal (hand it in with the project)

Follow one address, `/routes?wall=the-cave&grade=V4`, from the address bar to the screen: which route, loader, guard
and client function run, and where the answer is checked. Why do the filters live in the address and not in state?
Who stops a staff member from logging a route: your guard, the API, or both?
