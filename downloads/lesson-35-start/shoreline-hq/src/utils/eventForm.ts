// Reading the cleanup forms (Lessons 3.5 and 8.1).
// The rules live in ONE place, eventFormSchema in api/schemas.ts; the types come from it too.
import type { EventFormValues } from '../api/schemas.ts'
import type { CleanupEvent } from '../api/types.ts'

// The form's fields: the schema's keys, so a new field in the schema is a new field here
export type EventField = keyof EventFormValues

// The API's fieldErrors shape (field name: messages), with names TypeScript can check
export type FieldErrors = Partial<Record<EventField, string[]>>

export const emptyValues: EventFormValues = {
  title: '',
  siteId: '',
  date: '',
  startTime: '',
  endTime: '',
  capacity: '',
  meetingPoint: '',
  description: '',
}

/** Is this name one of the form's fields? (The API's fieldErrors use plain strings.) */
export function isEventField(name: string): name is EventField {
  return Object.hasOwn(emptyValues, name)
}

// formData.get() returns a string, a File (from a file input) or null (no such field)
function readText(formData: FormData, name: EventField): string {
  const value = formData.get(name)
  return typeof value === 'string' ? value.trim() : ''
}

export function readValues(formData: FormData): EventFormValues {
  return {
    title: readText(formData, 'title'),
    siteId: readText(formData, 'siteId'),
    date: readText(formData, 'date'),
    startTime: readText(formData, 'startTime'),
    endTime: readText(formData, 'endTime'),
    capacity: readText(formData, 'capacity'),
    meetingPoint: readText(formData, 'meetingPoint'),
    description: readText(formData, 'description'),
  }
}

/** A saved cleanup as the text the form shows (the edit form starts from these) */
export function toFormValues(event: CleanupEvent): EventFormValues {
  return {
    title: event.title,
    siteId: event.siteId,
    date: event.date,
    startTime: event.startTime,
    endTime: event.endTime,
    capacity: String(event.capacity),
    meetingPoint: event.meetingPoint,
    description: event.description,
  }
}
