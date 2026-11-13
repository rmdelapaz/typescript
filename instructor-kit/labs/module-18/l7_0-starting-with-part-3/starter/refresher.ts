// Parts 1 and 2 refresher (Session 18): three habits Part 3 builds on, tried on the API's real answer for the sites.
//   npm test        runs refresher.test.ts (node:test runs the code, it does not check the types)
//   npm run check   tsc --noEmit: the type checks the tests cannot do

/** The fields of a site this practice needs (the HQ's full type is Site, in src/api/types.ts) */
export interface SiteSummary {
  id: string
  name: string
  town: string
  accessible: boolean
}

/** Lesson 4.1's screen states: a discriminated union on kind */
export type LoadState<T> =
  | { kind: 'loading' }
  | { kind: 'error'; message: string }
  | { kind: 'ready'; data: T }

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

/** Lesson 5.1: a switch that has handled every case can only reach this with a value of type never */
export function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${JSON.stringify(value)}`)
}

// Task 2 (Lesson 2.4): data from outside the program is unknown until a check proves its shape.
export function isSiteSummary(value: unknown): value is SiteSummary {
  // TODO 2: also check a string id, name and town, and a boolean accessible
  return isRecord(value)
}

// Task 2 (Lesson 2.3): one generic function for every list the API sends.
// TODO 2: give parseList a type parameter, so that parseList(data, isSiteSummary) returns SiteSummary[]
export function parseList(data: unknown, isItem: (value: unknown) => boolean): unknown[] {
  if (!Array.isArray(data) || !data.every(isItem)) {
    throw new Error('Not a list of the expected items')
  }
  return data
}

// Task 3 (Lessons 2.2, 4.1 and 5.1): one sentence per screen state.
export function statusLine(state: LoadState<SiteSummary[]>): string {
  // TODO 3: 'Loading the sites…' · 'Could not load the sites: MESSAGE' · '6 sites, 3 step-free'
  //         (count the accessible ones), and a default that calls assertNever
  return `TODO 3: ${state.kind}`
}
