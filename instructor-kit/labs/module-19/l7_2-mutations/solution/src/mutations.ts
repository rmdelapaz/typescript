// The lab's changes: one mutationOptions factory per kind of change (Lesson 7.2)
import { mutationOptions } from '@tanstack/react-query'
import { patchSignup, postSignup } from './api.ts'
import { mySignupsQuery, queryClient } from './queries.ts'
import type { SignupStatus } from './types.ts'

/** Sign Theo up for a cleanup. Waits for the API: it decides confirmed or waitlisted. */
export function signUpMutation() {
  return mutationOptions({
    mutationFn: (eventId: string) => postSignup(eventId),
    // What could a sign-up have changed? The cleanup's spots, and Theo's own list
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ['events'] }),
        queryClient.invalidateQueries({ queryKey: ['me'] }),
      ]),
  })
}

/** Cancel one of Theo's spots. Optimistic: small, frequent, easy to take back. */
export function cancelSignupMutation() {
  const { queryKey } = mySignupsQuery()

  // One sign-up's status in the cached list (a copy: the cached array is never changed)
  function setStatus(signupId: string, status: SignupStatus) {
    queryClient.setQueryData(queryKey, (signups) =>
      signups?.map((signup) => (signup.id === signupId ? { ...signup, status } : signup)),
    )
  }

  return mutationOptions({
    mutationFn: (signupId: string) => patchSignup(signupId, { status: 'cancelled' }),
    onMutate: async (signupId) => {
      // A refetch already on its way would bring back the old status
      await queryClient.cancelQueries({ queryKey })
      const before = queryClient.getQueryData(queryKey)?.find((signup) => signup.id === signupId)?.status
      setStatus(signupId, 'cancelled')
      return { before }
    },
    onError: (_error, signupId, saved) => {
      if (saved?.before !== undefined) {
        setStatus(signupId, saved.before)
      }
    },
    // Either way, ask for the truth: Theo's list, and the cleanup's spots (a freed spot may go to someone waiting)
    onSettled: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ['me'] }),
        queryClient.invalidateQueries({ queryKey: ['events'] }),
      ]),
  })
}
