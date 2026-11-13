import type { WorkDay } from './types.ts'

export function spotsText(day: WorkDay): string {
  switch (day.status) {
    case 'open':
      return day.spotsLeft === 1 ? '1 spot left' : `${day.spotsLeft} spots left`
    case 'full':
      return 'Full'
    case 'cancelled':
      return 'Cancelled'
  }
}
