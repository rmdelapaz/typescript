import { describe, expect, it } from 'vitest'
import { impactReportSchema, type ImpactFormValues } from './schemas.ts'

// A report as an organizer types it: every value is text
function typedReport(changes: Partial<ImpactFormValues> = {}): ImpactFormValues {
  return {
    volunteersAttended: '11',
    bags: '6',
    weightKg: '18.5',
    items: [{ category: 'plastic-bottles', count: '40' }],
    notes: '',
    ...changes,
  }
}

// Each problem the schema finds, as "path: message"
function problems(values: ImpactFormValues): string[] {
  const result = impactReportSchema.safeParse(values)
  return result.success ? [] : result.error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`)
}

describe('impactReportSchema', () => {
  it('turns the typed text into numbers', () => {
    const result = impactReportSchema.parse(typedReport())
    expect(result).toEqual({
      volunteersAttended: 11,
      bags: 6,
      weightKg: 18.5,
      items: [{ category: 'plastic-bottles', count: 40 }],
      notes: '',
    })
  })

  it('refuses an empty box instead of counting it as 0', () => {
    expect(problems(typedReport({ bags: '' }))).toEqual([
      'bags: Bags must be a whole number from 0 to 500.',
    ])
  })

  it('refuses half a bag', () => {
    expect(problems(typedReport({ bags: '2.5' }))).toHaveLength(1)
  })

  it('puts the duplicate message on the repeated row, even while a count is wrong', () => {
    const items: ImpactFormValues['items'] = [
      { category: 'plastic-bottles', count: '40' },
      { category: 'plastic-bags', count: 'lots' },
      { category: 'plastic-bottles', count: '3' },
    ]
    expect(problems(typedReport({ items }))).toEqual([
      'items.1.count: Count must be a whole number from 0 to 100000.',
      'items.2.category: Plastic bottles is already in the list: add to its count.',
    ])
  })
})
