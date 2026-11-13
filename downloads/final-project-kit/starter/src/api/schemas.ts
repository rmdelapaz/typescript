// Rules as Zod schemas (Lesson 8.1): one schema gives a form its checks AND its types.
import { z } from 'zod'
import type { NewItem } from './types.ts'

// Each rule is written once and used twice: by the form, and by the (mock) API
const name = z
  .string()
  .trim()
  .min(3, { error: 'Give it a name of at least 3 characters.' })
  .max(80, { error: 'Keep the name under 80 characters.' })
const notes = z.string().trim().max(500, { error: 'Keep the notes under 500 characters.' })

/** The form: every field holds text, and an empty Notes box becomes null on the way out */
export const newItemSchema = z.object({
  name,
  notes: notes.transform((value) => (value === '' ? null : value)),
})

/** What the form's fields hold (all text) */
export type NewItemFormValues = z.input<typeof newItemSchema>
/** What the form hands on after its checks: exactly a NewItem */
export type NewItemFormData = z.output<typeof newItemSchema>

/** The request body POST /api/items accepts: a NewItem, checked again by the server */
export const newItemBodySchema: z.ZodType<NewItem> = z.object({ name, notes: notes.nullable() })
