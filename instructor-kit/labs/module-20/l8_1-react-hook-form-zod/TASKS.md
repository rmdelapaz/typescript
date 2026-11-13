# Lab 8.1: join the crew

New practice on Lesson 8.1: the crew wants a "join the crew" form (the HQ has none). One Zod schema describes the
answers once: the checks AND the types. React Hook Form runs the form. `src/api.ts` (the HQ's `ApiError` with the
API's `fieldErrors`) and `src/fields.ts` (the field names, the empty values, a type predicate) are given.

**Setup (once):** a terminal in `labs/module-20/l8_1-react-hook-form-zod/starter`, then `npm install`.
**Run:** `npm test` and `npm run typecheck`. As shipped, 7 of the 8 tests fail (the type test only fails in the
type check), and the type check reports the test's
"checked data" line: the starter's schema has no number in it yet.

## Task 1: one description of an answer (`schemas.ts`)

| Field | The box holds | The rule and its message |
|---|---|---|
| `name` | text, trimmed | empty: `Add your name.`; under 2 characters: `Use at least 2 characters for your name.`; over 60: `Keep your name to 60 characters or fewer.` |
| `email` | text | `z.email(…)`: `Enter an email address like name@example.com.` |
| `shirtSize` | text (`''` until a size is chosen) | one of `shirtSizes`: `z.string().pipe(z.enum(shirtSizes, …))`, `Choose a shirt size.` |
| `hoursPerMonth` | text | a whole number from 1 to 40: `Hours must be a whole number from 1 to 40.` (`z.coerce.number<string>()`) |

One rule with two messages for the name: `{ error: (issue) => … }` (Lesson 8.1). The third test is a type test:
`npm run typecheck` passes when the input type of the hours is `string` and the output type `number`.

## Task 2: the form (`JoinForm.tsx`)

`useForm` with `zodResolver(joinSchema)` and `defaultValues: emptyValues`, no type arguments. Register every box,
`<form onSubmit={handleSubmit(save)} noValidate>`, and under each box with a problem `<p id="NAME-error">` with the
message (the box gets `aria-invalid` and `aria-describedby`). An empty Join shows four messages, focuses the name and
sends nothing; a message disappears as soon as its box is fixed.

## Task 3: when the API says no

`onJoin` rejects with an `ApiError` whose `fieldErrors` use the API's plain-string keys
(the test sends `Some fields need attention.` with an `email` message and a key the form does not have). `setError` each
key `isJoinField` accepts (the first one gets the focus), and `'root.server'` with the API's message for the status
line. Any other failure: `Not sent. Try again in a moment.`, and the typed answers stay.

Done when `npm test` says `Tests  8 passed (8)` and `npm run typecheck` prints nothing after its two `>` lines.
**Stretch:** check each box when the person leaves it (`mode: 'onTouched'`), and try `useForm<z.infer<typeof
joinSchema>>(...)`: read the TS2322 from the bottom up.
