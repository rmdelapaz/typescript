import { z } from 'zod'

const HOURS = 'Hours must be a whole number from 1 to 12.'

/** C1: the "Add a shift" form. Every value arrives as text; the output is ready for the API */
export const shiftFormSchema = z.object({
  volunteer: z.string().trim().min(2, 'Add a name (2 letters or more).'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Pick a date.'),
  hours: z.coerce.number<string>({ error: HOURS }).int(HOURS).min(1, HOURS).max(12, HOURS),
})

/** What the form holds (text) and what the schema hands on (a number of hours) */
export type ShiftFormValues = z.input<typeof shiftFormSchema>
export type ShiftFormData = z.output<typeof shiftFormSchema>
