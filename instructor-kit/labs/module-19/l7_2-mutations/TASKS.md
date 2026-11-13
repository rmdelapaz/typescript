# Lab 7.2: the volunteer's side

New practice on Lesson 7.2, on the part of the crew the HQ does not cover: Theo, a volunteer, signs up for cleanups
and gives spots back. `src/api.ts` (requests), `src/queries.ts` (the cache and two queries), `EventSpots.tsx` and
`MySignups.tsx` are given. Mock Service Worker plays shoreline-api: it keeps the cleanups and Theo's sign-ups in
memory, seeded with real answers (`fixtures/`), so a POST changes what the next GET returns. The lab's cache has
`staleTime: Infinity`: nothing refreshes by itself, only what you invalidate.

**Setup (once):** a terminal in `labs/module-19/l7_2-mutations/starter`, then `npm install`.
**Run:** `npm test` and `npm run typecheck`. As shipped, all 7 tests fail.

## Task 1: sign up (`SignUpButton.tsx`)

Run `signUpMutation()` with `useMutation`. The button says `Sign up for TITLE` (and `Signing up…`, disabled, while
the request runs). After a success, `<p role="status">` says `You're signed up.` or `You're on the waiting list.`
(read the API's answer: `isSuccess` narrows `data`). After a failure, `<p role="alert">` shows an `ApiError`'s
message (the API's 409 says `You are already signed up for this cleanup.`), anything else `Not signed up. Try again in a moment.`

## Task 2: what could a sign-up have changed? (`signUpMutation`)

The Task 2 tests show the spots line and Theo's list next to the button: both stay as they were after signing up.
Add an `onSuccess` that invalidates every entry a sign-up could have changed (look at the keys in `queries.ts`),
and return its promise. Write down why you chose those keys.

## Task 3: give a spot back, at once (`cancelSignupMutation`)

Cancelling waits for the API today. Make it optimistic, like the check-in desk: `onMutate` cancels refetches of
`mySignupsQuery()`'s key, remembers the sign-up's old status and writes `'cancelled'` into the cached list;
`onError` puts the old status back (check that there is one: TypeScript will insist); `onSettled` invalidates what
a cancel changes. The tests hold the PATCH until they have looked at the screen.

Done when `npm test` says `Tests  7 passed (7)` and `npm run typecheck` prints nothing after its two `>` lines.
**Stretch:** should signing up be optimistic too? Write two sentences with the lesson's "wait or show it now" table.
