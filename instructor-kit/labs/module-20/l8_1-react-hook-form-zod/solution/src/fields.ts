// Given: the form's field names and starting values. Nothing to change here.
import type { JoinFormValues } from './schemas.ts'

export type JoinField = keyof JoinFormValues

export const joinFields: JoinField[] = ['name', 'email', 'shirtSize', 'hoursPerMonth']

// Every box starts empty; the shirt size menu starts on its first option, "Choose…" (the value '')
export const emptyValues: JoinFormValues = { name: '', email: '', shirtSize: '', hoursPerMonth: '' }

/** Is this name one of the form's fields? (The API's fieldErrors use plain strings.) */
export function isJoinField(name: string): name is JoinField {
  return joinFields.some((field) => field === name)
}
