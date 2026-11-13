// Checkpoint 1: model answer (instructor copy)

export type Zone = 'high' | 'middle' | 'low'

export interface Survey {
  id: string
  site: string
  animal: string
  zone: Zone
  count: number
  note?: string
  verifiedBy: string | null
}

export function surveyLine(survey: Survey): string {
  const verified = survey.verifiedBy === null ? 'not verified yet' : `verified by ${survey.verifiedBy}`
  const note = survey.note === undefined ? '' : ` (${survey.note})`
  return `${survey.animal} at ${survey.site} (${survey.zone} zone): ${survey.count}, ${verified}${note}`
}

export type SurveyFormatter = (survey: Survey) => string

export function formatAll(surveys: Survey[], format: SurveyFormatter = surveyLine): string[] {
  return surveys.map(format)
}

export function maxBy<T>(items: T[], valueOf: (item: T) => number): T | undefined {
  let best: T | undefined
  for (const item of items) {
    if (best === undefined || valueOf(item) > valueOf(best)) {
      best = item
    }
  }
  return best
}

const zones: Zone[] = ['high', 'middle', 'low']

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export function isSurvey(value: unknown): value is Survey {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.site === 'string' &&
    typeof value.animal === 'string' &&
    zones.some((zone) => zone === value.zone) &&
    typeof value.count === 'number' &&
    (value.note === undefined || typeof value.note === 'string') &&
    (value.verifiedBy === null || typeof value.verifiedBy === 'string')
  )
}

export function readSurveys(json: string): Survey[] {
  const data: unknown = JSON.parse(json)
  if (Array.isArray(data) && data.every(isSurvey)) {
    return data
  }
  throw new Error('Unexpected survey data')
}

export type SurveyEdit = Partial<Omit<Survey, 'id'>>
