// The supply checkout: what a team lead takes from the shed (Lesson 8.2)
import { z } from 'zod'
import { supplyItems, supplyLabels } from './supplies.ts'

const countRule = 'Count must be a whole number from 1 to 200.'

// The text first (an empty box is a message, not 0), then a number
const countSchema = z
  .string()
  .trim()
  .regex(/^\d+$/, countRule)
  .transform(Number)
  .refine((count) => count >= 1 && count <= 200, countRule)

const rowSchema = z.object({
  item: z.enum(supplyItems, 'Choose an item.'),
  count: countSchema,
})

export const checkoutSchema = z.object({
  rows: z.array(rowSchema).superRefine(
    (rows, context) => {
      const seen = new Set<string>()
      rows.forEach((row, index) => {
        if (seen.has(row.item)) {
          context.addIssue({
            code: 'custom',
            path: [index, 'item'],
            message: `${supplyLabels[row.item]} is already in the list: add to its count.`,
          })
        }
        seen.add(row.item)
      })
    },
    // Run as soon as every row's item is valid, whatever the counts say
    { when: ({ issues }) => issues.every((issue) => issue.path?.[1] !== 'item') },
  ),
})

/** What the boxes hold: text */
export type CheckoutValues = z.input<typeof checkoutSchema>

/** What a successful check gives back: counts are numbers */
export type CheckoutData = z.output<typeof checkoutSchema>
