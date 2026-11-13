// Shoreline Crew HQ's changes (Lessons 7.2 and 8.1): one mutationOptions factory per kind of change.
// Each one says what to send, and which cached answers are out of date afterwards.
import { mutationOptions } from '@tanstack/react-query'
import type { Mark } from '../reducers/rosterReducer.ts'
import { patchEvent, patchSignup, postEvent } from './client.ts'
import { queryClient, rosterQuery } from './queries.ts'
import type { EventChanges, NewEvent, SignupStatus } from './types.ts'

/** Plan a cleanup. Waits for the API: the new cleanup's id comes from it. */
export function createEventMutation() {
  return mutationOptions({
    mutationFn: (event: NewEvent) => postEvent(event),
    // Every list of cleanups may now be missing one. Returning the promise keeps the
    // mutation pending until the lists on screen have been fetched again.
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['events'] }),
  })
}

/** Cancel a scheduled cleanup. Waits for the API: a big change should not look done before it is. */
export function cancelEventMutation() {
  return mutationOptions({
    mutationFn: (eventId: string) => patchEvent(eventId, { status: 'cancelled' }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['events'] }),
  })
}

/** Which cleanup to change, and the new values of its details */
export interface EventUpdate {
  eventId: string
  changes: EventChanges
}

/** Save an organizer's edits. Waits for the API: it has rules the form cannot check. */
export function updateEventMutation() {
  return mutationOptions({
    mutationFn: ({ eventId, changes }: EventUpdate) => patchEvent(eventId, changes),
    // The cleanup's page and every list that shows it are out of date now
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['events'] }),
  })
}

/** The mark a sign-up's status stands for: none while the person is still expected */
export function markOf(status: SignupStatus): Mark | undefined {
  return status === 'attended' || status === 'no-show' ? status : undefined
}

/** The status to send for a mark: no mark means confirmed (expected) again */
export function markStatus(mark: Mark | undefined): SignupStatus {
  return mark ?? 'confirmed'
}

/** One change at the check-in desk: a sign-up's new mark (undefined = expected again) */
export interface MarkChange {
  signupId: string
  mark: Mark | undefined
}

/** Save a check-in mark. Optimistic: the desk shows the new mark at once, and puts the old one
 * back if the API says no. */
export function markMutation(eventId: string, viewer: string) {
  const { queryKey } = rosterQuery(eventId, viewer)

  // Change one sign-up's status in the cached roster (a copy: the cached array is never changed)
  function setStatus(signupId: string, status: SignupStatus) {
    queryClient.setQueryData(queryKey, (entries) =>
      entries?.map((entry) => (entry.id === signupId ? { ...entry, status } : entry)),
    )
  }

  return mutationOptions({
    mutationFn: ({ signupId, mark }: MarkChange) =>
      patchSignup(signupId, { status: markStatus(mark) }),
    // Runs before the request: show the change now, and remember what to put back
    onMutate: async ({ signupId, mark }) => {
      // A refetch already on its way would overwrite the new mark with the old answer
      await queryClient.cancelQueries({ queryKey })
      const before = queryClient.getQueryData(queryKey)?.find((entry) => entry.id === signupId)?.status
      setStatus(signupId, markStatus(mark))
      return { before }
    },
    // The API said no (or could not be reached): put the old status back
    onError: (_error, { signupId }, saved) => {
      if (saved?.before !== undefined) {
        setStatus(signupId, saved.before)
      }
    },
    // Either way, ask the API for the truth: the roster, the spots left, a waiting list that moved up.
    // A volunteer's hours count attended cleanups, so the crew's answers are out of date too.
    onSettled: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ['events'] }),
        queryClient.invalidateQueries({ queryKey: ['volunteers'] }),
      ]),
  })
}
