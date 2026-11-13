# Basalt Peak routes API (given: do not edit)

A small mock back end for the project, in the style of shoreline-api: no dependencies, Node 24 runs the TypeScript
files directly. `npm run api` starts it at http://localhost:4400/api (shoreline-api keeps 4000, so both can run).
The data lives in memory: stop and start the server to get the sample routes back.

| File | What it is |
|---|---|
| `types.ts` | every shape the API sends and accepts (the app has a copy in `src/api/types.ts`) |
| `core.ts` | the whole API as one function, `createApi().handle(request)`: a web-standard `Request` in, a `Response` out |
| `server.ts` | runs `core.ts` with Node's http module: `node api/server.ts [--port=4400] [--quiet]` |
| `msw.ts` | `createHandlers(baseUrl)`: MSW 3 handlers that run `core.ts` inside the tests |
| `smoke.ts` | `node api/smoke.ts [http://localhost:4400]`: checks a running API, one line per answer |

## Endpoints

Every answer is JSON. Errors are `{ "error": code, "message": text for people, "fieldErrors"?: { field: [text] } }`.
Pages on any `http://localhost:*` address may call the API (CORS), and read `X-Total-Count` and `Location`.

| Request | Answer |
|---|---|
| `GET /api/walls` | `200` the four walls, in the gym's order: `the-slab`, `the-cave`, `the-prow`, `kids-corner` |
| `GET /api/routes?wall=&grade=&status=` | `200` the routes, sorted by wall, then grade (V0 first), then name; header `X-Total-Count`. `status` is `active` (the default), `retired` or `all`; every filter is optional. An unknown wall, grade or status: `400 validation_failed` with `fieldErrors` |
| `GET /api/routes/:id` | `200` one route (active or retired); `404 not_found` "No route with that id." |
| `POST /api/auth/sign-in` `{ email, password }` | `200 { token, user }`; `400 validation_failed` with `fieldErrors` ("Enter your email.", "Enter your password."); `401 unauthorized` "Email or password is incorrect." |
| `POST /api/routes` `{ name, wallId, grade, holdColor }` | setters only, with `Authorization: Bearer <token>`. `201` the new route (`status: "active"`, `setOn` today, `setter` = who is signed in) and `Location`; `401` "Sign in first."; `403 forbidden` "Only setters can log or retire routes."; `400 validation_failed` "Some fields need attention." with `fieldErrors` for `name` ("Name must be 3 to 40 characters."), `wallId` ("Pick a wall."), `grade` ("Pick a grade from V0 to V7."), `holdColor` ("Pick a hold color.") |
| `PATCH /api/routes/:id` `{ "status": "retired" }` | setters only: `200` the retired route; `404`, `401`, `403` as above; any other body `400` |

A token the API does not know (the server restarted) is `401 unauthorized` "Your session has ended. Sign in again."
on every request. Another method on a known address is `405`; an unknown address is `404`.

## Sample data

- Accounts (password `basalt-demo`): `dana@basaltpeak.example` (Dana Okonkwo-Reyes, **setter**) and
  `sam@basaltpeak.example` (Sam Whitfield, **staff**). For tests, the tokens `dev-setter` (Dana) and `dev-staff`
  (Sam) always work.
- Twelve routes, `r01` to `r12`: nine active (The Slab 3, The Cave 3, The Prow 2, Kids' Corner 1) and three
  retired (`r04`, `r08`, `r11`). Grades, colors and setters vary; `setOn` dates count back from today.
- A new route gets the next id (`r13` on a fresh server).
