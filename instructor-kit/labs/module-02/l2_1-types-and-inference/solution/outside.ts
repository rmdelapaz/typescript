// Lab 2.1, Tasks 2 and 3 (reference solution)

// Task 2: outside data is unknown until checked
export function capacityFrom(json: string): number | null {
  const value: unknown = JSON.parse(json)
  if (typeof value === 'number') {
    return value
  }
  return null
}

// Task 3: handle the "nothing saved" case first
export function welcome(savedName: string | null): string {
  if (savedName === null) {
    return 'Welcome, new volunteer'
  }
  return `Welcome back, ${savedName.trim()}`
}

// Task 3: find gives undefined when nothing matches
export function firstOver(weights: number[], limit: number): string {
  const heavy = weights.find((weight) => weight > limit)
  if (heavy === undefined) {
    return `No bag over ${limit} kg`
  }
  return `First bag over ${limit} kg: ${heavy.toFixed(1)} kg`
}
