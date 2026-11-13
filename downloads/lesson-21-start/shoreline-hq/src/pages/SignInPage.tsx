import { useActionState, useEffect, useRef } from 'react'
import { ApiError, describeError } from '../api/client.ts'
import type { User } from '../api/types.ts'
import { useAuth } from '../auth/AuthContext.ts'
import { Button } from '../components/Button.tsx'
import { FieldError } from '../components/FieldError.tsx'
import formStyles from '../components/Form.module.css'
import { useDocumentTitle } from '../hooks/useDocumentTitle.ts'
import styles from './Page.module.css'

// What the form keeps between tries: the email (never the password) and what went wrong
interface SignInState {
  email: string
  fieldErrors: Record<string, string[]>
  message: string
}

const initialState: SignInState = { email: '', fieldErrors: {}, message: '' }

interface SignedInProps {
  user: User
}

// Shown instead of the form once someone is signed in
function SignedIn({ user }: SignedInProps) {
  const headingRef = useRef<HTMLHeadingElement>(null)

  // The form (and the button that had the focus) is gone: start reading from the new heading
  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  return (
    <>
      <h1 ref={headingRef} tabIndex={-1}>
        Signed in
      </h1>
      <p className={styles.lead}>
        Welcome, {user.name}. You are signed in as {user.email}.
      </p>
      <p>
        <a href="/events">Go to the cleanups</a>
      </p>
    </>
  )
}

export function SignInPage() {
  const { session, signIn } = useAuth()
  useDocumentTitle('Sign in')

  async function signInAction(_previous: SignInState, formData: FormData): Promise<SignInState> {
    const email = formData.get('email')
    const password = formData.get('password')
    if (typeof email !== 'string' || typeof password !== 'string') {
      return { ...initialState, message: 'The form is missing a field.' }
    }
    try {
      await signIn({ email, password })
      return initialState
    } catch (error: unknown) {
      // The API's answers are written for people: "Enter your password.", "Email or password is incorrect."
      if (error instanceof ApiError && error.fieldErrors !== undefined) {
        return { email, fieldErrors: error.fieldErrors, message: '' }
      }
      if (error instanceof ApiError && error.status === 401) {
        return { email, fieldErrors: {}, message: error.message }
      }
      console.error(error)
      return { email, fieldErrors: {}, message: describeError(error) }
    }
  }

  const [state, formAction, isPending] = useActionState(signInAction, initialState)

  if (session !== null) {
    return <SignedIn user={session.user} />
  }

  const { fieldErrors } = state
  return (
    <>
      <h1>Sign in</h1>
      <p className={styles.lead}>Organizers sign in to see drafts and today's check-in desk.</p>
      <form action={formAction} noValidate className={formStyles.form}>
        <p role="alert" className={formStyles.status}>
          {state.message}
        </p>
        <div className={formStyles.field}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="username"
            defaultValue={state.email}
            aria-invalid={fieldErrors.email !== undefined}
            aria-describedby={fieldErrors.email && 'email-error'}
          />
          <FieldError id="email-error" messages={fieldErrors.email} />
        </div>
        <div className={formStyles.field}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            aria-invalid={fieldErrors.password !== undefined}
            aria-describedby={fieldErrors.password && 'password-error'}
          />
          <FieldError id="password-error" messages={fieldErrors.password} />
        </div>
        <div className={formStyles.actions}>
          <Button type="submit" variant="primary" disabled={isPending}>
            {isPending ? 'Signing in…' : 'Sign in'}
          </Button>
        </div>
      </form>
    </>
  )
}
