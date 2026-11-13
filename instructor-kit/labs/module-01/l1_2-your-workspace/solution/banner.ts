// Lab 1.2 (reference solution): the typo fixed, the annotation corrected, the unused constant removed.

export const crewName: string = 'Shoreline Crew'
export const crewSize: number = 24

export function banner(): string {
  return `${crewName.toUpperCase()} · ${crewSize} volunteers`
}
