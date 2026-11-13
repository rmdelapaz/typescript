import type { RosterEntry } from '../api/types.ts'
import type { Mark } from '../reducers/rosterReducer.ts'
import { Badge, type BadgeTone } from './Badge.tsx'
import { Button } from './Button.tsx'
import styles from './RosterTable.module.css'
import { VisuallyHidden } from './VisuallyHidden.tsx'

/** Only what the table shows: a full RosterEntry from the API fits too */
export type RosterRow = Pick<RosterEntry, 'id' | 'note'> & {
  volunteer: Pick<RosterEntry['volunteer'], 'name'>
}

const markBadges: Record<Mark | 'expected', { label: string; tone: BadgeTone }> = {
  expected: { label: 'Expected', tone: 'neutral' },
  attended: { label: 'Checked in', tone: 'success' },
  'no-show': { label: 'No-show', tone: 'danger' },
}

interface RosterTableProps {
  entries: RosterRow[]
  marks: ReadonlyMap<string, Mark>
  /** Called with the sign-up's new mark (undefined: expected again) */
  onMark: (signupId: string, mark: Mark | undefined) => void
}

export function RosterTable({ entries, marks, onMark }: RosterTableProps) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th scope="col">Volunteer</th>
          <th scope="col">Check-in</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((entry) => {
          const signupId = entry.id
          const mark = marks.get(signupId)
          const { label, tone } = markBadges[mark ?? 'expected']
          return (
            <tr key={signupId}>
              <th scope="row">
                {entry.volunteer.name}{' '}
                <span className={styles.mark}>
                  <Badge label={label} tone={tone} />
                </span>
                {entry.note !== '' && <span className={styles.note}>{entry.note}</span>}
              </th>
              <td className={styles.buttons}>
                <Button
                  aria-pressed={mark === 'attended'}
                  onClick={() => onMark(signupId, mark === 'attended' ? undefined : 'attended')}
                >
                  Check in<VisuallyHidden> for {entry.volunteer.name}</VisuallyHidden>
                </Button>
                <Button
                  aria-pressed={mark === 'no-show'}
                  onClick={() => onMark(signupId, mark === 'no-show' ? undefined : 'no-show')}
                >
                  No-show<VisuallyHidden> for {entry.volunteer.name}</VisuallyHidden>
                </Button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
