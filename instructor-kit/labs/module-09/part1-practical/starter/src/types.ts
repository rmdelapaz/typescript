// Given: Juniper Hill Community Garden's volunteer work days
export type WorkDayStatus = 'open' | 'full' | 'cancelled'

export interface WorkDay {
  id: string
  title: string
  day: string
  spotsLeft: number
  status: WorkDayStatus
}
