# Labs: React + TypeScript: Build a Modern Web App (instructor kit)

One folder per session, `module-NN/` (Session 7 = `module-07`), and in it one folder per lesson,
`lM_N-<slug>/` (`l2_3-functions-and-generics`). Session 1 also has `l1_0-orientation/` (the environment check
and the diagnostic practice). Each session folder has a `README.md` for learners.

**Where learners keep them:** copy the kit's whole `labs/` folder into the course folder once
(`shoreline/labs/`), next to `shoreline-api/`, `shoreline-hq/` and `ts-lab/`. Hand out the `starter/` folders and
the `TASKS.md` sheets; keep the `solution/` folders until the session is over. A lab never runs inside
`shoreline-hq/`: when a lab practices on the course app, its task sheet says which files to copy in and how to
remove them again.

## A lab folder

```
lM_N-<slug>/
├─ TASKS.md        the task sheet: 2 or 3 tasks (new practice, never the lesson's own project), how to run, done-when
├─ lab.json        what labs/check_labs.py runs and expects (below)
├─ starter/        what learners edit (as shipped it fails where it should: tests fail, or tsc reports the TODO)
├─ solution/       the reference (passes: tests, and the type check where the lab has one)
├─ fixtures/       optional: real API answers saved once from shoreline-api (labs run without a server)
└─ debug_*         optional: a handout with deliberate bugs (never named starter or solution)
```

TypeScript labs carry `package.json`, `package-lock.json` and `tsconfig.json` (never `node_modules`). Two shapes,
both from the kit tools' `lab_templates/`:

- **TypeScript on Node** (`lab_templates/ts-node/`, Module 2 style): Node 24 runs the `.ts` files directly (it
  strips the types), `node --test --test-reporter=spec` runs every `*.test.ts`, `tsc --noEmit` checks the types.
  A lab with no dependencies at all may be plain `.mjs`/`.ts` with `node --test` and no lockfile.
- **React + TypeScript** (`lab_templates/react-vitest/`): Vitest 5 + Testing Library + jsdom + MSW 3 with the
  course's pinned versions; `npm test` runs the tests, `npm run typecheck` runs `tsc --noEmit`. Requests are
  answered by MSW or read from `fixtures/`, so these labs never need a running API.

Every lab with the same lockfile shares ONE install (copy the template's `package.json` + `package-lock.json`
unchanged). Vitest and node:test run the code without checking types: a solution that passes its tests but fails
`tsc` is wrong, so TypeScript labs have a `solution-types` run.

## lab.json

```json
{"title": "Read the API like a front end", "lesson": "1.1", "tasks": 3,
 "runs": [
   {"name": "starter",  "dir": "starter",  "cmd": "npm test", "exit": "nonzero", "expect": ["ℹ fail 6"]},
   {"name": "solution", "dir": "solution", "cmd": "npm test", "exit": 0, "expect": ["ℹ fail 0"]},
   {"name": "solution-types", "dir": "solution", "cmd": "npm run check", "exit": 0, "absent": ["error TS"]},
   {"name": "solution-live", "dir": "solution", "cmd": "node count_events.ts {API}", "api": true,
    "expect": ["15 public cleanups"]}]}
```

| Key | Meaning |
|---|---|
| `name` | unique; runs named `starter*` must fail where they should (`"exit": "nonzero"` or an `expect` text such as the TODO line); runs named `solution*` exit 0 |
| `dir` | the folder the command runs in (relative to the lab folder); its `package-lock.json` is installed first |
| `cmd` | a bash command line, run in a terminal (pty) like a learner's; `{API}` = the address of the run's API |
| `exit` | `0` (default), a number, or `"nonzero"` |
| `expect` / `absent` | texts the output must / must not contain (the API's address appears as `{API}` in the output) |
| `files` | `{"journal.md": "..."}`: files written into `dir` before the run (`{API}` substituted) |
| `env` | extra environment variables (`{API}` substituted) |
| `api` | `true` or `{"args": ["--latency=300"], "today": "2026-06-15"}`: the run needs shoreline-api. The checker starts a PRIVATE copy on its own port (42NN for Session NN), never the learners' 4000, and stops it afterwards. Sample data is built around `today` (default 2026-06-15, so outputs do not change from day to day; `null` = the real date). The EXCEPTION, not the rule |
| `course` | `"lesson-02-end"` (+ `"into": "shoreline"`): copy that course download (the course repo's `downloads/<name>/`) into `<dir>/<into>/` first, with each project's packages installed from its lockfile: a learner's course folder at that point, for checks that need one (Session 1's environment check). Skipped when the downloads are not on the machine |
| `tty` | `false`: a plain pipe instead of a terminal (default: a terminal, unless the command starts a background job) |
| `timeout` | seconds (default 180) |

## Running the checks

```bash
python3 labs/check_labs.py module-01            # every lab of Session 1 (from the kit folder)
python3 labs/check_labs.py module-01/l1_2-your-workspace -v     # one lab, with each run's output
python3 labs/check_labs.py --all                # the whole kit
python3 labs/check_labs.py module-01 --no-api   # skip the runs that need shoreline-api
python3 labs/check_labs.py module-01 --api http://localhost:4000   # use YOUR running API instead of a private one
python3 labs/check_labs.py module-01 --api-dir ~/shoreline/shoreline-api   # which shoreline-api to start
```

Needs Node 24 (the course tools' `~/.nvm/versions/node/v24.22.2/bin` if it exists, otherwise the `node` on your
PATH; or set `RTS_NODE=/path/to/node/bin`). Every run works in a fresh copy of the lab folder under
`~/.cache/rts/kit-work/` (removed afterwards); each lockfile is installed once into `~/.cache/rts/kit-nm/` and
hard-linked into the copies. Runs with `api` start shoreline-api from the course tools' copy or, on an
instructor's machine without them, from `shoreline-api/` next to this `labs/` folder (`shoreline/shoreline-api`
when `labs/` sits in the course folder) or `--api-dir`. Several checkers can run at once: each API gets its own
port. With `--api URL`, runs that start the API with their own flags (`args`) are skipped.
