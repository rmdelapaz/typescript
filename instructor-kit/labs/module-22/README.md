# Session 22 labs: Interactions, Async, End-to-End and Accessibility Tests

Copy the whole `labs/` folder into your course folder once (`shoreline/labs/`), if you have not already. Work in
the `starter/` folders; each `TASKS.md` says what to do and when you are done. No shoreline-api needed.

| Folder | What it is | Needs |
|---|---|---|
| `l9_2-interactions-and-async/` | write tests that type, click and wait for a sign-up form, with a mock API inside the tests (MSW 3), then prove them on planted bugs (`debug_SignUpForm.tsx`) | `npm install` once in `starter/` (Vitest, Testing Library, user-event, MSW) |
| `l9_3-end-to-end-and-accessibility-tests/` | Playwright journeys and axe scans in light and dark on a small static page with two accessibility bugs to find and fix | `npm install` once in `starter/` (Playwright, axe); the Chromium from Lesson 9.3; port 4322 free |

These labs never run inside `shoreline-hq`, and nothing here changes it.
