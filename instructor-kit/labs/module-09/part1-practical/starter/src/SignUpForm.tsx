import type { WorkDay } from './types.ts'

interface SignUpFormProps {
  day: WorkDay
}

// Task 3: a form with an action (useActionState): a field "Your name" (name="name") and a button "Sign up".
// Empty: "Enter your name." under the field. Otherwise a status line:
// "Thanks, Ana: you are signed up for Compost turning."
export function SignUpForm({ day }: SignUpFormProps) {
  return <p>TODO 3: sign up for {day.title}</p>
}
