// The words people see for each value of a union. A Record lists EVERY value, so when you add one to
// the union, TypeScript points here until it has a label too (Lesson 3.3).
import type { ItemStatus } from '../api/types.ts'

export const itemStatusLabels: Record<ItemStatus, string> = {
  open: 'Open',
  done: 'Done',
}
