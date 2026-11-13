// The API's debris categories and the HQ's words for them (GET /api/meta lists the same ones).
// Used by the impact report on a cleanup's page and by the form that writes it.
import type { DebrisCategory } from '../api/types.ts'

/** Every category, in the API's order */
export const debrisCategories: DebrisCategory[] = [
  'plastic-bottles', 'plastic-bags', 'food-wrappers', 'bottle-caps', 'cigarette-butts',
  'fishing-gear', 'glass', 'metal', 'foam', 'other',
]

/** What the HQ calls each category */
export const debrisLabels: Record<DebrisCategory, string> = {
  'plastic-bottles': 'Plastic bottles',
  'plastic-bags': 'Plastic bags',
  'food-wrappers': 'Food wrappers',
  'bottle-caps': 'Bottle caps',
  'cigarette-butts': 'Cigarette butts',
  'fishing-gear': 'Fishing line and nets',
  glass: 'Glass',
  metal: 'Metal and cans',
  foam: 'Foam pieces',
  other: 'Other',
}
