// Shoreline Crew HQ's Zod schemas (Lesson 8.1): each one is a type AND its checks, written once.
import { z } from 'zod'
import { toDateString } from '../utils/format.ts'

// Compared when the check runs, so a form left open overnight uses the new date
function isTodayOrLater(date: string): boolean {
  return date >= toDateString(new Date())
}

const capacityRule = 'Capacity must be a whole number from 1 to 200.'

// The rules for a cleanup's details, shared by the Plan a cleanup and Edit forms.
// The API checks the same rules (and a few only it can check); most messages match its own.
export const eventFormSchema = z
  .object({
    title: z
      .string()
      .trim()
      // error can be a function: one rule, a message that fits what was typed
      .min(5, {
        error: (issue) =>
          issue.input === '' ? 'Add a title.' : 'Use at least 5 characters for the title.',
      })
      .max(80, 'Keep the title to 80 characters or fewer.'),
    siteId: z.string().min(1, 'Choose one of the cleanup sites.'),
    date: z.string().refine(isTodayOrLater, {
      error: (issue) => (issue.input === '' ? 'Pick a date.' : 'Pick today or a later date.'),
    }),
    startTime: z.string().min(1, 'Pick a start time.'),
    endTime: z.string().min(1, 'Pick an end time.'),
    // The box holds text; the API wants a number. coerce turns '12' into 12 (and '' into 0).
    capacity: z.coerce
      .number<string>({ error: capacityRule })
      .refine((count) => Number.isInteger(count) && count >= 1 && count <= 200, capacityRule),
    meetingPoint: z
      .string()
      .trim()
      .min(3, 'Say where volunteers meet (at least 3 characters).')
      .max(120, 'Keep the meeting point to 120 characters or fewer.'),
    description: z.string().trim().max(2000, 'Keep the description to 2000 characters or fewer.'),
  })
  // A rule about two fields belongs to the object; path puts its message under endTime
  .refine((event) => event.endTime > event.startTime, {
    path: ['endTime'],
    error: 'The end time must be after the start time.',
    // An object's refine normally waits until EVERY field is valid. This one only needs the
    // two times to be valid, so its message appears together with the others.
    when: ({ issues }) =>
      issues.every((issue) => issue.path?.[0] !== 'startTime' && issue.path?.[0] !== 'endTime'),
  })

/** What the form's fields hold: text, as typed */
export type EventFormValues = z.input<typeof eventFormSchema>

/** What a successful check gives back: trimmed, with capacity as a number, ready to send */
export type EventFormData = z.output<typeof eventFormSchema>
