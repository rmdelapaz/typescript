import { useEffect, useRef } from 'react'
import { Form, useActionData, useNavigation } from 'react-router'
import type { signInAction } from './signInAction.ts'

// The sign-in page: the router's Form sends its fields to the route's action (signInAction). Do not edit.
export function SignInPage() {
  // undefined until the form has been sent once; after that, why the last try did not work
  const result = useActionData<typeof signInAction>()
  const isPending = useNavigation().state !== 'idle'
  const fieldErrors = result?.fieldErrors ?? {}
  const passwordRef = useRef<HTMLInputElement>(null)

  // After a try that did not work: empty the password box and move the focus to it
  useEffect(() => {
    const password = passwordRef.current
    if (result === undefined || password === null) return
    password.value = ''
    password.focus()
  }, [result])

  return (
    <>
      <h1>Sign in</h1>
      <Form method="post" noValidate>
        <p role="alert">{result?.message}</p>
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" autoComplete="username" defaultValue={result?.email} />
          {fieldErrors.email?.map((message) => <span key={message}>{message}</span>)}
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <input ref={passwordRef} id="password" name="password" type="password" autoComplete="current-password" />
          {fieldErrors.password?.map((message) => <span key={message}>{message}</span>)}
        </p>
        <button type="submit" disabled={isPending}>
          {isPending ? 'Signing in…' : 'Sign in'}
        </button>
      </Form>
    </>
  )
}
