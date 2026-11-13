// HANDOUT (Lab 9.1, Task 3): two planted bugs. Copy it over src/VolunteerCard.tsx, run your tests, put the original back.
import { useCrewName } from './CrewContext.tsx'
import { badgeFor, formatHours, hoursWorked } from './hours.ts'
import type { Shift } from './types.ts'

const BADGE_LABELS = { bronze: 'Bronze helper', silver: 'Silver helper', gold: 'Gold helper' } as const

interface VolunteerCardProps {
  volunteerId: string
  name: string
  shifts: readonly Shift[]
}

/** One volunteer's thank-you card: hours worked, a badge, the shifts they missed */
export function VolunteerCard({ volunteerId, name, shifts }: VolunteerCardProps) {
  const crewName = useCrewName()
  const hours = hoursWorked(shifts)
  const badge = badgeFor(hours)
  const missed = shifts.filter((shift) => shift.status === 'missed')
  const headingId = `volunteer-${volunteerId}`
  return (
    <article aria-labelledby={headingId}>
      <h3 id={headingId}>{name}</h3>
      <p>
        {formatHours(hours)} worked with {crewName}
      </p>
      {badge !== 'none' && <p>{BADGE_LABELS[badge]}</p>}
      {missed.length >= 0 && (
        <ul aria-label="Missed shifts">
          {missed.map((shift) => (
            <li key={shift.id}>
              {shift.date} at {shift.site}
            </li>
          ))}
        </ul>
      )}
      <a href={`/volunteers/${volunteerId}`}>
        Profile<span className="visually-hidden"> of {name}</span>
      </a>
    </article>
  )
}
