// Task 1: sign up for one cleanup
import { signUpMutation } from './mutations.ts'

interface SignUpButtonProps {
  eventId: string
  title: string
}

// TODO 1: run signUpMutation() with useMutation. The button says "Sign up for TITLE" ("Signing up…" and disabled
// while it runs). Afterwards <p role="status">: "You're signed up." or "You're on the waiting list." (the API's
// answer has the status); on an error <p role="alert">: an ApiError's message, otherwise
// "Not signed up. Try again in a moment."
export function SignUpButton({ eventId, title }: SignUpButtonProps) {
  const options = signUpMutation()
  return (
    <button type="button" data-todo={String(options.mutationFn !== undefined)}>
      TODO 1: sign up for {title} ({eventId})
    </button>
  )
}
