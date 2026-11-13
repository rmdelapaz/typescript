import { redirect, type ActionFunctionArgs } from 'react-router'
import { ApiError, postSignIn } from './api.ts'
import { nextPath } from './guards.ts'
import { saveSession } from './session.ts'

/** What the form shows after a try that did not work: the email (never the password) and why */
export interface SignInResult {
  email: string
  fieldErrors: Record<string, string[]>
  message: string
}

/** The sign-in form's action: the router calls it when the Form is submitted (Task 3) */
export async function signInAction({ request }: ActionFunctionArgs): Promise<SignInResult> {
  const formData = await request.formData()
  const email = formData.get('email')
  const password = formData.get('password')
  if (typeof email !== 'string' || typeof password !== 'string') {
    return { email: '', fieldErrors: {}, message: 'The form is missing a field.' }
  }
  try {
    saveSession(await postSignIn({ email, password }))
  } catch (error: unknown) {
    if (error instanceof ApiError && error.fieldErrors !== undefined) {
      return { email, fieldErrors: error.fieldErrors, message: '' }
    }
    if (error instanceof ApiError && error.status === 401) {
      return { email, fieldErrors: {}, message: error.message }
    }
    throw error
  }
  // Signed in: on to the page that sent them here, or home. Throwing keeps the return type SignInResult.
  throw redirect(nextPath(new URL(request.url)))
}
