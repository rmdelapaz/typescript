// Given: what a team lead can take from the supply shed. Nothing to change here.
export const supplyItems = ['gloves', 'bags', 'grabbers', 'buckets', 'first-aid-kits'] as const
export type SupplyItem = (typeof supplyItems)[number]

export const supplyLabels: Record<SupplyItem, string> = {
  gloves: 'Gloves',
  bags: 'Bags',
  grabbers: 'Grabbers',
  buckets: 'Buckets',
  'first-aid-kits': 'First aid kits',
}
