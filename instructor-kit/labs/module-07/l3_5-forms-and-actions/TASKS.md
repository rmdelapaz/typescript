# Lab 3.5: a sign-up sheet that keeps what people typed

New practice on Lesson 3.5's ideas, outside the course app: the paper sign-up sheet on the welcome table, as a
form. Volunteers give their name, email, shirt size and an optional note; nothing is sent anywhere.

**Setup (once):** a terminal in `labs/module-07/l3_5-forms-and-actions/starter`, then `npm install`.
**Run:** `npm test` and `npm run typecheck`. As shipped, three of six tests fail (one crashes with a `TypeError`)
and the type check is silent: `as string` hides the first problem from TypeScript. Never edit `lab.test.tsx`.

## Task 1: read the form safely (`src/signup.ts`, `readSignup`)

`formData.get()` returns `FormDataEntryValue | null`: a string, a File, or null when the form has no field with that
name. The starter promises TypeScript a string with `as string`, and the second test (a sheet with only a name)
crashes: `Cannot read properties of null (reading 'trim')`. Narrow with `typeof value === 'string'` instead (one
small helper for all four fields), so a missing field reads as `''`. Done when both Task 1 tests pass.

## Task 2: messages people understand (`src/signup.ts`, `validateSignup`)

Return the API's `fieldErrors` shape: field name to a list of messages, nothing for a field without problems. The
four rules and their exact messages are in the `TODO 2` comment. Use `isShirtSize` for the size (no `as`). Done when
both Task 2 tests pass.

## Task 3: keep what was typed, and say which field is wrong (`src/SignupForm.tsx`)

Submit the form with a mistake in the email: the message appears, and every field is EMPTY again, because React
resets the form after every action. Give every field `defaultValue` from the submitted values (the state has them),
add `key={values.shirt}` to the select (React 19.3 reads a select's defaultValue only when it creates it), and
connect fields and messages: `aria-invalid` on the field, `aria-describedby="email-error"` on the field and
`id="email-error"` on its message (the same for every field). A small helper that returns a field's props (like the
lesson's `fieldProps`) keeps it short. Done when `npm test` says `Tests  6 passed (6)` and `npm run typecheck`
prints nothing after its two `>` lines.

**Stretch:** make the action `async` and wait a second before it answers (`await new Promise((resolve) =>
setTimeout(resolve, 1000))`), then use `isPending`, the third value from `useActionState`, to disable the button and
change its text to `Signing up…` while it waits. Which type does the action return now, and what is the state's type?
