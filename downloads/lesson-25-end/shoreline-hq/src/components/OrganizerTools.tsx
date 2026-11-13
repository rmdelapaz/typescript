import { useMutation } from '@tanstack/react-query'
import { useRef, useState } from 'react'
import { describeError } from '../api/client.ts'
import { cancelEventMutation } from '../api/mutations.ts'
import type { CleanupEventDetail } from '../api/types.ts'
import { Button } from './Button.tsx'
import cardStyles from './Card.module.css'
import { ConfirmDialog } from './ConfirmDialog.tsx'
import styles from './OrganizerTools.module.css'

interface OrganizerToolsProps {
  event: CleanupEventDetail
}

// What only organizers see on a cleanup's page: the check-in code, and a way to cancel it
export function OrganizerTools({ event }: OrganizerToolsProps) {
  const cancel = useMutation(cancelEventMutation())
  const [confirming, setConfirming] = useState(false)
  const statusRef = useRef<HTMLParagraphElement>(null)
  const scheduled = event.status === 'scheduled'

  function cancelCleanup() {
    setConfirming(false)
    cancel.mutate(event.id, {
      // The Cancel button is gone now: move the focus to the message that took its place
      onSuccess: () => statusRef.current?.focus(),
    })
  }

  // Nothing to do for drafts and past cleanups (unless this page just cancelled one)
  if (!scheduled && cancel.isIdle) {
    return null
  }

  return (
    <section className={cardStyles.card} aria-labelledby="organizer-tools">
      <h2 id="organizer-tools">For organizers</h2>
      {scheduled && event.checkInCode !== undefined && (
        <p>
          Check-in code: <strong className={styles.code}>{event.checkInCode}</strong>. Volunteers
          type it to check themselves in on the day.
        </p>
      )}
      {scheduled && (
        <Button aria-haspopup="dialog" disabled={cancel.isPending} onClick={() => setConfirming(true)}>
          Cancel cleanup
        </Button>
      )}
      {/* Always in the page, so screen readers notice when the text changes */}
      <p role="status" ref={statusRef} tabIndex={-1} className={styles.status}>
        {cancel.isPending && 'Cancelling…'}
        {cancel.isError && `The cleanup was not cancelled. ${describeError(cancel.error)}`}
        {cancel.isSuccess &&
          `Cleanup cancelled. Volunteers signed up: ${event.spotsTaken}. They need to hear about it.`}
      </p>
      {confirming && (
        <ConfirmDialog
          title="Cancel this cleanup?"
          keepLabel="Keep it"
          confirmLabel="Cancel the cleanup"
          onKeep={() => setConfirming(false)}
          onConfirm={cancelCleanup}
        >
          <p>
            <strong>{event.title}</strong>. Volunteers signed up: {event.spotsTaken}. They will need
            to hear about it.
          </p>
        </ConfirmDialog>
      )}
    </section>
  )
}
