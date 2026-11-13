// Given: Theo's cleanups, with a way to give a spot back (Task 3 makes it feel instant)
import { useMutation, useQuery } from '@tanstack/react-query'
import { cancelSignupMutation } from './mutations.ts'
import { mySignupsQuery } from './queries.ts'
import type { SignupStatus } from './types.ts'

const statusLabels: Record<SignupStatus, string> = {
  confirmed: 'Confirmed',
  waitlisted: 'On the waiting list',
  cancelled: 'Cancelled',
  attended: 'Attended',
  'no-show': 'No-show',
}

export function MySignups() {
  const signups = useQuery(mySignupsQuery())
  const cancel = useMutation(cancelSignupMutation())
  if (signups.isPending) {
    return <p role="status">Loading your cleanups…</p>
  }
  if (signups.isError) {
    return <p role="alert">Could not load your cleanups.</p>
  }
  // cancel.variables is the last sign-up id passed to mutate: the alert can name the cleanup
  const failed = cancel.isError ? signups.data.find((signup) => signup.id === cancel.variables) : undefined
  return (
    <section aria-labelledby="mine">
      <h2 id="mine">My cleanups</h2>
      {failed !== undefined && (
        <p role="alert">Your spot at {failed.event.title} was not cancelled. Try again in a moment.</p>
      )}
      <ul>
        {signups.data.map((signup) => (
          <li key={signup.id}>
            <span>{signup.event.title}</span> <span>{statusLabels[signup.status]}</span>
            {signup.status === 'confirmed' && (
              <button type="button" onClick={() => cancel.mutate(signup.id)}>
                Cancel my spot at {signup.event.title}
              </button>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
