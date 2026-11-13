import { useActionState } from 'react'
import { emptySignup, readSignup, validateSignup, type SignupErrors, type SignupValues } from './signup.ts'

// What the sheet shows: what was typed and what to fix, or a thank-you
type SignupState =
  | { kind: 'editing'; values: SignupValues; errors: SignupErrors }
  | { kind: 'done'; name: string }

const initialState: SignupState = { kind: 'editing', values: emptySignup, errors: {} }

function signUp(_previous: SignupState, formData: FormData): SignupState {
  const values = readSignup(formData)
  const errors = validateSignup(values)
  if (Object.keys(errors).length > 0) {
    return { kind: 'editing', values, errors }
  }
  return { kind: 'done', name: values.name }
}

// Task 3. TODO 3: after a submit with mistakes the fields come back EMPTY (React resets the form after every
// action) and nothing tells a screen reader which field is wrong. Give every field its submitted value back
// (defaultValue; the select needs a key, as in Lesson 3.5), and connect each field to its message:
// aria-invalid="true" and aria-describedby="FIELD-error" on the field, id="FIELD-error" on the message.
export function SignupForm() {
  const [state, formAction] = useActionState(signUp, initialState)
  const errors = state.kind === 'editing' ? state.errors : {}

  return (
    <>
      <p role="status">{state.kind === 'done' && `Thanks, ${state.name}! See you at the cleanup.`}</p>
      <form action={formAction} noValidate>
        <label htmlFor="name">Your name</label>
        <input id="name" name="name" />
        {errors.name && <p>{errors.name.join(' ')}</p>}

        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" />
        {errors.email && <p>{errors.email.join(' ')}</p>}

        <label htmlFor="shirt">Shirt size</label>
        <select id="shirt" name="shirt">
          <option value="">Choose a size</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>
        {errors.shirt && <p>{errors.shirt.join(' ')}</p>}

        <label htmlFor="note">Note for the organizer (optional)</label>
        <textarea id="note" name="note" />
        {errors.note && <p>{errors.note.join(' ')}</p>}

        <button type="submit">Sign up</button>
      </form>
    </>
  )
}
