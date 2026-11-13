import { describe, expect, it } from 'vitest'
import { formatDate, toDateString } from './format.ts'

describe('formatDate', () => {
  it('shows a day of the crew calendar with its weekday', () => {
    // Arrange: a date as the API sends it
    const date = '2026-07-04'

    // Act
    const shown = formatDate(date)

    // Assert
    expect(shown).toBe('Sat, Jul 4, 2026')
  })

  it('keeps the first day of a month in that month', () => {
    expect(formatDate('2026-03-01')).toBe('Sun, Mar 1, 2026')
  })
})

describe('toDateString', () => {
  it('writes a moment as YYYY-MM-DD with two-digit months and days', () => {
    expect(toDateString(new Date(2026, 0, 5, 9, 30))).toBe('2026-01-05')
  })
})
