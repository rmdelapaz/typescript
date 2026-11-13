// The supply checkout: what a team lead takes from the shed (Lesson 8.2)
import { z } from 'zod'
import { supplyItems } from './supplies.ts'

// TODO 1: a count is a whole number from 1 to 200: check the TEXT first (an empty box must be a message,
//         not 0: no coerce), then turn it into a number. Message: 'Count must be a whole number from 1 to 200.'
const countSchema = z.string()

const rowSchema = z.object({
  item: z.enum(supplyItems, 'Choose an item.'),
  count: countSchema,
})

// TODO 1: each item once: a rule about the whole list. The message ('Gloves is already in the list: add to its
//         count.') goes on the REPEATED row's item, and the rule runs even while a count is still wrong
export const checkoutSchema = z.object({
  rows: z.array(rowSchema),
})

/** What the boxes hold: text */
export type CheckoutValues = z.input<typeof checkoutSchema>

/** What a successful check gives back */
export type CheckoutData = z.output<typeof checkoutSchema>
