// Uses the untyped JavaScript file (Lab 11.2, Task 3). Do not edit: give tide-clock.js a declaration file.
import { knownPlaces, nextLowTide } from './tide-clock.js'

export function tideReport(): string[] {
  return knownPlaces.map((place) => nextLowTide(place))
}
