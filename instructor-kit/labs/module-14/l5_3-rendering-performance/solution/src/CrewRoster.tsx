import { memo, useCallback, useState } from 'react'
import { RosterRow } from './RosterRow.tsx'
import type { Volunteer } from './types.ts'

interface RosterListProps {
  volunteers: Volunteer[]
  present: string[]
  onToggle: (id: string) => void
}

// memo: React skips the list when every prop is the same as last time
const RosterList = memo(function RosterList({ volunteers, present, onToggle }: RosterListProps) {
  return (
    <ul>
      {volunteers.map((volunteer) => (
        <RosterRow
          key={volunteer.id}
          volunteer={volunteer}
          isPresent={present.includes(volunteer.id)}
          onToggle={onToggle}
        />
      ))}
    </ul>
  )
})

const crew: Volunteer[] = [
  { id: 'v1', name: 'Ana Lima' },
  { id: 'v2', name: 'Ben Okafor' },
  { id: 'v3', name: 'Chloe Tran' },
]

// The morning shift: a note for the shift lead, and who has arrived
export function CrewRoster() {
  const [note, setNote] = useState('')
  const [present, setPresent] = useState<string[]>([])

  // The same function on every render (updater form: it needs nothing from this render)
  const togglePresent = useCallback((id: string) => {
    setPresent((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
  }, [])

  return (
    <>
      <label htmlFor="roster-note">Note for the shift</label>
      <input id="roster-note" value={note} onChange={(event) => setNote(event.target.value)} />
      <RosterList volunteers={crew} present={present} onToggle={togglePresent} />
      <p>
        Present: {present.length} of {crew.length}
      </p>
    </>
  )
}
