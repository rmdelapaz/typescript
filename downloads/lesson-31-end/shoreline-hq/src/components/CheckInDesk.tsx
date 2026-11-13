import { useMutation } from '@tanstack/react-query'
import { useReducer } from 'react'
import { describeError } from '../api/client.ts'
import { markMutation, markOf } from '../api/mutations.ts'
import type { RosterEntry } from '../api/types.ts'
import { initialRoster, rosterReducer, type Mark } from '../reducers/rosterReducer.ts'
import { Button } from './Button.tsx'
import cardStyles from './Card.module.css'
import styles from './CheckInDesk.module.css'
import { RosterTable } from './RosterTable.tsx'

interface CheckInDeskProps {
  eventId: string
  viewer: string
  /** Everyone with a spot today: still expected, checked in, or marked as a no-show */
  entries: RosterEntry[]
}

// Today's roster: who is here, who did not come, and an undo for slips of the finger.
// The marks are saved to shoreline-api; the undo history stays in this desk.
export function CheckInDesk({ eventId, viewer, entries }: CheckInDeskProps) {
  const [roster, dispatch] = useReducer(rosterReducer, initialRoster)
  const save = useMutation(markMutation(eventId, viewer))

  // The marks come from the cached roster: the API's answer, or a change on its way there
  const marks = new Map<string, Mark>()
  for (const entry of entries) {
    const mark = markOf(entry.status)
    if (mark !== undefined) {
      marks.set(entry.id, mark)
    }
  }
  const here = entries.filter((entry) => marks.get(entry.id) === 'attended').length
  const noShows = entries.filter((entry) => marks.get(entry.id) === 'no-show').length
  const expected = entries.length - here - noShows
  const last = roster.history.at(-1)
  const notSaved = entries.find((entry) => entry.id === save.variables?.signupId)

  async function changeMark(signupId: string, mark: Mark | undefined) {
    const before = marks.get(signupId)
    try {
      await save.mutateAsync({ signupId, mark })
      // Only changes the API accepted can be undone
      dispatch({ type: 'saved', change: { signupId, before } })
    } catch {
      // onError has already put the old mark back, and the alert below says why
    }
  }

  // Undo is one more change: send the mark from before, then forget that history entry
  async function undo() {
    if (last === undefined || save.isPending) return
    try {
      await save.mutateAsync({ signupId: last.signupId, mark: last.before })
      dispatch({ type: 'undone' })
    } catch {
      // As above: the desk shows what shoreline-api has
    }
  }

  return (
    <section className={cardStyles.card} aria-labelledby="check-in-desk">
      <h2 id="check-in-desk">Check-in desk</h2>
      <p role="status">
        Checked in: {here} of {entries.length}. No-shows: {noShows}. Still expected: {expected}.
      </p>
      {save.isError && (
        <p role="alert" className={styles.error}>
          The mark for {notSaved?.volunteer.name ?? 'that volunteer'} was not saved.{' '}
          {describeError(save.error)}
        </p>
      )}
      <RosterTable entries={entries} marks={marks} onMark={changeMark} />
      <div className={styles.actions}>
        <Button aria-disabled={last === undefined || save.isPending} onClick={undo}>
          Undo last change
        </Button>
      </div>
      <p className={styles.note}>Each mark is saved to shoreline-api as you go.</p>
    </section>
  )
}
