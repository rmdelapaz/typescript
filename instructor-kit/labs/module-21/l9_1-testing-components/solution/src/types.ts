// The crew's volunteer shifts (a small lab app, not shoreline-hq)
export type ShiftStatus = 'planned' | 'worked' | 'missed'

export interface Shift {
  id: string
  volunteer: string
  site: string
  date: string // YYYY-MM-DD
  hours: number
  status: ShiftStatus
}

export type Badge = 'none' | 'bronze' | 'silver' | 'gold'
