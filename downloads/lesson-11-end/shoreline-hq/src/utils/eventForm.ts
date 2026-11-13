// Reading and checking the "Plan a cleanup" form (Lesson 3.5).
// Module 8 replaces these hand-written checks with one Zod schema.
import type { DateString, NewEvent } from '../api/types.ts'
import { sites } from '../data/sites.ts'

// The form's fields, named like the API's NewEvent properties
export type EventField =
  | 'title'
  | 'siteId'
  | 'date'
  | 'startTime'
  | 'endTime'
  | 'capacity'
  | 'meetingPoint'
  | 'description'

// What the person typed, as text, so the form can show it again
export type EventFormValues = Record<EventField, string>

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

// The API's rules for a new cleanup, with messages that say how to fix the problem
export function validateEvent(values: EventFormValues, today: DateString): FieldErrors {
  const errors: FieldErrors = {}
  function add(field: EventField, message: string) {
    errors[field] = [...(errors[field] ?? []), message]
  }

  if (values.title === '') add('title', 'Add a title.')
  else if (values.title.length < 5) add('title', 'Use at least 5 characters for the title.')
  else if (values.title.length > 80) add('title', 'Keep the title to 80 characters or fewer.')

  if (!sites.some((site) => site.id === values.siteId)) {
    add('siteId', 'Choose one of the cleanup sites.')
  }

  if (values.date === '') add('date', 'Pick a date.')
  else if (values.date < today) add('date', 'Pick today or a later date.')

  if (values.startTime === '') add('startTime', 'Pick a start time.')
  if (values.endTime === '') add('endTime', 'Pick an end time.')
  else if (values.startTime !== '' && values.endTime <= values.startTime) {
    add('endTime', 'The end time must be after the start time.')
  }

  const capacity = Number(values.capacity)
  if (values.capacity === '' || !Number.isInteger(capacity) || capacity < 1 || capacity > 200) {
    add('capacity', 'Capacity must be a whole number from 1 to 200.')
  }

  if (values.meetingPoint.length < 3) {
    add('meetingPoint', 'Say where volunteers meet (at least 3 characters).')
  } else if (values.meetingPoint.length > 120) {
    add('meetingPoint', 'Keep the meeting point to 120 characters or fewer.')
  }

  if (values.description.length > 2000) {
    add('description', 'Keep the description to 2000 characters or fewer.')
  }
  return errors
}

// Only called once validateEvent found nothing: the text becomes the API's types
export function toNewEvent(values: EventFormValues, status: 'draft' | 'scheduled'): NewEvent {
  return {
    title: values.title,
    siteId: values.siteId,
    date: values.date,
    startTime: values.startTime,
    endTime: values.endTime,
    capacity: Number(values.capacity),
    meetingPoint: values.meetingPoint,
    description: values.description,
    status,
  }
}
