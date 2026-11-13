import { useActionState } from 'react'
import {
  emptySignup,
  readSignup,
  validateSignup,
  type SignupErrors,
  type SignupField,
  type SignupValues,
} from './signup.ts'

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

// The message under a field; the field points at it with aria-describedby
function FieldMessage({ field, messages }: { field: SignupField; messages: string[] | undefined }) {
  if (messages === undefined) {
    return null
  }
  return <p id={`${field}-error`}>{messages.join(' ')}</p>
}

export function SignupForm() {
  const [state, formAction] = useActionState(signUp, initialState)
  const values = state.kind === 'editing' ? state.values : emptySignup
  const errors = state.kind === 'editing' ? state.errors : {}

  // What every field needs: its name, what to show after the reset, and a link to its message
  function fieldProps(field: SignupField) {
    const invalid = errors[field] !== undefined
    return {
      id: field,
      name: field,
      defaultValue: values[field],
      'aria-invalid': invalid,
      'aria-describedby': invalid ? `${field}-error` : undefined,
    }
  }

  return (
    <>
      <p role="status">{state.kind === 'done' && `Thanks, ${state.name}! See you at the cleanup.`}</p>
      <form action={formAction} noValidate>
        <label htmlFor="name">Your name</label>
        <input {...fieldProps('name')} />
        <FieldMessage field="name" messages={errors.name} />

        <label htmlFor="email">Email</label>
        <input type="email" {...fieldProps('email')} />
        <FieldMessage field="email" messages={errors.email} />

        <label htmlFor="shirt">Shirt size</label>
        <select key={values.shirt} {...fieldProps('shirt')}>
          <option value="">Choose a size</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>
        <FieldMessage field="shirt" messages={errors.shirt} />

        <label htmlFor="note">Note for the organizer (optional)</label>
        <textarea {...fieldProps('note')} />
        <FieldMessage field="note" messages={errors.note} />

        <button type="submit">Sign up</button>
      </form>
    </>
  )
}
