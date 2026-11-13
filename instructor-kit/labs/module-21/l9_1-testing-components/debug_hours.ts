// HANDOUT (Lab 9.1, Task 3): two planted bugs. Copy it over src/hours.ts, run your tests, put the original back.
import type { Badge, Shift } from './types.ts'

/** Hours of the shifts that were worked (planned and missed shifts count 0) */
export function hoursWorked(shifts: readonly Shift[]): number {
  return shifts.filter((shift) => shift.status !== 'missed').reduce((sum, shift) => sum + shift.hours, 0)
}

/** The thank-you badge for a number of hours: from 10 bronze, from 25 silver, from 50 gold */
export function badgeFor(hours: number): Badge {
  if (hours >= 50) return 'gold'
  if (hours >= 25) return 'silver'
  if (hours > 10) return 'bronze'
  return 'none'
}

/** 1 -> "1 hour", 2.5 -> "2.5 hours" */
export function formatHours(hours: number): string {
  return `${hours} ${hours === 1 ? 'hour' : 'hours'}`
}
