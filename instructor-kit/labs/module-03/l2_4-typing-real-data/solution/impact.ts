// Lab 2.4 (reference solution)
import type { DebrisCategory, ImpactTotals } from './types.ts'

const categories: DebrisCategory[] = [
  'plastic-bottles',
  'plastic-bags',
  'food-wrappers',
  'bottle-caps',
  'cigarette-butts',
  'fishing-gear',
  'glass',
  'metal',
  'foam',
  'other',
]

export function isDebrisCategory(value: unknown): value is DebrisCategory {
  return categories.some((category) => category === value)
}

export function knownCategories(words: string[]): DebrisCategory[] {
  return words.filter(isDebrisCategory)
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isTextOrNull(value: unknown): value is string | null {
  return value === null || typeof value === 'string'
}

function isMonthRow(value: unknown): boolean {
  return isRecord(value) && typeof value.month === 'string' && typeof value.events === 'number' && typeof value.weightKg === 'number'
}

function isSiteRow(value: unknown): boolean {
  return isRecord(value) && typeof value.siteId === 'string' && typeof value.events === 'number' && typeof value.weightKg === 'number'
}

export function isImpactTotals(value: unknown): value is ImpactTotals {
  return (
    isRecord(value) &&
    isTextOrNull(value.from) &&
    isTextOrNull(value.to) &&
    typeof value.events === 'number' &&
    typeof value.volunteerHours === 'number' &&
    typeof value.volunteersAttended === 'number' &&
    typeof value.bags === 'number' &&
    typeof value.weightKg === 'number' &&
    isRecord(value.byCategory) &&
    categories.every((category) => isRecord(value.byCategory) && typeof value.byCategory[category] === 'number') &&
    Array.isArray(value.byMonth) && value.byMonth.every(isMonthRow) &&
    Array.isArray(value.bySite) && value.bySite.every(isSiteRow)
  )
}

export function readImpact(json: string): ImpactTotals {
  const data: unknown = JSON.parse(json)
  if (isImpactTotals(data)) {
    return data
  }
  throw new Error('Unexpected data from GET /api/impact')
}

export type Headline = Pick<ImpactTotals, 'events' | 'bags' | 'weightKg'>
export type CategoryCounts = Record<DebrisCategory, number>
export type CountsEdit = Partial<CategoryCounts>

export function headline(totals: ImpactTotals): Headline {
  return { events: totals.events, bags: totals.bags, weightKg: totals.weightKg }
}

export function addCounts(counts: CategoryCounts, edit: CountsEdit): CategoryCounts {
  const result = { ...counts }
  for (const category of categories) {
    result[category] += edit[category] ?? 0
  }
  return result
}
