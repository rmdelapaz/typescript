// Tests (do not edit): npm test runs them, npm run check type-checks them with your code.
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import { addCounts, headline, isDebrisCategory, knownCategories, readImpact,
  type CategoryCounts, type CountsEdit, type Headline } from './impact.ts'
import type { DebrisCategory, Meta } from './types.ts'

// The real answers of GET /api/impact and GET /api/meta, saved from the course API
const impactJson = readFileSync(new URL('../fixtures/impact.json', import.meta.url), 'utf8')
const meta: Meta = JSON.parse(readFileSync(new URL('../fixtures/meta.json', import.meta.url), 'utf8'))

test('Task 2: every category the API lists is a DebrisCategory, and nothing else is', () => {
  for (const { id } of meta.debrisCategories) {
    assert.equal(isDebrisCategory(id), true, id)
  }
  assert.equal(isDebrisCategory('styrofoam'), false)
  assert.equal(isDebrisCategory(42), false)
  assert.deepEqual(knownCategories(['glass', 'styrofoam', 'foam']), ['glass', 'foam'])
})

test('Task 2: the real impact totals pass the door', () => {
  const totals = readImpact(impactJson)
  assert.equal(totals.events, 6)
  assert.equal(totals.byCategory.glass, 407)
})

test('Task 2: three broken answers are turned away', () => {
  const real = JSON.parse(impactJson)
  const textWeight = { ...real, weightKg: '176.2' }
  const { foam: _foam, ...noFoam } = real.byCategory
  const missingFoam = { ...real, byCategory: noFoam }
  for (const broken of [textWeight, missingFoam, [real]]) {
    assert.throws(() => readImpact(JSON.stringify(broken)), /Unexpected data from GET \/api\/impact/)
  }
})

test('Task 3: the headline numbers', () => {
  assert.deepEqual(headline(readImpact(impactJson)), { events: 6, bags: 45, weightKg: 176.2 })
})

test('Task 3: addCounts makes new counts and leaves the old ones alone', () => {
  const counts = readImpact(impactJson).byCategory
  const after = addCounts(counts, { glass: 3, foam: 1 })
  assert.equal(after.glass, 410)
  assert.equal(after.foam, 410)
  assert.equal(after.metal, 421)
  assert.equal(counts.glass, 407)
})

// Tasks 2 and 3 are done when npm run check accepts these lines. Each @ts-expect-error EXPECTS an error.
// (The function is never called: only the type checker reads it.)
function typeChecksOnly(value: unknown) {
  if (isDebrisCategory(value)) {
    const category: DebrisCategory = value      // Task 2: only a type guard makes this line pass
    void category
  }
  const fine: Headline = { events: 1, bags: 2, weightKg: 3 }
  // @ts-expect-error: a headline has only events, bags and weightKg
  const tooMuch: Headline = { events: 1, bags: 2, weightKg: 3, volunteerHours: 4 }
  // @ts-expect-error: every category needs a count
  const partial: CategoryCounts = { glass: 1 }
  const edit: CountsEdit = { glass: 2 }
  // @ts-expect-error: 'styrofoam' is not a category
  const wrong: CountsEdit = { styrofoam: 1 }
  void [fine, tooMuch, partial, edit, wrong]
}
