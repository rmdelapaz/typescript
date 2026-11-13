// Lab 2.1, Tasks 2 and 3: values from outside, and values that may be missing.

// Task 2: a capacity saved by the "Plan a cleanup" form comes back as JSON text.
// Return the number when the JSON holds a number, and null for anything else ('"18"', 'true', 'null', ...).
// The tempting one-liner is `return JSON.parse(json)`: npm run check accepts it (JSON.parse returns any),
// and the tests show what it lets through.
export function capacityFrom(json: string): number | null {
  throw new Error(`TODO 2: read a capacity from ${json}`)
}

// Task 3: sessionStorage.getItem gives a saved name, or null on a first visit.
export function welcome(savedName: string | null): string {
  return `Welcome back, ${savedName.trim()}`
}

// Task 3: the first weigh-in over the limit, or a sentence saying there is none.
export function firstOver(weights: number[], limit: number): string {
  const heavy = weights.find((weight) => weight > limit)
  return `First bag over ${limit} kg: ${heavy.toFixed(1)} kg`
}
