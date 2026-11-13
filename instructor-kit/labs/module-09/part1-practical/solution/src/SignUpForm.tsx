import { useActionState } from 'react'
import type { WorkDay } from './types.ts'

type SignUpState = { kind: 'editing'; error?: string } | { kind: 'done'; name: string }

// The form's action: the previous state and what was submitted give the next state
function signUp(_previous: SignUpState, formData: FormData): SignUpState {
  const value = formData.get('name')
  const name = typeof value === 'string' ? value.trim() : ''
  return name === '' ? { kind: 'editing', error: 'Enter your name.' } : { kind: 'done', name }
}

interface SignUpFormProps {
  day: WorkDay
}

export function SignUpForm({ day }: SignUpFormProps) {
  const [state, formAction] = useActionState(signUp, { kind: 'editing' })
  const error = state.kind === 'editing' ? state.error : undefined

  return (
    <>
      <p role="status">
        {state.kind === 'done' && `Thanks, ${state.name}: you are signed up for ${day.title}.`}
      </p>
      <form action={formAction} noValidate>
        <label htmlFor="name">Your name</label>
        <input
          id="name"
          name="name"
          aria-invalid={error !== undefined}
          aria-describedby={error !== undefined ? 'name-error' : undefined}
        />
        {error !== undefined && <p id="name-error">{error}</p>}
        <button type="submit">Sign up</button>
      </form>
    </>
  )
}
