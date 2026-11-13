// Checkpoint 1: Module 2 (Lessons 2.1 to 2.4). 30 minutes, alone. TASKS.md has the three tasks.
// A tide-pool survey: volunteers count one kind of animal in one zone of a site's tide pools.

// Task 1: the types (replace each TODO; read the sample surveys in lab.test.ts first)
export type Zone = string                  // TODO 1: exactly 'high', 'middle' or 'low'
export interface Survey {}                 // TODO 1: id, site, animal, zone, count, an optional note, verifiedBy (a name or null)

// Task 1: "Sea stars at Pelican Point Beach (low zone): 12, verified by Maya Okafor"
//         "Hermit crabs at North Jetty (middle zone): 0, not verified yet (Fog all morning)"
export function surveyLine(survey: Survey): string {
  throw new Error(`TODO 1: a line for ${JSON.stringify(survey)}`)
}

// Task 2: a function type and a generic helper
export type SurveyFormatter = unknown       // TODO 2: takes a Survey, returns a line of text

export function formatAll(surveys: Survey[], format: SurveyFormatter = surveyLine): string[] {
  throw new Error(`TODO 2: format ${surveys.length} surveys with ${String(format)}`)
}

// The item with the largest value, or undefined for an empty list: for surveys, sites, anything
export function maxBy(items, valueOf) {
  throw new Error(`TODO 2: the biggest of ${items} by ${valueOf}`)
}

// Task 3: data from outside (a volunteer's phone sends JSON): check it at the door
export function isSurvey(value: unknown): boolean {
  throw new Error(`TODO 3: is ${JSON.stringify(value)} a survey?`)
}

export function readSurveys(json: string): Survey[] {
  throw new Error(`TODO 3: read the surveys in ${json.slice(0, 30)}...`)
}

export type SurveyEdit = Survey             // TODO 3: any property except id, all optional
