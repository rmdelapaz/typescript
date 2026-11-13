import type { Availability } from '../utils/availability.ts'
import styles from './SpotsLine.module.css'

interface SpotsLineProps {
  availability: Availability
  capacity: number
}

export function SpotsLine({ availability, capacity }: SpotsLineProps) {
  switch (availability.kind) {
    case 'open':
      return (
        <p>
          {availability.spotsLeft} of {capacity} spots left
        </p>
      )
    case 'full':
      return <p className={styles.full}>Full: new sign-ups join the waiting list</p>
    case 'closed':
      return null
  }
}
