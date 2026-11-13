// Lab 1.1, Task 2: this file has THREE mistakes, and Node runs it anyway.
// Run `npm run check`, read each error from the top (file:line:column, the code, the message, the
// follow-up line), fix that line, run the check again. Do not change the interface.

export interface BagCount {
  siteName: string
  bags: number
  weightKg: number
}

export const counts: BagCount[] = [
  { siteName: 'Driftwood Cove', bags: 9, weightKg: 31.5 },
  { siteName: 'North Jetty', bags: '4', weightKg: 12 },
  { siteName: 'Pelican Point Beach', bags: 14 },
]

export function totalWeight(list: BagCount[]): number {
  let total = 0
  for (const count of list) {
    total += count.wieghtKg
  }
  return total
}
