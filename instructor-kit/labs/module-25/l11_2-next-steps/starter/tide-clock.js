// A small JavaScript helper from a neighboring club. It ships no types (Lab 11.2, Task 3): do not edit it,
// describe it in a declaration file next to it.
const lowTides = { 'Driftwood Cove': '07:42', 'North Jetty': '08:05', 'Seal Rock Beach': '07:58' }

/** The next low tide at a place, as a sentence */
export function nextLowTide(place) {
  const time = lowTides[place]
  return time ? `${place}: low tide at ${time}` : `${place}: no tide data`
}

/** The places it has data for */
export const knownPlaces = Object.freeze(Object.keys(lowTides))
