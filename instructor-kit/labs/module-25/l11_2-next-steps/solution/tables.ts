// Task 1: satisfies, not as (Lab 11.2, reference solution)
export type Terrain = 'sand' | 'rocks' | 'mixed' | 'marsh'

// satisfies CHECKS the table against the type: a missing terrain is error TS2741 here, not a crash later
const terrainTips = {
  sand: 'Bring sunscreen',
  rocks: 'Gloves and sturdy shoes',
  mixed: 'Sturdy shoes',
  marsh: 'Boots, not sandals',
} satisfies Record<Terrain, string>

export function terrainTip(terrain: Terrain): string {
  return terrainTips[terrain].toUpperCase()
}

// satisfies checks every value is a string AND keeps the table's own keys: ReportName is exactly these three
const reportTitles = {
  weekly: 'This week on the beach',
  impact: 'Impact so far',
  roster: 'Volunteer roster',
} satisfies Record<string, string>

export type ReportName = keyof typeof reportTitles

export function reportTitle(report: ReportName): string {
  return `${reportTitles[report]} · Shoreline Crew HQ`
}
