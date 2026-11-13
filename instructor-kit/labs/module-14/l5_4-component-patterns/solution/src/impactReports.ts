// Two real impact reports from shoreline-api (GET /api/events/e01/impact and /e02/impact), trimmed to
// the fields this lab uses. Captured once; the course API sends the same numbers.
export interface DebrisCount {
  category: string
  count: number
}

export interface ImpactReport {
  eventId: string
  volunteersAttended: number
  bags: number
  weightKg: number
  items: DebrisCount[]
}

export const impactReports: ImpactReport[] = [
  {
    eventId: 'e01',
    volunteersAttended: 10,
    bags: 5,
    weightKg: 18.5,
    items: [
      { category: 'plastic-bottles', count: 66 },
      { category: 'plastic-bags', count: 61 },
      { category: 'food-wrappers', count: 59 },
      { category: 'bottle-caps', count: 52 },
      { category: 'cigarette-butts', count: 241 },
      { category: 'fishing-gear', count: 50 },
      { category: 'glass', count: 76 },
      { category: 'metal', count: 79 },
      { category: 'foam', count: 76 },
      { category: 'other', count: 63 },
    ],
  },
  {
    eventId: 'e02',
    volunteersAttended: 8,
    bags: 6,
    weightKg: 24.2,
    items: [
      { category: 'plastic-bottles', count: 23 },
      { category: 'plastic-bags', count: 40 },
      { category: 'food-wrappers', count: 26 },
      { category: 'bottle-caps', count: 62 },
      { category: 'cigarette-butts', count: 202 },
      { category: 'fishing-gear', count: 251 },
      { category: 'glass', count: 38 },
      { category: 'metal', count: 24 },
      { category: 'foam', count: 26 },
      { category: 'other', count: 49 },
    ],
  },
]
