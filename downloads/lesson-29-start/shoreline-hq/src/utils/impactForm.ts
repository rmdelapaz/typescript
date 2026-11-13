// The impact report form (Lesson 8.2): its starting values and small helpers.
// The rules live in impactReportSchema (api/schemas.ts).
import type { FieldPath } from 'react-hook-form'
import type { ImpactFormValues } from '../api/schemas.ts'
import type { CleanupEvent, DebrisCategory, ImpactReport } from '../api/types.ts'
import { debrisCategories } from './debris.ts'
import type { ErrorItem } from './formErrors.ts'
import { toDateString } from './format.ts'

/** A field of the report form: 'bags', or a row's field such as 'items.2.count' */
export type ImpactField = FieldPath<ImpactFormValues>

// Read once, when the app starts (like the check-in desk's date)
const today = toDateString(new Date())

/** Impact can be reported once a cleanup has taken place: the API has the same rule */
export function canReportImpact(event: CleanupEvent): boolean {
  return event.status === 'completed' || (event.status === 'scheduled' && event.date <= today)
}

/** The saved report as text for the form, or an empty report with one row to fill in */
export function toImpactValues(report: ImpactReport | null): ImpactFormValues {
  if (report === null) {
    return {
      volunteersAttended: '',
      bags: '',
      weightKg: '',
      items: [{ category: 'plastic-bottles', count: '' }],
      notes: '',
    }
  }
  return {
    volunteersAttended: String(report.volunteersAttended),
    bags: String(report.bags),
    weightKg: String(report.weightKg),
    items: report.items.map((item) => ({ category: item.category, count: String(item.count) })),
    notes: report.notes,
  }
}

/** The first kind of debris that is not in the list yet (undefined when all of them are) */
export function nextCategory(items: ImpactFormValues['items']): DebrisCategory | undefined {
  return debrisCategories.find((category) => items.every((item) => item.category !== category))
}

/** "Row 2: …" for the debris list's messages: in the error summary they appear without their row */
export function withRowNumbers(errors: ErrorItem[]): ErrorItem[] {
  return errors.map((error) => {
    const row = /^items\.(\d+)\./.exec(error.id)?.[1]
    if (row === undefined) return error
    return { ...error, message: `Row ${Number(row) + 1}: ${error.message}` }
  })
}
