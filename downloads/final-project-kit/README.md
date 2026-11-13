# Final Project Kit

React + TypeScript: Build a Modern Web App, Lesson 11.1 (Final Project).

| File | What it is |
|---|---|
| `worksheet.md` | The planning worksheet: charter, domain types, routes, data layer, state placement, forms, components and design, accessibility, performance budget, tests by level, environments and launch, milestones and time log. Copy it into your project and fill it in. |
| `briefs.md` | The seven client briefs from the lesson, plus the size rules for your own idea. |
| `rubric.md` | How the project is assessed (self, peer and instructor use the same rubric). |
| `peer-review.md` | The checklist a reviewer follows on your live link and your repository. |
| `starter/` | A React + TypeScript project to start from: Shoreline Crew HQ's tooling with the Shoreline Crew taken out. Its own `README.md` explains it. |

## The starter in one minute

Copy the `starter` folder to where you keep projects and rename it (for example `cobalt-repairs`).
Then, with Node.js 24 or newer:

    npm ci
    npm run dev:demo

It has one example kind of thing (an `Item`), a mock API in `src/mocks` that answers in tests, in
`npm run dev:demo` and in the demo build, and every check from the course already wired: TypeScript 7,
oxlint, Vitest + Testing Library + MSW, Playwright + axe, the React Compiler, code splitting, the demo
build, `_redirects` and `_headers`, and a GitHub Actions workflow. The folder is meant to be its own Git
repository: `.github/workflows/ci.yml` sits at its top.

Milestone 1 (in the lesson) adds your types next to the example, your sample data and your mock API's
rules with tests. Milestone 2 replaces the example pages and deletes `Item`.

## How long it takes

The lesson's printed time covers reading, the worksheet and Milestone 1. The whole project is about 25
more hours, usually 20 to 30, best spread over three to five weeks. The worksheet's time log keeps
the estimate honest.
