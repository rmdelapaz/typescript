// Task 2: a label for every debris category, worded like the API's own labels (GET /api/meta).
// TODO 2: type the table so that TypeScript knows the ten categories (the type is in ./api/types.ts) and
// reports a missing or misspelled one, then complete it.
export const debrisLabels: Record<string, string> = {
  'plastic-bottles': 'Plastic bottles',
  'plastic-bags': 'Plastic bags',
  glass: 'Glass',
}
