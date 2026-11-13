// The lab's changes: one mutationOptions factory per kind of change (Lesson 7.2)
import { mutationOptions } from '@tanstack/react-query'
import { patchSignup, postSignup } from './api.ts'
import { queryClient } from './queries.ts'

/** Sign Theo up for a cleanup */
export function signUpMutation() {
  return mutationOptions({
    mutationFn: (eventId: string) => postSignup(eventId),
    // TODO 2: after the API says yes, invalidate every entry a sign-up could have changed
  })
}

/** Cancel one of Theo's spots. It waits for the API today. */
export function cancelSignupMutation() {
  return mutationOptions({
    mutationFn: (signupId: string) => patchSignup(signupId, { status: 'cancelled' }),
    // TODO 3: make it optimistic: onMutate (cancel refetches, remember the old status, write 'cancelled'),
    //         onError (put the old status back), onSettled (refetch the truth)
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['me'] }),
  })
}
