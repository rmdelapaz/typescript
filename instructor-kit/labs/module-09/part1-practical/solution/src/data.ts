import type { WorkDay } from './types.ts'

// Given: this month's work days
export const workDays: WorkDay[] = [
  { id: 'w1', title: 'Compost turning', day: 'Saturday', spotsLeft: 4, status: 'open' },
  { id: 'w2', title: 'Greenhouse repairs', day: 'Sunday', spotsLeft: 0, status: 'full' },
  { id: 'w3', title: 'Seed library sorting', day: 'Tuesday evening', spotsLeft: 1, status: 'open' },
  { id: 'w4', title: 'Path mulching', day: 'Saturday', spotsLeft: 6, status: 'cancelled' },
  { id: 'w5', title: 'Rain barrel cleaning', day: 'Wednesday', spotsLeft: 0, status: 'full' },
  { id: 'w6', title: 'Harvest swap setup', day: 'Friday', spotsLeft: 7, status: 'open' },
]
