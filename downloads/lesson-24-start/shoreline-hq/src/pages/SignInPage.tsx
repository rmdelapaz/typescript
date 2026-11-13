import { useEffect, useRef } from 'react'
import { Form, useActionData, useNavigation } from 'react-router'
import type { signInAction } from '../auth/signInAction.ts'
import { Button } from '../components/Button.tsx'
import { FieldError } from '../components/FieldError.tsx'
import formStyles from '../components/Form.module.css'
import { useDocumentTitle } from '../hooks/useDocumentTitle.ts'
import styles from './Page.module.css'

export function SignInPage() {
  useDocumentTitle('Sign in')
  // undefined until the form has been sent once; after that, why the last try did not work
  const result = useActionData<typeof signInAction>()
  const navigation = useNavigation()
  const isPending = navigation.state !== 'idle'
  const fieldErrors = result?.fieldErrors ?? {}
  const passwordRef = useRef<HTMLInputElement>(null)

  // After a try that did not work: empty the password box (never keep a password around), then
  // put the focus on the first field to fix, or on the password
  useEffect(() => {
    const password = passwordRef.current
    if (result === undefined || password === null) return
    password.value = ''
    const firstInvalid = password.form?.querySelector<HTMLElement>('[aria-invalid="true"]')
    const target = firstInvalid ?? password
    target.focus()
  }, [result])

  return (
    <>
      <h1>Sign in</h1>
      <p className={styles.lead}>
        Organizers sign in to see drafts, the crew list and today's check-in desk.
      </p>
      {/* The router's Form: submitting it calls the route's action (signInAction) */}
      <Form method="post" noValidate className={formStyles.form}>
        <p role="alert" className={formStyles.status}>
          {result?.message}
        </p>
        <div className={formStyles.field}>
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
        <div className={formStyles.field}>
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
        <div className={formStyles.actions}>
          <Button type="submit" variant="primary" disabled={isPending}>
            {isPending ? 'Signing in…' : 'Sign in'}
          </Button>
        </div>
      </Form>
    </>
  )
}
