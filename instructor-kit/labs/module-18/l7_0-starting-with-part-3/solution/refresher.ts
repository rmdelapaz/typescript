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
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.name === 'string' &&
    typeof value.town === 'string' &&
    typeof value.accessible === 'boolean'
  )
}

// Task 2 (Lesson 2.3): one generic function for every list the API sends.
export function parseList<T>(data: unknown, isItem: (value: unknown) => value is T): T[] {
  if (!Array.isArray(data) || !data.every(isItem)) {
    throw new Error('Not a list of the expected items')
  }
  return data
}

// Task 3 (Lessons 2.2, 4.1 and 5.1): one sentence per screen state.
export function statusLine(state: LoadState<SiteSummary[]>): string {
  switch (state.kind) {
    case 'loading':
      return 'Loading the sites…'
    case 'error':
      return `Could not load the sites: ${state.message}`
    case 'ready': {
      const stepFree = state.data.filter((site) => site.accessible).length
      return `${state.data.length} sites, ${stepFree} step-free`
    }
    default:
      return assertNever(state)
  }
}
