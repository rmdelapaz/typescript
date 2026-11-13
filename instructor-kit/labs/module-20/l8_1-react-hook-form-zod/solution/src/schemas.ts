// The rules for joining the crew: ONE description, the form's checks AND its types (Lesson 8.1)
import { z } from 'zod'

export const shirtSizes = ['S', 'M', 'L', 'XL'] as const

const hoursRule = 'Hours must be a whole number from 1 to 40.'

export const joinSchema = z.object({
  name: z
    .string()
    .trim()
    // error can be a function: one rule, a message that fits what was typed
    .min(2, { error: (issue) => (issue.input === '' ? 'Add your name.' : 'Use at least 2 characters for your name.') })
    .max(60, 'Keep your name to 60 characters or fewer.'),
  email: z.email('Enter an email address like name@example.com.'),
  // The menu holds text ('' until a size is chosen); the checked data holds one of the sizes
  shirtSize: z.string().pipe(z.enum(shirtSizes, 'Choose a shirt size.')),
  // The box holds text; coerce turns it into a number before the rule runs
  hoursPerMonth: z.coerce
    .number<string>(hoursRule)
    .refine((hours) => Number.isInteger(hours) && hours >= 1 && hours <= 40, hoursRule),
})

/** What the boxes hold: text, as typed */
export type JoinFormValues = z.input<typeof joinSchema>

/** What a successful check gives back: hoursPerMonth is a number here */
export type JoinData = z.output<typeof joinSchema>
