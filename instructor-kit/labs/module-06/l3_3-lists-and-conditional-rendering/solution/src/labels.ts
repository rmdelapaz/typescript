import type { DebrisCategory } from './api/types.ts'

// Task 2: a label for every debris category, worded like the API's own labels (GET /api/meta).
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
