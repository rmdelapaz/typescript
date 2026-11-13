// Lab 2.3: the crew's shift helpers. Tasks 1 to 3 are in TASKS.md; npm test and npm run check say what is left.

export type ShiftRole = 'lead' | 'crew' | 'first-aid'

export interface Shift {
  id: string
  volunteer: string
  site: string
  role: ShiftRole
  hours: number
}

// Task 1: "Maya Okafor: 3h"; with { showRole: true } "Maya Okafor (lead): 3h"; with { unit: ' hours' } "Maya Okafor: 3 hours".
// Write the options as an interface, destructure them with defaults, and write the return type.
export function hoursLine(shift, options) {
  throw new Error(`TODO 1: a line for ${JSON.stringify(shift)} with ${JSON.stringify(options)}`)
}

// Task 1: any number of hours, added up (totalHours() is 0)
export function totalHours(hours) {
  throw new Error(`TODO 1: add up ${hours}`)
}

// Task 2: a function type for "takes a shift, returns a line of text", and a function that formats every shift
export type ShiftFormatter = unknown

export function formatAll(shifts: Shift[], format: ShiftFormatter): string[] {
  throw new Error(`TODO 2: format ${shifts.length} shifts with ${String(format)}`)
}

// Task 3: three generic helpers that work for shifts, volunteers, cleanups or anything else
export function lastOf(items) {
  throw new Error(`TODO 3: the last of ${items}`)
}

export function sumBy(items, valueOf) {
  throw new Error(`TODO 3: the sum of ${items} by ${valueOf}`)
}

export function indexById(items) {
  throw new Error(`TODO 3: index ${items} by id`)
}
