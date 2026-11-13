import { useReducer } from 'react'
import { initialRoster, rosterReducer } from '../reducers/rosterReducer.ts'
import buttonStyles from './Button.module.css'
import cardStyles from './Card.module.css'
import styles from './CheckInDesk.module.css'
import { RosterTable, type RosterRow } from './RosterTable.tsx'

interface CheckInDeskProps {
  entries: RosterRow[]
}

// Today's roster: who is here, who did not come, and an undo for slips of the finger
export function CheckInDesk({ entries }: CheckInDeskProps) {
  const [roster, dispatch] = useReducer(rosterReducer, initialRoster)

  const here = entries.filter((entry) => roster.marks.get(entry.id) === 'attended').length
  const noShows = entries.filter((entry) => roster.marks.get(entry.id) === 'no-show').length
  const expected = entries.length - here - noShows
  const canUndo = roster.history.length > 0

  return (
    <section className={cardStyles.card} aria-labelledby="check-in-desk">
      <h2 id="check-in-desk">Check-in desk</h2>
      <p role="status">
        Checked in: {here} of {entries.length}. No-shows: {noShows}. Still expected: {expected}.
      </p>
      <RosterTable entries={entries} marks={roster.marks} dispatch={dispatch} />
      <div className={styles.actions}>
        <button
          type="button"
          className={buttonStyles.secondary}
          aria-disabled={!canUndo}
          onClick={() => dispatch({ type: 'undo' })}
        >
          Undo last change
        </button>
      </div>
      <p className={styles.practice}>
        Practice copy: these marks stay in this tab. Lesson 5.2 loads the real roster after sign-in, and
        Lesson 7.2 saves the marks to shoreline-api.
      </p>
    </section>
  )
}
