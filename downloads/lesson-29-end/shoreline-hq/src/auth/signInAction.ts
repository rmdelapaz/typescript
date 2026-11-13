// The sign-in form's action: the router calls it when the form is submitted (Lesson 6.3)
import { redirect, type ActionFunctionArgs } from 'react-router'
import { ApiError, describeError, postSignIn, saveSession } from '../api/client.ts'
import { nextPath } from './guards.ts'

/** What the form shows after a try that did not work: the email (never the password) and why */
export interface SignInResult {
  email: string
  fieldErrors: Record<string, string[]>
  message: string
}

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
  // Signed in: on to the page that sent them here (or home)
  throw redirect(nextPath(new URL(request.url)))
}
