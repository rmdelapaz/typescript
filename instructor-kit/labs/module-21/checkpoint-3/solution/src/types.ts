// A volunteer shift at one beach site, as the crew's shifts API sends it (a checkpoint app, not shoreline-hq)
export interface Shift {
  id: string
  siteId: string
  volunteer: string
  date: string // YYYY-MM-DD
  hours: number
}

/** What the "Add a shift" form sends: the API gives the id */
export type NewShift = Omit<Shift, 'id'>
