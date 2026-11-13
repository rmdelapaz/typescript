# Final project starter

React + TypeScript: Build a Modern Web App, Lesson 11.1 (Final Project).

Shoreline Crew HQ's tooling at the end of Lesson 10.2, with the Shoreline Crew taken out: one example
kind of thing (an `Item`), a mock API that answers for it, and every check already wired. Nothing here is
specific to your brief yet. That is your job, starting with the types.

## Start

Node.js 24 or newer. In this folder:

    npm ci
    npm run dev:demo

Open http://localhost:5173. The list, an item page, the New item form and "Page not found" all work,
answered by the mock API in `src/mocks` inside your browser (no server to start).

## What is already set up

| Piece | Where | From |
|---|---|---|
| TypeScript 7, strict, `noUncheckedIndexedAccess`, `erasableSyntaxOnly` | `tsconfig.app.json` | Lessons 1.2, 2.4 |
| oxlint with the React, TypeScript and jsx-a11y plugins, zero warnings | `.oxlintrc.json` | Lessons 1.2, 3.6 |
| React Compiler, code-splitting groups `vendor` and `forms`, `npm run analyze` | `vite.config.ts` | Lessons 5.3, 10.1 |
| React Router 8 in data mode: a layout, an error page, a lazy page, not-found | `src/routes.tsx`, `src/components/AppLayout.tsx` | Lessons 6.1–6.3, 10.1 |
| Label tables as `Record`s, so a new union value can't be forgotten | `src/utils/labels.ts` | Lesson 3.3 |
| An API client that checks every answer, `ApiError`, `describeError` | `src/api/client.ts` | Lessons 2.4, 4.1 |
| TanStack Query: the client, query and mutation factories | `src/api/queries.ts`, `src/api/mutations.ts` | Lessons 7.1, 7.2 |
| A React Hook Form + Zod form with server field errors | `src/pages/NewItemPage.tsx`, `src/api/schemas.ts` | Lessons 8.1, 8.2 |
| A mock API (MSW handlers + sample data) used by tests, `dev:demo` and the demo build | `src/mocks/` | Lessons 9.2, 10.2 |
| Vitest + Testing Library + user-event + MSW: 11 tests | `src/**/*.test.ts(x)`, `src/test/` | Lessons 9.1, 9.2 |
| Playwright + axe: 4 end-to-end tests against the demo build | `e2e/`, `playwright.config.ts` | Lesson 9.3 |
| The demo build, its banner, `_redirects` and `_headers` for Netlify | `src/main.tsx`, `public/` | Lesson 10.2 |
| GitHub Actions: checks, then end-to-end tests | `.github/workflows/ci.yml` | Lesson 10.2 |

## Scripts

| Command | What it does |
|---|---|
| `npm run dev:demo` | Development server with the mock API in the browser (use this until you have a real API) |
| `npm run dev` | Development server against a real API at `VITE_API_URL` (copy `.env.example` to `.env.local`) |
| `npx tsc -b` | Type check everything |
| `npm run lint` | oxlint (CI adds `-- --deny-warnings`) |
| `npm test` | Vitest in watch mode (`npx vitest run` runs once) |
| `npm run build` / `npm run build:demo` | The normal build / the demo build with its own API |
| `npm run preview` | Serve the last build at http://localhost:4173 |
| `npm run test:e2e` | Build the demo, preview it and run Playwright (`npx playwright install chromium` once first) |
| `npm run analyze` | A map of the build in `dist/stats.html` |

## Make it yours (Milestone 1)

1. Name it: `"name"` in `package.json`, `appName` in `src/config.ts`, `<title>` in `index.html`, and your
   own `public/favicon.svg`.
2. Types first: add your brief's types to `src/api/types.ts`, NEXT to the example `Item` (the example pages
   keep working, so every check stays green). Give each union a label table in `src/utils/labels.ts`.
3. Sample data: 6 to 12 records per type in `src/mocks/db.ts`, one of them awkward on purpose.
4. Your API: routes and rules in `src/mocks/handlers.ts`, and a test file for them next to it.
5. Keep `npx tsc -b`, `npm run lint` and `npx vitest run` green after every step, and commit.

Milestone 2 replaces the Item pages with yours and deletes `Item` from `types.ts`: `npx tsc -b` then lists
every file that still expects it. Delete what you don't need (and its test); add what the HQ had and you
need (sign-in with a session store, Zustand, loaders and guards): copy the pattern from your Shoreline
Crew HQ and rename it.

## Make it a repository with CI

This folder is the whole repository: `package.json` sits next to `.github`. Then (Lesson 10.2):

    git init -b main
    git add .
    git status
    git commit -m "Start from the final-project starter"

Create an empty repository on GitHub, push, and watch the Actions tab: two jobs, the checks and then the
end-to-end tests.

## Deploy the demo

    npm run build:demo
    npx netlify-cli deploy --no-build --dir dist

Check the draft, then add `--prod`. Run the live launch checklist from Lesson 10.2 on the address.

## If your app has a real API

Point `VITE_API_URL` in `.env.local` at it, use `npm run dev`, add its server as a second `webServer` in
`playwright.config.ts`, and test the normal build against it (as the HQ does). Never put a secret in a
`VITE_` variable: everything in one ends up in the JavaScript visitors download.

## Checked for the course

Node.js 24.22.2, npm 11.19.1: `npm ci`, `npx tsc -b`, `npm run lint -- --deny-warnings`, `npx vitest run`
(11 tests), `npm run build`, `npm run build:demo` and `npm run test:e2e` (4 tests) all pass in a fresh copy
with `CI=true`; actionlint 1.7.12 accepts the workflow. The normal build's `index.html` preloads only the
`vendor` file: the `forms` file loads when someone opens the New item page.
