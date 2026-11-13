import { z } from 'zod'

/** C1: the "Add a shift" form. Every value arrives as text; the output is ready for the API */
// TODO C1: volunteer (trimmed, 2 letters or more: 'Add a name (2 letters or more).'),
// date (YYYY-MM-DD: 'Pick a date.'), hours (text in, a whole number from 1 to 12 out:
// 'Hours must be a whole number from 1 to 12.' for every way it can be wrong)
export const shiftFormSchema = z.object({}).refine(() => false, 'TODO C1: shiftFormSchema is not written yet')

/** What the form holds (text) and what the schema hands on (a number of hours) */
export type ShiftFormValues = z.input<typeof shiftFormSchema>
export type ShiftFormData = z.output<typeof shiftFormSchema>
