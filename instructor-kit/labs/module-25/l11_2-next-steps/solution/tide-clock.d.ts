// tide-clock.d.ts: types for tide-clock.js, which ships none (Lab 11.2, Task 3, reference solution).
// A promise made on the file's behalf: only what it really does, with real parameter types (never any).

/** The next low tide at a place, as a sentence */
export function nextLowTide(place: string): string

/** The places it has data for (a frozen list) */
export const knownPlaces: readonly string[]
