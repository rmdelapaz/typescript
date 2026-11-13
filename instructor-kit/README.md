# React + TypeScript: Build a Modern Web App: Instructor Kit ("Course-in-a-Box")

A ready-to-teach package that lets another instructor deliver **React + TypeScript: Build a Modern Web App**
in a classroom without building it from scratch. The live course site (<https://rays-typescript.netlify.app/>)
is the learner's textbook: 35 lessons in 11 modules (84 hours 55 minutes of learner time), each with real output
under every code block (run with Node.js 24 LTS, TypeScript 7.0.2, React 19.3.1, Vite 8.3.8, React Router 8.5.1,
TanStack Query 5.107.1, Zustand 5.1.0, React Hook Form 7.92.0, Zod 4.6.7, Vitest 5.1.0, MSW 3.0.5 and Playwright
1.65.0; the course's mock API also on Node 26), project code checked against the files of each lesson's finished
stage, starting and finished code downloads, exercises with hidden solutions, a quiz and a journal prompt. One
project runs through every lesson: **Shoreline Crew HQ**, the organizers' web app of the fictional **Shoreline
Crew**, a volunteer beach-cleanup group, talking to `shoreline-api`, a small typed mock API the course ships (no
dependencies, started with `node server.ts`). This kit is everything the instructor needs around it.

**Scope:** the whole course, Modules 1 to 11: why React and TypeScript belong together and a local workspace (Node,
VS Code, the mock API, a Vite `react-ts` app, oxlint); the TypeScript you need before React (types and inference,
object types and unions, functions and generics, typing real API data); React in TypeScript from the first
component to props, lists, state and events, forms with React 19 actions, CSS Modules and accessible components;
effects and typed fetching, custom Hooks, refs and the DOM, Suspense, `use()` and error boundaries; `useReducer`
with discriminated unions, typed context, rendering performance and the React Compiler, typed component patterns;
React Router 8 with search params, nested routes, loaders, actions and protected routes; server state with TanStack
Query and mutations, client state with Zustand; forms at scale with React Hook Form and Zod; tests with Vitest,
Testing Library, MSW and Playwright with axe; performance and the build, a demo-mode deployment to a free static
host with GitHub Actions CI; a final project and next steps. **Learners know JavaScript and are new to TypeScript
and React** (variables, functions, arrays, objects, modules, async/await, the DOM, HTML and CSS); no TypeScript or
React experience is needed. Session 1 opens with a short, ungraded JavaScript diagnostic.

**Format:** **26 sessions × 3 hours = 78 class hours** in **three parts**, one or two lessons per session.
Sessions 4, 5, 7, 8, 10, 13, 16, 18, 21, 23 and 24 teach one lesson and give the rest of the time to a checkpoint,
a project kickoff, a catch-up or the longer lesson itself; Sessions 9, 17 and 26 teach none (part project
check-ins, assessments, the showcase).

- **Part 1: TypeScript and React Foundations** (Sessions 1 to 9, Modules 1 to 3, **27 hours**, 12 lessons) takes a
  JavaScript developer from an empty laptop to a typed React app with components, state, events, a form with
  actions and accessible styling. It **runs on its own as a short course** and ends with the **Part 1 project and
  assessment** (Session 9).
- **Part 2: Data, State and Routing** (Sessions 10 to 17, Modules 4 to 6, **24 hours**, 11 lessons) connects
  Shoreline Crew HQ to its API, structures its state and gives it a router with protected routes, and ends with
  the **Part 2 project and assessment** (Session 17).
- **Part 3: Production React** (Sessions 18 to 26, Modules 7 to 11, **27 hours**, 12 lessons) adds server state,
  forms at scale, tests, the build and a free deployment with CI, and ends with the **final project showcase and
  the final assessment** (Session 26).

Run it weekly (26 weeks; Part 1: 9, Part 2: 8, Part 3: 9), twice a week (about 13 weeks), or as three separate
blocks. The final project needs about 25 hours over three to five weeks between Sessions 25 and 26
(`final-assessment.html` says what to do when Session 26 must come sooner). In the file layout a session is called
a "module": `source/module-09/` is Session 9. In prose, "Module 3" always means a course module (React
Fundamentals in TypeScript).

Learners start each lesson project in the room and finish it at home, so "leave with" below means "have started
in class and finish before the next session".

| Session | Lessons | Learners leave with |
|---------|---------|---------------------|
| **Part 1: TypeScript and React Foundations** | | |
| S1 · Why React + TypeScript and Your Workspace | 1.1 Why React + TypeScript · 1.2 Your Workspace (+ welcome, environment check, diagnostic, install clinic) | Node 24+ and VS Code; a course folder `shoreline` with `shoreline-api` running on port 4000 and `shoreline-hq` created with Vite's `react-ts` template; `check_environment.mjs` says READY; a screen-to-data map of the HQ; one typo seen in the editor, `tsc -b` and the browser |
| S2 · Types, Inference and Shaping Data | 2.1 Types and Inference · 2.2 Shaping Data | The `ts-lab` workbench (TypeScript 7.0.2, a strict tsconfig, `npm run check`); `types.ts` and `shapes.ts` describing Shoreline Crew's data with interfaces, literal unions and a discriminated union |
| S3 · Functions, Generics and Typing Real Data | 2.3 Functions and Generics · 2.4 Typing Real Data | `functions.ts` with typed and generic helpers; the HQ's shared API types, type guards at the door, a typed environment variable and a checked client that fetches real cleanups |
| S4 · Components and TSX | 3.1 Components and TSX + **Checkpoint 1** (30 min) | The HQ shell (brand colors, logo and favicon, Header, HomePage, Footer, AppLayout with a skip link); Checkpoint 1 on Module 2's TypeScript |
| S5 · Props, Children and Composition | 3.2 Props, Children and Composition | Typed props, optional props with defaults and children; the Beach sites page, the HQ's first data-driven screen |
| S6 · Lists, Conditional Rendering, State and Events | 3.3 Lists and Conditional Rendering · 3.4 State and Events | The cleanup events page (keys, empty states, `Record` tables, a union that decides what to draw); search and status filters with typed events and a derived count |
| S7 · Forms and Actions | 3.5 Forms and Actions | The Plan a cleanup form with React 19 form actions, `useActionState`, a typed state union and messages people understand |
| S8 · Styling and Accessible Components | 3.6 Styling and Accessible Components (+ Part 1 project kickoff) | A CSS Module per component, a self-hosted font, one focus ring, jsx-a11y in the linter at 0 warnings; the Part 1 project started |
| S9 · Part 1 Project Check-in and Assessment | — (project check-in, the **Part 1 assessment**, demos, review) | The Part 1 project presented; a scored Part 1 assessment. Part 1 alone: the course closes here |
| **Part 2: Data, State and Routing** | | |
| S10 · Effects and Fetching | 4.1 Effects and Fetching (+ Part 1 refresher, "starting with Part 2" catch-up) | Live data from the API with loading, error and empty states, `useEffect` cleanup and an `AbortController` |
| S11 · Custom Hooks, Refs and the DOM | 4.2 Custom Hooks · 4.3 Refs and the DOM | `useApi`, `useDebouncedValue` and `useDocumentTitle`; server-side search; a `/` shortcut, focus management and a confirm dialog built on a portal and the browser's `<dialog>` |
| S12 · Suspense and Error Boundaries, and useReducer | 4.4 Suspense, use() and Error Boundaries · 5.1 useReducer with Discriminated Unions | A cleanup page with Suspense, `use()` and a typed error boundary; a roster reducer with `assertNever` and the check-in desk |
| S13 · Typed Context | 5.2 Typed Context + **Checkpoint 2** (30 min) | A typed auth context, sign-in against the API with roles, organizer-only drafts and Cancel; Checkpoint 2 on Modules 4 and 5 so far |
| S14 · Rendering Performance and Component Patterns | 5.3 Rendering Performance · 5.4 Component Patterns | Renders measured with the Profiler and the React Compiler turned on; a polymorphic Button, a generic DataList and accessible compound Tabs |
| S15 · React Router 8, Search Params and Nested Routes | 6.1 React Router 8 · 6.2 Search Params, Nested Routes and Typed Navigation | A typed route list in data mode with a layout, NavLinks and an error page; filters and page numbers in the address; the Volunteers page with a nested route |
| S16 · Data Loading and Protected Routes | 6.3 Data Loading and Protected Routes (+ Part 2 project kickoff) | Route loaders, one error page, guard loaders with a safe `?next=`, a 403 for the wrong role and a sign-in route action; the Part 2 project started |
| S17 · Part 2 Project Check-in and Assessment | — (project check-in, the **Part 2 assessment**, demos, review) | The Part 2 project presented; a scored Part 2 assessment |
| **Part 3: Production React** | | |
| S18 · TanStack Query | 7.1 TanStack Query (+ Parts 1–2 refresher, "starting with Part 3" catch-up) | Typed `queryOptions` factories, loaders that fill the cache, the Impact page with its chart |
| S19 · Mutations and Client State | 7.2 Mutations · 7.3 Client State | Planning and canceling that save, an optimistic check-in desk with a rollback; a persisted Zustand store for theme and density |
| S20 · React Hook Form + Zod and Complex Forms | 8.1 React Hook Form + Zod · 8.2 Complex Forms | One Zod schema for an edit form's checks and types, the API's field errors through `setError`; an impact report with a field array, an error summary and a photo upload |
| S21 · Testing Components | 9.1 Testing Components + **Checkpoint 3** (30 min) | Vitest and Testing Library set up with typed factories and a render helper: the HQ's first 29 tests; Checkpoint 3 on Modules 7 and 8 |
| S22 · Interactions, Async, End-to-End and Accessibility Tests | 9.2 Interactions and Async · 9.3 End-to-End and Accessibility Tests | user-event and MSW 3 tests on the real routes and guards (46 tests); Playwright journeys against the real API with axe in both themes |
| S23 · Performance and the Build | 10.1 Performance and the Build | Lazy routes and `codeSplitting` groups, a treemap, an end-to-end size budget and a CSV export |
| S24 · Deploying | 10.2 Deploying (+ launch-readiness check; accounts in class) | A demo-mode build, `_redirects` and `_headers`, the course folder as a Git repository with a GitHub Actions workflow; the demo live on Netlify Free (no real deploy required to pass) |
| S25 · Final Project Workshop and Next Steps | 11.1 Final Project · 11.2 Next Steps | A chosen brief, a charter and the start of Milestone 1 in the final-project starter; the advanced TypeScript of libraries and teams; milestone dates, a peer reviewer and a showcase slot |
| S26 · Final Project Showcase and Final Assessment | — (evidence check, showcase, the **final assessment**, retrospective) | A presented final project; the written final assessment |

**Why this shape (and the timing trade-off):** the lessons were written and timed honestly for a solo learner at
115 to 160 minutes each, so two of them come to more than the roughly 150 room minutes left once the warm-up,
break and wrap-up are out. They do not fit whole, and the kit does not pretend they do. The room protects what is
hardest alone: the **mental model**, a **live demo** learners type along with, the **guided lab** (new practice
on the lesson's ideas, never the lesson's own project) and **starting** each lesson project together. Home gets
the rest: finishing the lesson projects, the exercises, quiz and journal, about two to three hours between
sessions (the final project about 25 hours after Session 25). Every facilitator guide says, for its session, what
is done in the room, what goes home, what to protect and what to cut first if you run long.

Every session runs 0:00 to 3:00 with one 10-minute break: a warm-up (retrieval questions and a check that every
laptop is at the state the session starts from), the lessons (frame, demo, guided lab, project start) and a
wrap-up (exit ticket, homework, the next session's bring list). Session 1 opens with 30 minutes of welcome,
environment check and diagnostic; Sessions 10 and 18 open with a refresher and the catch-up; Session 24 opens with
the launch-readiness check. Checkpoints 1, 2 and 3 (30 minutes each) sit in Sessions 4, 13 and 21.

### Teaching one part, or two

Each part **runs as its own block**. Nothing in a part depends on a later one, and no part needs Docker,
WordPress or any back end other than the course's own `shoreline-api`.

- **Part 1 alone** (Sessions 1 to 9, 27 hours) is a complete short course: workspace, the TypeScript you need, and
  React in TypeScript up to forms and accessible components. Session 9's facilitator guide closes either the course
  (completion, next steps, evaluation) or Part 1 (Part 2 preparation as homework).
- **Part 2 alone, or joining at Part 2** (Sessions 10 to 17): learners need TypeScript's types, unions and guards
  and React components, state and events, from Part 1 or elsewhere. Session 10 opens with a Part 1 refresher and
  the catch-up. **Catch-up code:** the course download `lesson-13-start.zip` (the finished code of Lesson 3.6:
  `shoreline-api`, `shoreline-hq`, `ts-lab`), unzipped into a fresh `shoreline` folder, `.env.local` copied from
  `.env.example`, `npm ci` in `shoreline-hq`, the API started with `node server.ts`, then the environment check in
  `labs/module-10/l4_0-starting-part-2/` (its `lab.json` proves the check says READY on that download) and a clean
  `npm run build`.
- **Part 3 alone, or joining at Part 3** (Sessions 18 to 26): learners need a typed React app with fetching,
  context and React Router. Session 18 opens with a Parts 1 and 2 refresher and the catch-up. **Catch-up code:**
  `lesson-24-start.zip` (the finished code of Lesson 6.3), the same steps, and the check in
  `labs/module-18/l7_0-starting-with-part-3/`; then sign in as the sample organizer to reach where Lesson 7.1
  begins.
- **Two parts as one block:** Parts 1–2 or Parts 2–3 (17 sessions, 51 hours each).

The setup guide's **Joining Part 2 or Part 3** section has the learner version of these steps; send it a week
ahead to newcomers. `shoreline-api.zip` on the course site is the API on its own, for anyone who has nothing yet.
The sell sheet and `LICENSE.md` price the full program, two consecutive parts, and each part on its own.

### Primary documents: the combined books (start here)

| File | Audience | Contents |
|------|----------|----------|
| `participant-workbook.{html,pdf}` | Learner | The complete workbook: all 26 sessions as chapters with Part dividers (goals, key ideas, worked examples, guided-lab steps, predict-then-run items, a 12-item self-check, homework checklist; Session 1's Start Here page with the environment checklist and the diagnostic; the checkpoint pages; the part project and final project pages) |
| `facilitator-guide.{html,pdf}` | Instructor | The complete teaching manual: per session, Before the Session (prep checklist, files, known environment traps), the 0:00–3:00 agenda, warm-up with answers and the state check, lesson plans with live-demo scripts (every command run for real in a learner's terminal, with its output), the mistakes to expect, checks for understanding, closing (exit ticket, homework, next bring list) and "If you run long or short" |
| `answer-key.{html,pdf}` | Instructor | Every self-check item answered with reasons, lab solution notes with the solutions' real output, the lesson pages' own quiz answers, warm-up, diagnostic, exit-ticket and checkpoint answers with rubrics (confidential) |

**Self-check items:** 12 per session, 26 × 12 = **312**, every one answered in the answer key. The workbook quiz,
the answer key and the guide's compact answers are generated from one item list per session and are checked to
match word for word, with the correct letters balanced.

The editable per-session docs live in `source/module-NN/`. **They are generated** (see "Editing and building"):
change a session through its generator, then run `python3 build-combined.py` to regenerate the three books and
re-render their PDFs.

### Kit-wide documents

| File | Audience | Purpose |
|------|----------|---------|
| `setup-guide.html` | Learner (+ a facilitator page) | Before-you-begin guide, the same steps as Lesson 1.2: Node.js 24 LTS or newer, VS Code, the course folder `shoreline` with `shoreline-api` unzipped and running, `shoreline-hq` created with `npm create vite@latest`, `labs/` and the environment check; common install problems; the internet each session needs; the Session 24 accounts; **Joining Part 2 or Part 3**; and a room, network and demo-machine checklist. Send it a week before Session 1 |
| `quick-setup.html` | Learner | Two-page quick setup: Node, VS Code, the course folder, the API, the Vite project, the check. Send it with the full setup guide |
| `final-assessment.html` | Instructor | The **Part 1 project and assessment**, the **Part 2 project and assessment** (each for a different fictional client: brief, milestones, rubric, scoring, model-solution notes) and the **final project** (Lesson 11.1's kit and rubric, reproduced exactly, with facilitation, milestones, the showcase and the written final assessment) (confidential) |
| `sell-sheet.html` | Prospective instructors | One-page overview: who it is for, the ways to run it (full program, one part, two parts), outcomes, what is included, license tiers |
| `README.md` · `LICENSE.md` | — | This overview and the tiered license template |

**Slide decks:** one per session in `slides/` (`module-NN-<slug>.html`), 25 to 36 slides each, 793 in all (counts
per session below). Each deck is one self-contained file: open it in a browser, arrow keys or space to advance.
Code on the slides is copied from the course's stage files and checked like lesson code; course screenshots are
referenced from the course's `images/` folder (the kit folder stays inside the course folder), never copied; every
slide fits a 1280×720 projector.

**Labs:** `labs/module-01/` … `labs/module-26/`, one folder per lesson (`lM_N-<slug>/`: `TASKS.md` with two or
three new practice tasks, `lab.json`, `starter/`, `solution/`, optional `fixtures/` and `debug_*` "find the bug"
handouts), each session with a `README.md` for learners. Labs run **without a server**: TypeScript on Node with
`node --test` and `tsc`, or Vitest with Testing Library and MSW 3, on real API answers saved in `fixtures/`; the
few that need the API start a private copy of `shoreline-api`. As shipped, every starter fails where it should (a
failing test with a `TODO` message, or the type check reporting the TODO) and every solution passes its tests and
its type check. Session 1 adds the environment check and the diagnostic pair (`labs/module-01/l1_0-orientation/`);
Sessions 10 and 18 the catch-up checks (`l4_0-starting-part-2/`, `l7_0-starting-with-part-3/`); Session 24 the
launch-readiness check (`labs/module-24/l10_2-deploying/launch_check.mjs`); Session 26 the final project's evidence
check (`labs/module-26/showcase-preflight/`). The checkpoints live in `labs/module-NN/checkpoint-N/`, the Part 1
assessment's practical in `labs/module-09/part1-practical/`, and the part projects in
`labs/projects/part1-juniper-hill-garden/` and `labs/projects/part2-basalt-peak-routes/` (brief, rubric, notes, a
model solution proved by `check_labs.py`). Session 17 has no lab folder. The format and the rules are in
`labs/README.md`.

**Per session (counted from the decks' `<section class="slide">` elements and the `lab.json` files):**

| Session | Slides | Lab folders | Checked runs |
|---|---|---|---|
| 1 | 34 | 3 | 19 |
| 2 | 35 | 2 | 9 |
| 3 | 34 | 2 | 9 |
| 4 | 29 | 2 | 9 |
| 5 | 31 | 1 | 4 |
| 6 | 31 | 2 | 8 |
| 7 | 28 | 1 | 4 |
| 8 | 30 | 1 | 6 |
| 9 | 26 | 1 | 3 |
| 10 | 29 | 2 | 11 |
| 11 | 30 | 2 | 8 |
| 12 | 27 | 2 | 8 |
| 13 | 30 | 2 | 11 |
| 14 | 36 | 2 | 12 |
| 15 | 35 | 2 | 10 |
| 16 | 35 | 1 | 6 |
| 17 | 27 | — | — |
| 18 | 29 | 2 | 9 |
| 19 | 32 | 2 | 7 |
| 20 | 33 | 2 | 8 |
| 21 | 28 | 2 | 9 |
| 22 | 30 | 2 | 9 |
| 23 | 25 | 1 | 7 |
| 24 | 29 | 1 | 8 |
| 25 | 34 | 2 | 14 |
| 26 | 26 | 1 | 4 |
| Part 1 project (Juniper Hill Community Garden) | — | 1 | 6 |
| Part 2 project (Basalt Peak Climbing Gym) | — | 1 | 8 |
| **Total** | **793** | **45** | **226** |

**Downloads on the course site** (public, used by the lessons and the kit; the kit never duplicates them):
`shoreline-api.zip` (the mock API: Node runs its TypeScript directly, no install), `lesson-NN-start` and
`lesson-NN-end` (+ `.zip`) for every lesson that changes code (Lessons 1.2 to 10.2 and 11.2; the catch-up code and
the instructor's reset points; Lesson 1.1 runs in the TypeScript Playground and Lesson 11.1 changes no course code),
and `final-project-kit/` (+ `.zip`: worksheet, seven client briefs, the rubric, the peer-review checklist and a
verified `starter/` with the course's tooling and an in-app mock API).

The public **syllabus** lives in the course root, one level up from `instructor-kit/`, so it stays public:
`syllabus.html` (screen, light/dark), `syllabus-print.html` (print-first, with the part options noted) and
`React-TypeScript-Syllabus-26-sessions.pdf`. They are generated (see "Editing and building").

**Still to do before selling:** `LICENSE.md` is a plain-language **template**: have it reviewed by a lawyer
before commercial distribution. Pricing in the sell sheet and the license is a **suggested anchor**: the
bracketed prices are placeholders set at point of sale.

---

## Folder layout

```
instructor-kit/
├─ participant-workbook.{html,pdf}   ← canonical hand-out books (all 26 sessions, Part dividers)
├─ facilitator-guide.{html,pdf}
├─ answer-key.{html,pdf}
├─ setup-guide / quick-setup / final-assessment / sell-sheet  (.html + .pdf)
├─ slides/            one self-contained deck per session: module-NN-<slug>.html (NN = 01 … 26)
├─ labs/              check_labs.py, README.md (the lab format and rules),
│                     module-01/ … module-26/: per lesson a folder lM_N-<slug>/ (TASKS.md, lab.json,
│                     starter/, solution/, fixtures/, debug_*), a README.md per session;
│                     module-01/l1_0-orientation/ = environment check + diagnostic;
│                     module-10/l4_0-starting-part-2/, module-18/l7_0-starting-with-part-3/ = catch-up checks;
│                     module-04/, module-13/, module-21/ checkpoint-N/;
│                     module-09/part1-practical/ = the Part 1 assessment's practical;
│                     module-24/l10_2-deploying/launch_check.mjs = the launch-readiness check;
│                     module-26/showcase-preflight/ = the final project's evidence check;
│                     projects/part1-juniper-hill-garden/, projects/part2-basalt-peak-routes/ = the part projects
├─ source/            module-01/ … module-26/ per-session docs (generated; they build the books)
├─ _parts/            the three fragments final-assessment.html is assembled from
├─ kit.css            shared print-first stylesheet (the course site's TypeScript blue)
├─ build-combined.py  regenerate the 3 books from source/
└─ README.md · LICENSE.md
```

Every document is print-ready (a **Print / Save as PDF** button and a tuned print layout, US Letter) and
readable on a phone.

The whole `instructor-kit/` folder is kept **off the live site**: the course root's `_redirects` returns 404 for
`/instructor-kit/*` and `/instructor-kit`. It lives in the repository only.

## How to teach from it

1. **A week before Session 1**, send learners the **setup guide** (and the two-page quick setup) with the `labs/`
   folder **without the `solution/` folders** and without `labs/projects/`; ask each learner to copy `labs/` into
   their course folder (`shoreline/labs/`), start the API (`node server.ts` in `shoreline-api`), run
   `node labs/module-01/l1_0-orientation/check_environment.mjs` from `shoreline` and reply with its last line
   (`READY for React + TypeScript: Build a Modern Web App`). No reply means an install risk: chase it.
2. **Hand out** each session's `labs/module-NN/` the same way (also on a USB stick, with the Node installers,
   `shoreline-api.zip` and `lesson-02-end.zip`, for a room with slow Wi-Fi). Hold back checkpoint and assessment
   material until the moment it is used.
3. **Before each session**, read that session's facilitator guide: Before the Session (files, the state the
   session starts from, known environment traps), the agenda, each lesson's live-demo script, the mistakes to
   expect, and "If you run long or short". Run `python3 labs/check_labs.py module-NN` once (below).
4. **Present** from the session's deck in `slides/`; type the demos live in your own course folder (VS Code at a
   large font, the terminal at 18 pt or more, two terminals named "api" and "hq", the browser's DevTools docked).
   Your projector workspace follows the lessons like the learners' do; the course's `lesson-NN-start` downloads are
   your reset points.
5. Learners work in the **participant workbook** and keep a **learning journal**.
6. Check self-checks, warm-ups and exit tickets with the **answer key**; score Checkpoints 1 to 3, the part
   projects and assessments and the final project with their rubrics.
7. **Before Part 2 and Part 3**, send the setup guide's **Joining Part 2 or Part 3** section to anyone joining or
   with a broken course folder. Before Session 22, ask learners to run `npx playwright install chromium` at home
   if they can (Lesson 9.3 downloads Playwright's browser); before Session 24, to install Git and, if they like,
   create the free GitHub and Netlify accounts (Session 23's homework). Session 24 opens with the launch-readiness
   check, including a network-filter test on a phone on mobile data; no real deploy is required to pass.

### The state a session starts from

There is one workspace all the way through: the learner's course folder `shoreline/` with `shoreline-api` (the
mock API, never edited), `shoreline-hq` (the app) and, from Session 2, `ts-lab` (Module 2's TypeScript
workbench). Every lesson changes `shoreline-hq` a little; the course's stage after each lesson is the reference
(`lesson-NN-start` = the finished code of the lesson before). Every session's warm-up checks that each laptop is
at the state the session starts from, with the fix for the usual differences. The addresses are the same for
everyone: the API at `http://localhost:4000/api` (`node server.ts`), the dev server at `http://localhost:5173`
(`npm run dev`), the preview at `http://localhost:4173`. The API keeps its data in memory: a restart brings the
sample data back, with the cleanups placed around today's date.

All data is fictional: Shoreline Crew, its sites, cleanups, volunteers and organizers, the clients of the part
projects and assessments, and the final-project briefs. Email addresses use `example.com`; the API's sample
accounts share the public demo password `shoreline-demo`, for local practice only.

## Checkpoints and assessments

- **Checkpoint 1 (Session 4, 30 minutes):** an individual task on Module 2's TypeScript (Lessons 2.1 to 2.4).
  Five-row rubric in the guide, model answer in the answer key, code in `labs/module-04/checkpoint-1/`. Formative.
- **Checkpoint 2 (Session 13, 30 minutes):** Modules 4 and 5 so far (a typed data Hook, a reducer on a
  discriminated union, that reducer shared through a typed context). **Checkpoint 3 (Session 21, 30 minutes):**
  Modules 7 and 8. Same format.
- **Part 1 project (kickoff in Session 8, check-in in Session 9) and Part 1 assessment (Session 9):** the **Plot
  Board** for Juniper Hill Community Garden, a typed React app from local data (types, unions and guards,
  components, state and events, a form with an action, CSS Modules and accessibility); the assessment is a written
  part (closed book, 10 points) and a practical (`labs/module-09/part1-practical/`, 10 points). **Part 1 met** = the
  project complete under its rubric with no row at 0, and 14 or more of 20 points (70 %) on the assessment. Rubric,
  scoring and model-solution notes in `final-assessment.html`; the model solution in
  `labs/projects/part1-juniper-hill-garden/`, proved by `check_labs.py` (tests, `tsc`, oxlint with jsx-a11y,
  `vite build`). When Part 1 runs alone, this is the course result.
- **Part 2 project (kickoff in Session 16, check-in in Session 17) and Part 2 assessment (Session 17):** **Basalt
  Peak Routes**, a route board for Basalt Peak Climbing Gym, on the gym's own small mock API (fetching, a reducer
  and typed context, React Router 8 with loaders, filters in the address and a protected route); a written
  assessment on Lessons 4.1 to 6.3 (closed book, 20 points). **Part 2 met** = the project complete with no rubric
  row at 0, and 14 or more of 20 (70 %). Same materials, in `final-assessment.html` and
  `labs/projects/part2-basalt-peak-routes/`.
- **Final project (Sessions 25 and 26):** Lesson 11.1's final-project kit (`downloads/final-project-kit/` on the
  course site: worksheet, seven client briefs, the rubric of 10 rows scored 0 to 2, the peer-review checklist and
  the starter) is the source; the kit adds facilitation, milestones, the showcase run-sheet and the written final
  assessment (24 items, 27 points), and never a second rubric that disagrees with the lesson's. **Course complete** =
  the final project complete under Lesson 11.1's rubric (no row at "not yet") **and** the written final passed with
  at least 19 of 27 points (70 %). The rubric's Launch row asks for a public link on a free static host, so learners
  who skipped Session 24's deploy need a GitHub account by Milestone 1 and a Netlify account by Milestone 2.

## Requirements

- **Each learner:** a Windows 10/11, macOS or Linux laptop with permission to install software and a few gigabytes
  free; **Node.js 24 LTS or newer** with npm (checked on 24.22.2; the API also on 26.13.0); **VS Code** (with the
  TypeScript Native Preview extension if VS Code does not yet use TypeScript 7; the Oxc extension optional); a
  current Chrome, Edge or Firefox; **Git** from Session 24; free **GitHub** and **Netlify** accounts, set up for
  Session 24 (optional there: no real deploy is required to pass it) and needed for the final project's launch.
- **Internet** for npm installs (Session 1's prework, then Sessions 2, 8, 14, 15, 18 to 23 and 25), the first
  `npm install` in each lab's `starter/`, Playwright's Chromium (Session 22), GitHub and Netlify (Session 24), and
  the course site's downloads. The setup guide lists the hosts to allow through a school or company filter.
- **The instructor:** the same workspace on the demo machine, plus a projector at 1280×720 or more.
- **For the facilitator's lab check (`check_labs.py`):** Python 3.10 or newer (standard library only) on macOS,
  Linux or Windows with WSL (it uses POSIX file locks), and Node.js 24 (`RTS_NODE=/path/to/node/bin` if it is not
  the course tools' path). With the author's course tools present, every command runs in a pseudo-terminal (what a
  learner's terminal shows); without them, through a plain pipe (same verdicts).

## Checking the labs (`labs/check_labs.py`)

```bash
cd instructor-kit
python3 labs/check_labs.py module-03                 # every lab of Session 3
python3 labs/check_labs.py module-03 -v              # also print each run's output
python3 labs/check_labs.py module-01/l1_2-your-workspace       # one lab folder
python3 labs/check_labs.py projects/part1-juniper-hill-garden  # one part project
python3 labs/check_labs.py --all                     # every session and the part projects
python3 labs/check_labs.py module-01 --no-api        # skip the runs that need shoreline-api
python3 labs/check_labs.py module-01 --api http://localhost:4000   # use YOUR running API instead
```

Every run works in a fresh copy of the lab folder (removed afterwards); each `package-lock.json` is installed
once into a shared cache and hard-linked into the copies, so `node_modules` is never committed or installed twice.
A run declares its command, the exit code it expects and texts its output must or must not contain; starters must
fail where they should, solutions must pass, and every solution with a `tsconfig.json` must also pass its type
check (Node and Vitest strip types without checking them). The few runs that need the API start a **private** copy
of `shoreline-api` on its own port (42NN for Session NN, never the learners' 4000) with a fixed sample date, so the
outputs are the same every day. Runs that need a learner's course folder copy a course download (`"course":
"lesson-13-start"`) with its packages installed; they are skipped when the downloads are not on the machine.
**Buyer mode:** without the author's course tools, the checker starts `shoreline-api` from `shoreline/shoreline-api`
next to `labs/` (or `--api-dir PATH`), or uses `--api URL`.

## Editing and building

```bash
cd instructor-kit
python3 build-combined.py                 # regenerate the 3 books from source/ (with Part dividers)
python3 labs/check_labs.py --all          # run every lab
```

The author's tools in `~/projects/_kit_tools/typescript/` (not shipped with a licensed kit):

```bash
python3 check_kit_rts.py 01 … 26          # per session (or --all): agenda sums to 180 with contiguous clocks
                                          # and one Break, checkpoint rows, lesson titles match
                                          # course-config.json, quiz identical across workbook/key/guide,
                                          # lesson-quiz letters match the pages, lab folders and lab.json rules,
                                          # code on slides and in docs equals the stage files, screenshots
                                          # exist, decks fit 1280x720, nothing wider than 390 px, no console errors
python3 assemble_final_rts.py             # final-assessment.html from _parts/ (the three fragments) + the
                                          # pass-mark table; --check exits 1 if it is stale
python3 gen_syllabus_rts.py               # rebuild ../syllabus.html and ../syllabus-print.html
                                          # (session titles checked against build-combined.py MODULES;
                                          # outlines and homework read from the facilitator guides)
python3 render_pdfs_rts.py                # the seven kit PDFs + React-TypeScript-Syllabus-26-sessions.pdf,
                                          # page counts, and a 390 px check of every page
python3 rtskit.py -h                      # the course tools: per-lesson code stages, stage checks,
                                          # learner-accurate terminal output, the API and the downloads
```

**The generators are the source of truth.** Each session's three documents and deck are generated: the generator
for Session N is `~/projects/_kit_tools/typescript/kit_generators/SNN/gen_SNN.py`, with the blocks it runs in
`blocks_SNN.py` (demo code is read from the lesson pages and the stage files themselves) and the lab files from
`labs_SNN.py` (deterministic: run twice, same files). Everything shown is run for real through `kitlib_rts.py`:
shell, Node and TypeScript blocks in a scratch copy of the stage's app, requests against a private `shoreline-api`
with a fixed sample date, results cached next to the generator (`--fresh` reruns everything). Lab outputs in the
answer keys come from running the labs exactly as `check_labs.py` does. The part projects and the final project
come from `kit_generators/P1/`, `P2/` and `FINAL/`, which write the fragments in `_parts/` that
`final-assessment.html` is assembled from by `assemble_final_rts.py` (rerun it after any of the three; it adds the
kit shell and the pass-mark summary and stops if a fragment no longer states a pass mark the summary states). Tool
output quoted in the kit (tsc, oxlint, Vitest, Vite, Playwright) is captured in a pseudo-terminal without AI-agent
environment variables, so it reads exactly as on a learner's screen. To change a session, edit its generator, run
it from its own folder, check it (`check_kit_rts.py NN`, `labs/check_labs.py module-NN`), then rebuild the books,
the syllabus and the PDFs; hand edits to generated HTML and lab files (session lab READMEs included) are lost the
next time the generator runs. The kit-wide documents (this file, `LICENSE.md`, `labs/README.md`, the setup guide,
the quick setup, the sell sheet) are edited directly.

Or open any document and use **Print / Save as PDF** (Letter, 0.5 in margins, background graphics on).

---

## License

See `LICENSE.md`. Short version: licensed to a **single instructor or organization** to teach the kit; **not**
for resale; the facilitator guide, answer key and final assessment are **not** for learner distribution. The
Shoreline Crew materials, the part-project clients and the kit's labs are part of the licensed materials. Tiers
(Solo / Organization / White-label, for the full program, two consecutive parts or one part, plus an optional
updates add-on) are set at point of sale. Node.js, npm and the npm packages the lessons install (TypeScript, React,
Vite, React Router, TanStack Query, Zustand, React Hook Form, Zod, Vitest, MSW, Playwright and others, mostly MIT)
are not part of the kit: learners get them from their publishers under their own licenses (`LICENSE.md`,
Third-party).

© 2026 Ray de la Paz. React + TypeScript: Build a Modern Web App. All rights reserved.
