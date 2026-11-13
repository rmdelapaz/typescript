// The types this lab needs, copied verbatim from shoreline-api/core/types.ts (the API's contract).
// Do not edit: when the API changes, copy them again.

/** "YYYY-MM-DD" */
export type DateString = string

export type Skill = 'first-aid' | 'boat-handling' | 'heavy-lifting' | 'photography' | 'data-recording' | 'team-lead'

export type DebrisCategory =
  | 'plastic-bottles'
  | 'plastic-bags'
  | 'food-wrappers'
  | 'bottle-caps'
  | 'cigarette-butts'
  | 'fishing-gear'
  | 'glass'
  | 'metal'
  | 'foam'
  | 'other'

export interface ImpactTotals {
  from: DateString | null
  to: DateString | null
  events: number
  volunteerHours: number
  volunteersAttended: number
  bags: number
  weightKg: number
  byCategory: Record<DebrisCategory, number>
  byMonth: Array<{ month: string; events: number; weightKg: number }>
  bySite: Array<{ siteId: string; events: number; weightKg: number }>
}

export interface Meta {
  organization: string
  tagline: string
  timeZone: string
  today: DateString
  skills: Array<{ id: Skill; label: string }>
  debrisCategories: Array<{ id: DebrisCategory; label: string }>
  apiVersion: string
}
