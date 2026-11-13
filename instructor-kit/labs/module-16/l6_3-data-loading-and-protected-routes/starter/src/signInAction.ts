import type { ActionFunctionArgs } from 'react-router'

/** What the form shows after a try that did not work: the email (never the password) and why */
export interface SignInResult {
  email: string
  fieldErrors: Record<string, string[]>
  message: string
}

/** The sign-in form's action: the router calls it when the Form is submitted (Task 3) */
export async function signInAction(_args: ActionFunctionArgs): Promise<SignInResult> {
  // TODO 3: read the fields with await request.formData() and narrow them with typeof (each is
  // FormDataEntryValue | null). Then saveSession(await postSignIn({ email, password })). For an ApiError with
  // fieldErrors, return { email, fieldErrors, message: '' }; for a 401, return { email, fieldErrors: {}, message:
  // error.message }. Signed in: throw redirect(nextPath(new URL(request.url))).
  throw new Error('TODO 3: sign in with the fields of the form')
}
