import type { Volunteer } from './types.ts'

interface RosterRowProps {
  volunteer: Volunteer
  isPresent: boolean
  onToggle: (id: string) => void
}

// One volunteer on the shift roster (the tests count how often this draws)
export function RosterRow({ volunteer, isPresent, onToggle }: RosterRowProps) {
  return (
    <li>
      {volunteer.name}{' '}
      <button type="button" aria-pressed={isPresent} onClick={() => onToggle(volunteer.id)}>
        Mark {volunteer.name} present
      </button>
    </li>
  )
}
