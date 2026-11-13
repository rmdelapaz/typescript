import { describe, expect, it } from 'vitest'
import { makeEvent } from '../test/factories.ts'
import { getAvailability } from './availability.ts'

describe('getAvailability', () => {
  it('counts the spots left on a scheduled cleanup', () => {
    const event = makeEvent({ capacity: 12, spotsTaken: 5 })
    expect(getAvailability(event)).toEqual({ kind: 'open', spotsLeft: 7 })
  })

  it('says full when every spot is taken', () => {
    expect(getAvailability(makeEvent({ capacity: 18, spotsTaken: 18 }))).toEqual({ kind: 'full' })
  })

  it.each(['draft', 'completed', 'cancelled'] as const)('takes no sign-ups for a %s cleanup', (status) => {
    expect(getAvailability(makeEvent({ status }))).toEqual({ kind: 'closed' })
  })
})
