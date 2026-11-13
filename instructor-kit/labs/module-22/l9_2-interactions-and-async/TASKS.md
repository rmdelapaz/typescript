# Lab 9.2: Tests that type, click and wait

New practice for Lesson 9.2 (Interactions and Async). `src/SignUpForm.tsx` is a small sign-up form (not
shoreline-hq): it fetches the spots left for cleanup e08, takes a name, and POSTs it. `src/test/server.ts` is its
mock API: MSW answers inside the tests, with `api.reset()`, `api.fill()` (every spot taken), `api.signups` and
`recordRequests()`. The app code and the mock API are written; **you write the tests** in
`src/SignUpForm.test.tsx` (its first lines, the mock API's life cycle, are given).

**Run:** a terminal in `starter/`: `npm install` once, then `npm test` and `npm run typecheck`. As shipped, the
tests fail with `TODO 1` and `TODO 2`. No API server needed.

## Task 1: type, click and wait

1. `renderForm()`: `const user = userEvent.setup()` BEFORE `render(<SignUpForm apiUrl={API_URL} eventId="e08" />)`;
   return `{ user }`.
2. The spots: `Checking the spots…` at first, then `6 spots left` (which query waits?).
3. A sign-up: type `Diego Herrera` into the field labelled `Your name`, click `Sign up`, then
   `You are on the list, Diego Herrera.`, `5 spots left`, and `api.signups` holds the name. Await every action.
4. The keyboard alone: one Tab reaches the field (`toHaveFocus`), `user.keyboard('Ana Lima{Enter}')` signs up.

## Task 2: when something is wrong (and what must not happen)

1. No name: `Add your name.`, the field has `aria-invalid="true"`, and NO request was sent (start
   `recordRequests()` after the spots have loaded, so the log holds only what the click caused).
2. A full cleanup: `api.fill()` first, then the API's real 409 shows `This cleanup is full.` in the alert and
   nobody was added. No override needed: prefer the real rule.
3. A failing server: `server.use(...)` answers this one test's POST with 500 and a message you choose, typed
   `satisfies ApiErrorBody`; the alert shows it and the button is enabled again.

## Task 3: prove the tests catch bugs

`../debug_SignUpForm.tsx` hides two bugs. Keep a copy, copy the handout over `src/SignUpForm.tsx`, run `npm test`,
read the failures, put the original back. Done when the handout turns at least two tests red (the course's solution: three), and with the real
form `npm test` shows `Tests  6 passed (6)` and `npm run typecheck` prints nothing after its two `>` lines.

**Try it:** remove one `await` before a `user.` call and run the tests: read what "Unable to find" says, then put
it back (Lesson 9.2, Common Mistakes).
