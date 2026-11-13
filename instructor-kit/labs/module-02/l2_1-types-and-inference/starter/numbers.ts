// Lab 2.1, Task 1: annotate the edges.
// npm run check reports every place where TypeScript cannot guess a type. Add a type ONLY there
// (a parameter, an empty array, a value that arrives later) and let inference do the rest.
// Do not change what the functions return.

export function averageBags(totalBags, cleanups) {
  return totalBags / cleanups
}

export function bagsLine(siteName, bags) {
  return `${siteName}: ${bags} bags`
}

// Weights from the scale at the last cleanup, in kilograms: empty until the scale reports
export const weighIns = []
weighIns.push(12.5, 8, 15.25)

// The lead organizer is chosen after the sign-ups are in
export let leadOrganizer
leadOrganizer = 'Maya Okafor'
