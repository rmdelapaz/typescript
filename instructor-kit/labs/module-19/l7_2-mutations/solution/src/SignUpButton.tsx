// Task 1: sign up for one cleanup
import { useMutation } from '@tanstack/react-query'
import { ApiError } from './api.ts'
import { signUpMutation } from './mutations.ts'

interface SignUpButtonProps {
  eventId: string
  title: string
}

export function SignUpButton({ eventId, title }: SignUpButtonProps) {
  const signUp = useMutation(signUpMutation())
  return (
    <div>
      <button type="button" disabled={signUp.isPending} onClick={() => signUp.mutate(eventId)}>
        {signUp.isPending ? 'Signing up…' : `Sign up for ${title}`}
      </button>
      {/* isSuccess narrows: data is the API's Signup here, not undefined */}
      {signUp.isSuccess && (
        <p role="status">
          {signUp.data.status === 'waitlisted' ? "You're on the waiting list." : "You're signed up."}
        </p>
      )}
      {signUp.isError && (
        <p role="alert">
          {signUp.error instanceof ApiError ? signUp.error.message : 'Not signed up. Try again in a moment.'}
        </p>
      )}
    </div>
  )
}
