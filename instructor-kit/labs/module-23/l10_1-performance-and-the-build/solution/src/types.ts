export interface Tide {
  date: string // YYYY-MM-DD
  time: string // HH:MM, local time
  heightM: number
  kind: 'high' | 'low'
}
