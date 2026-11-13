// Lab 11.2's tests (do not edit). `npm test` runs them; `npm run check` (tsc) checks the types in them too:
// an @ts-expect-error line that is no error (TS2578), or an Expect<...> that is false (TS2344), is your to-do.
import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import type { ChangeEvent, Getters, SiteFilters, Unwrap } from './computed.ts'
import { changeEvent } from './computed.ts'
import { reportTitle, terrainTip } from './tables.ts'
import { knownPlaces, nextLowTide } from './tide-clock.js'
import { tideReport } from './tides.ts'

// Type-level tests: Expect<true> compiles, Expect<false> is error TS2344
type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false
type Expect<T extends true> = T

export type TypeTests = [
  Expect<Equal<Getters<SiteFilters>, { getTerrain: () => SiteFilters['terrain']; getMinSpots: () => number; getSearch: () => string }>>,
  Expect<Equal<Unwrap<Promise<number>>, number>>,
  Expect<Equal<Unwrap<string>, string>>,
  Expect<Equal<Extract<ChangeEvent, `sites:${string}`>, 'sites:created' | 'sites:updated' | 'sites:deleted'>>,
]

describe('Task 1: satisfies, not as', () => {
  it('has a tip for every terrain', () => {
    assert.equal(terrainTip('marsh'), 'BOOTS, NOT SANDALS')
    assert.equal(terrainTip('sand'), 'BRING SUNSCREEN')
  })

  it('titles the three reports, and only those (npm run check checks this test)', () => {
    assert.equal(reportTitle('impact'), 'Impact so far · Shoreline Crew HQ')
    // @ts-expect-error 'volunteers' is not one of the report names
    assert.equal(typeof reportTitle('volunteers'), 'string')
  })
})

describe('Task 2: mapped, conditional and template literal types', () => {
  it('builds a change event from its two parts', () => {
    assert.equal(changeEvent('sites', 'updated'), 'sites:updated')
  })

  it('refuses a change that does not exist (npm run check checks this test)', () => {
    // @ts-expect-error 'archived' is not a Change, so 'events:archived' is not a ChangeEvent
    const archived: ChangeEvent = 'events:archived'
    assert.equal(archived.length, 15)
  })
})

describe('Task 3: a declaration file for a JavaScript file', () => {
  it('reports every place it knows', () => {
    assert.deepEqual(tideReport(), [
      'Driftwood Cove: low tide at 07:42',
      'North Jetty: low tide at 08:05',
      'Seal Rock Beach: low tide at 07:58',
    ])
  })

  it('takes a place name, not a number (npm run check checks this test)', () => {
    // @ts-expect-error a place is a name, not a number
    assert.equal(nextLowTide(42), '42: no tide data')
    assert.equal(knownPlaces.length, 3)
  })
})
