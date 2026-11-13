import { describe, expect, it } from 'vitest'
import { badgeFor, formatHours, hoursWorked } from './hours.ts'
import { makeShift } from './test/factories.ts'

describe('hoursWorked', () => {
  it('adds up the hours of the worked shifts', () => {
    const shifts = [makeShift({ hours: 3 }), makeShift({ id: 'sh2', hours: 2.5 })]
    expect(hoursWorked(shifts)).toBe(5.5)
  })

  it.each(['planned', 'missed'] as const)('counts a %s shift as 0 hours', (status) => {
    expect(hoursWorked([makeShift({ status })])).toBe(0)
  })

  it('is 0 with no shifts at all', () => {
    expect(hoursWorked([])).toBe(0)
  })
})

describe('badgeFor', () => {
  it.each([
    [0, 'none'],
    [9.5, 'none'],
    [10, 'bronze'],
    [24.5, 'bronze'],
    [25, 'silver'],
    [50, 'gold'],
  ] as const)('gives %s hours the badge %s', (hours, badge) => {
    expect(badgeFor(hours)).toBe(badge)
  })
})

describe('formatHours', () => {
  it('writes one hour in the singular', () => {
    expect(formatHours(1)).toBe('1 hour')
  })

  it('writes every other amount in the plural', () => {
    expect(formatHours(2.5)).toBe('2.5 hours')
  })
})
