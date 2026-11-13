# Lab 9.3: A real browser, and axe in both themes

New practice for Lesson 9.3 (End-to-End and Accessibility Tests), with Playwright on a small static page instead
of the HQ: `site/` is the crew's "Beach sites" page (a search that waits 300 ms, keeps `?q=` in the address bar
and counts the results). `serve.ts` is the lab's tiny static server; `e2e/global-setup.ts` starts it on port
4322 before the tests and stops it after them (the HQ uses Playwright's `webServer` with `vite preview`).
The page has **two accessibility bugs** that no unit test could find; your tests will.

**Run:** a terminal in `starter/`: `npm install` once, then `npm run test:e2e` and `npm run typecheck`. Chromium
is the one you installed in Lesson 9.3 (`npx playwright install chromium` if Playwright says
`Executable doesn't exist`). As shipped, the tests fail with `TODO 1` and `TODO 2`. The first run can take a minute
or two before the first test starts (Lesson 9.3, version note); later runs take seconds.

## Task 1: three journeys (`e2e/sites.spec.ts`)

1. Search: the page has the level-1 heading `Beach sites` and the status `Found 6 sites.`; fill `cove` into
   `Search sites`; then `Found 2 sites.`, the two list items start with `Driftwood Cove` and `Seal Rock Cove`, and
   the address ends with `?q=cove`.
2. Reload: `/?q=harbor` shows `harbor` in the field and `Found 2 sites.`, and still 2 items after `page.reload()`.
3. Clear: on `/?q=jetty`, the button named `Clear the search` brings back all 6 and puts the focus in the field.
   It fails until you fix bug 1: read its error, then give the icon button a name (`aria-label`) in
   `site/index.html`.

Try `page.getByText('Cove')` once, read the strict mode error, and choose a better locator.

## Task 2: axe in both themes (`e2e/helpers.ts`, `e2e/a11y.spec.ts`)

1. `expectNoAxeViolations(page)` as in the lesson: WCAG A and AA tags, one `id: help (n)` line per violation,
   compared with `[]`.
2. A light and a dark test (`test.use({ colorScheme })` in a loop over `['light', 'dark'] as const`), each on
   `/?q=cove` after `Found 2 sites.` is visible.
3. Read the failures: which rule fails in both themes, which only in the dark one? Fix bug 2 in `site/styles.css`
   (the dark theme's `--muted`; `#a9b4c0` passes) and run again.

## Task 3: prove it

Done when `npm run test:e2e` shows `5 passed` and `npm run typecheck` prints nothing after its two `>` lines. Then
put the starter's `site/styles.css` back for a moment: only the dark test fails, with `color-contrast`.
