import type { HaulLog } from './types.ts'

export interface BeachTotal {
  beach: string
  kg: number
}

// Adds up every log per beach, heaviest beach first: real work on a long list (the tests count the calls)
export function totalsByBeach(logs: HaulLog[]): BeachTotal[] {
  const totals = new Map<string, number>()
  for (const log of logs) {
    totals.set(log.beach, (totals.get(log.beach) ?? 0) + log.kg)
  }
  return [...totals]
    .map(([beach, kg]) => ({ beach, kg: Math.round(kg * 10) / 10 }))
    .toSorted((a, b) => b.kg - a.kg)
}
