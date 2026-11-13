import type { FieldErrors } from 'react-hook-form'
import { describe, expect, it } from 'vitest'
import type { ImpactFormValues } from '../api/schemas.ts'
import { listErrors } from './formErrors.ts'
import { withRowNumbers } from './impactForm.ts'

// What React Hook Form's formState.errors holds after a failed save: a tree shaped like the values
const errors: FieldErrors<ImpactFormValues> = {
  bags: { type: 'invalid_format', message: 'Bags must be a whole number from 0 to 500.' },
  items: [
    undefined,
    { count: { type: 'invalid_format', message: 'Count must be a whole number from 0 to 100000.' } },
  ],
  root: { server: { type: 'server', message: 'Not saved.' } },
}

describe('listErrors', () => {
  it('lists every field message with its path as the id, without the root errors', () => {
    expect(listErrors(errors)).toEqual([
      { id: 'bags', message: 'Bags must be a whole number from 0 to 500.' },
      { id: 'items.1.count', message: 'Count must be a whole number from 0 to 100000.' },
    ])
  })

  it('gives an empty list when there are no errors', () => {
    expect(listErrors({})).toEqual([])
  })
})

describe('withRowNumbers', () => {
  it('starts each debris row message with its row number, counting from 1', () => {
    expect(withRowNumbers(listErrors(errors))).toEqual([
      { id: 'bags', message: 'Bags must be a whole number from 0 to 500.' },
      { id: 'items.1.count', message: 'Row 2: Count must be a whole number from 0 to 100000.' },
    ])
  })
})
