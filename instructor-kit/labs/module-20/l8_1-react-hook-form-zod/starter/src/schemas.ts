// The rules for joining the crew: ONE description, the form's checks AND its types (Lesson 8.1)
import { z } from 'zod'

export const shirtSizes = ['S', 'M', 'L', 'XL'] as const

// TODO 1: the rules and their messages (TASKS.md has the exact words):
//   name           trimmed; 'Add your name.' when empty, else at least 2 characters, at most 60
//   email          an email address
//   shirtSize      the menu holds text ('' until chosen); the checked data holds one of shirtSizes
//   hoursPerMonth  the box holds text; the checked data holds a whole number from 1 to 40
export const joinSchema = z.object({
  name: z.string(),
  email: z.string(),
  shirtSize: z.string(),
  hoursPerMonth: z.string(),
})

/** What the boxes hold: text, as typed */
export type JoinFormValues = z.input<typeof joinSchema>

/** What a successful check gives back */
export type JoinData = z.output<typeof joinSchema>
