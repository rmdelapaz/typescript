// Lab 2.1, Task 1 (reference solution): types only at the edges

export function averageBags(totalBags: number, cleanups: number) {
  return totalBags / cleanups
}

export function bagsLine(siteName: string, bags: number) {
  return `${siteName}: ${bags} bags`
}

// Weights from the scale at the last cleanup, in kilograms: empty until the scale reports
export const weighIns: number[] = []
weighIns.push(12.5, 8, 15.25)

// The lead organizer is chosen after the sign-ups are in
export let leadOrganizer: string
leadOrganizer = 'Maya Okafor'
