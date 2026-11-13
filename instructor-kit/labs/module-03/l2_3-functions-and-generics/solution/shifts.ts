// Lab 2.3 (reference solution)

export type ShiftRole = 'lead' | 'crew' | 'first-aid'

export interface Shift {
  id: string
  volunteer: string
  site: string
  role: ShiftRole
  hours: number
}

export interface HoursOptions {
  showRole?: boolean
  unit?: string
}

export function hoursLine(shift: Shift, { showRole = false, unit = 'h' }: HoursOptions = {}): string {
  const who = showRole ? `${shift.volunteer} (${shift.role})` : shift.volunteer
  return `${who}: ${shift.hours}${unit}`
}

export function totalHours(...hours: number[]): number {
  return hours.reduce((sum, h) => sum + h, 0)
}

export type ShiftFormatter = (shift: Shift) => string

export function formatAll(shifts: Shift[], format: ShiftFormatter): string[] {
  return shifts.map(format)
}

export function lastOf<T>(items: T[]): T | undefined {
  return items[items.length - 1]
}

export function sumBy<T>(items: T[], valueOf: (item: T) => number): number {
  return items.reduce((sum, item) => sum + valueOf(item), 0)
}

export function indexById<T extends { id: string }>(items: T[]): Map<string, T> {
  return new Map(items.map((item) => [item.id, item]))
}
