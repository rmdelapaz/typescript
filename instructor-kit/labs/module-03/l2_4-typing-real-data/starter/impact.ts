// Lab 2.4: the crew's impact numbers, checked at the door. Tasks 1 to 3 are in TASKS.md.
// Task 1: npm test cannot even start. Read its error, then run npm run check, and fix this line.
import { DebrisCategory, ImpactTotals } from './types.ts'

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

// Task 2: make this a type guard: when it returns true, the value IS a DebrisCategory
export function isDebrisCategory(value: unknown): boolean {
  return categories.some((category) => category === value)
}

// Task 2: the words from a tally sheet that are real categories
export function knownCategories(words: string[]): DebrisCategory[] {
  return words.filter(isDebrisCategory)
}

// Task 2: is this really the answer of GET /api/impact? Check every property ImpactTotals promises.
export function isImpactTotals(value: unknown): value is ImpactTotals {
  throw new Error(`TODO 2: check ${JSON.stringify(value).slice(0, 40)}...`)
}

export function readImpact(json: string): ImpactTotals {
  const data: unknown = JSON.parse(json)
  if (isImpactTotals(data)) {
    return data
  }
  throw new Error('Unexpected data from GET /api/impact')
}

// Task 3: types made from types (utility types; write no property by hand)
export type Headline = ImpactTotals            // TODO 3: only events, bags and weightKg
export type CategoryCounts = Record<string, number>   // TODO 3: exactly one count per DebrisCategory
export type CountsEdit = CategoryCounts        // TODO 3: some categories, all optional

export function headline(totals: ImpactTotals): Headline {
  throw new Error(`TODO 3: the headline of ${totals.events} cleanups`)
}

// Task 3: new counts with the edit added (a copy: never change `counts` itself)
export function addCounts(counts: CategoryCounts, edit: CountsEdit): CategoryCounts {
  throw new Error(`TODO 3: add ${JSON.stringify(edit)}`)
}
