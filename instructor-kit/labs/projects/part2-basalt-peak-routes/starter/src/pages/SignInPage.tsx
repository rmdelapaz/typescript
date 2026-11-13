import { useEffect, useRef } from 'react'
import { Form, useActionData, useNavigation } from 'react-router'
import type { signInAction } from '../auth/signInAction.ts'
import { FieldError } from '../components/FieldError.tsx'

export function SignInPage() {
  // undefined until the form has been sent once; after that, why the last try did not work
  const result = useActionData<typeof signInAction>()
  const isPending = useNavigation().state !== 'idle'
  const fieldErrors = result?.fieldErrors ?? {}
  const passwordRef = useRef<HTMLInputElement>(null)

  // After a try that did not work: empty the password box, then focus the first field to fix (or the password)
  useEffect(() => {
    const password = passwordRef.current
    if (result === undefined || password === null) return
    password.value = ''
    const firstInvalid = password.form?.querySelector<HTMLElement>('[aria-invalid="true"]')
    ;(firstInvalid ?? password).focus()
  }, [result])

  return (
    <>
      <h1>Sign in</h1>
      <p className="lead">Setters sign in to log new routes. Staff accounts can sign in too, but only read.</p>
      {/* The router's Form: submitting it calls the route's action (signInAction) */}
      <Form method="post" noValidate className="form">
        <p role="alert" className="form-message">
          {result?.message}
        </p>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="username"
            defaultValue={result?.email}
            aria-invalid={fieldErrors.email !== undefined}
            aria-describedby={fieldErrors.email && 'email-error'}
          />
          <FieldError id="email-error" messages={fieldErrors.email} />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            ref={passwordRef}
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            aria-invalid={fieldErrors.password !== undefined}
            aria-describedby={fieldErrors.password && 'password-error'}
          />
          <FieldError id="password-error" messages={fieldErrors.password} />
        </div>
        <button type="submit" className="primary" disabled={isPending}>
          {isPending ? 'Signing in…' : 'Sign in'}
        </button>
      </Form>
    </>
  )
}
