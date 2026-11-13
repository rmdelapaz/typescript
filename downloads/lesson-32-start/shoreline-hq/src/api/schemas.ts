// Shoreline Crew HQ's Zod schemas (Lessons 8.1 and 8.2): each one is a type AND its checks, written once.
import { z } from 'zod'
import { debrisCategories, debrisLabels } from '../utils/debris.ts'
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

// A count typed into a box: digits only, so an empty box is a message, not a silent 0
// (z.coerce.number turns '' into 0, which would count as "nothing collected").
function wholeNumber(max: number, message: string) {
  return z
    .string()
    .trim()
    .regex(/^\d+$/, message)
    .transform(Number)
    .refine((count) => count <= max, message)
}

const weightRule = 'Weight must be a number of kilograms from 0 to 5000.'

/** One row of the debris list: a category and how many pieces of it */
const debrisCountSchema = z.object({
  category: z.enum(debrisCategories, 'Choose a kind of debris.'),
  count: wholeNumber(100_000, 'Count must be a whole number from 0 to 100000.'),
})

// The organizers' report after a cleanup. Messages match shoreline-api's own.
export const impactReportSchema = z.object({
  volunteersAttended: wholeNumber(1000, 'Volunteers must be a whole number from 0 to 1000.'),
  bags: wholeNumber(500, 'Bags must be a whole number from 0 to 500.'),
  weightKg: z
    .string()
    .trim()
    .regex(/^\d+(\.\d+)?$/, weightRule)
    .transform(Number)
    .refine((kg) => kg <= 5000, weightRule),
  items: z
    .array(debrisCountSchema)
    // A rule about the whole list: each kind of debris once. The message goes to the repeated row.
    .superRefine(
      (items, context) => {
        const seen = new Set<string>()
        items.forEach((item, index) => {
          if (seen.has(item.category)) {
            context.addIssue({
              code: 'custom',
              path: [index, 'category'],
              message: `${debrisLabels[item.category]} is already in the list: add to its count.`,
            })
          }
          seen.add(item.category)
        })
      },
      // Like the end-time rule: run as soon as every row's category is valid, whatever the counts
      { when: ({ issues }) => issues.every((issue) => issue.path?.[1] !== 'category') },
    ),
  notes: z.string().trim().max(2000, 'Keep the notes to 2000 characters or fewer.'),
})

/** What the report form's fields hold: text, as typed */
export type ImpactFormValues = z.input<typeof impactReportSchema>

/** What a successful check gives back: numbers, ready to send */
export type ImpactFormData = z.output<typeof impactReportSchema>
