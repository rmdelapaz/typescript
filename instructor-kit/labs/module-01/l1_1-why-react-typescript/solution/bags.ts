// Lab 1.1, Task 2 (reference solution): the three lines fixed

export interface BagCount {
  siteName: string
  bags: number
  weightKg: number
}

export const counts: BagCount[] = [
  { siteName: 'Driftwood Cove', bags: 9, weightKg: 31.5 },
  { siteName: 'North Jetty', bags: 4, weightKg: 12 },
  { siteName: 'Pelican Point Beach', bags: 14, weightKg: 40 },
]

export function totalWeight(list: BagCount[]): number {
  let total = 0
  for (const count of list) {
    total += count.weightKg
  }
  return total
}
