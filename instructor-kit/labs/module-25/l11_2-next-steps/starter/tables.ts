// Task 1: satisfies, not as (Lab 11.2)
export type Terrain = 'sand' | 'rocks' | 'mixed' | 'marsh'

// TODO 1: "as" tells TypeScript to trust you, so the missing marsh line compiles and crashes later.
// Make TypeScript CHECK the table instead (satisfies), then add what it says is missing:
// marsh is 'Boots, not sandals'.
const terrainTips = {
  sand: 'Bring sunscreen',
  rocks: 'Gloves and sturdy shoes',
  mixed: 'Sturdy shoes',
} as Record<Terrain, string>

export function terrainTip(terrain: Terrain): string {
  return terrainTips[terrain].toUpperCase()
}

// TODO 1: this annotation throws the keys away, so any string is a report name. Keep the keys: satisfies.
const reportTitles: Record<string, string> = {
  weekly: 'This week on the beach',
  impact: 'Impact so far',
  roster: 'Volunteer roster',
}

export type ReportName = keyof typeof reportTitles

export function reportTitle(report: ReportName): string {
  return `${reportTitles[report]} · Shoreline Crew HQ`
}
