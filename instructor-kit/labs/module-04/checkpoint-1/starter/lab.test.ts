// Tests (do not edit): npm test runs them, npm run check type-checks them with your code.
import assert from 'node:assert/strict'
import { test } from 'node:test'
import { formatAll, isSurvey, maxBy, readSurveys, surveyLine,
  type Survey, type SurveyEdit, type SurveyFormatter, type Zone } from './survey.ts'

const stars: Survey = { id: 's1', site: 'Pelican Point Beach', animal: 'Sea stars', zone: 'low', count: 12, verifiedBy: 'Maya Okafor' }
const crabs: Survey = { id: 's2', site: 'North Jetty', animal: 'Hermit crabs', zone: 'middle', count: 0, note: 'Fog all morning', verifiedBy: null }
const anemones: Survey = { id: 's3', site: 'Otter Creek Mouth', animal: 'Anemones', zone: 'low', count: 31, verifiedBy: null }

test('Task 1: one line per survey', () => {
  assert.equal(surveyLine(stars), 'Sea stars at Pelican Point Beach (low zone): 12, verified by Maya Okafor')
  assert.equal(surveyLine(crabs), 'Hermit crabs at North Jetty (middle zone): 0, not verified yet (Fog all morning)')
})

test('Task 2: formatAll with the default and with another formatter', () => {
  assert.equal(formatAll([stars, crabs]).length, 2)
  const animalOnly: SurveyFormatter = (survey) => survey.animal
  assert.deepEqual(formatAll([stars, crabs, anemones], animalOnly), ['Sea stars', 'Hermit crabs', 'Anemones'])
})

test('Task 2: maxBy works for surveys and for anything else', () => {
  assert.equal(maxBy([stars, crabs, anemones], (survey) => survey.count)?.id, 's3')
  assert.equal(maxBy(['gloves', 'grabber', 'bag'], (word) => word.length), 'grabber')
  assert.equal(maxBy([], (n: number) => n), undefined)
})

test('Task 3: a guard for one survey', () => {
  assert.equal(isSurvey(crabs), true)
  assert.equal(isSurvey({ ...stars, zone: 'reef' }), false)
  assert.equal(isSurvey({ ...stars, count: '12' }), false)
  assert.equal(isSurvey({ ...stars, verifiedBy: undefined }), false)
  assert.equal(isSurvey(null), false)
})

test('Task 3: readSurveys checks what the phone sent', () => {
  assert.equal(readSurveys(JSON.stringify([stars, crabs, anemones])).length, 3)
  assert.throws(() => readSurveys(JSON.stringify([stars, { id: 's9' }])), /Unexpected survey data/)
  assert.throws(() => readSurveys('{"surveys": []}'), /Unexpected survey data/)
})

// The checkpoint is done when npm run check accepts these lines. Each @ts-expect-error EXPECTS an error.
// (The function is never called: only the type checker reads it.)
function typeChecksOnly(value: unknown) {
  // @ts-expect-error: a reef is not a zone (Task 1)
  const reef: Zone = 'reef'
  // @ts-expect-error: verifiedBy is always there, even when it is null (Task 1)
  const missing: Survey = { id: 's4', site: 'North Jetty', animal: 'Limpets', zone: 'high', count: 4 }
  // @ts-expect-error: maxBy may find nothing (Task 2)
  const best: Survey = maxBy([stars], (survey) => survey.count)
  // @ts-expect-error: a formatter returns text (Task 2)
  formatAll([stars], (survey) => survey.count)
  if (isSurvey(value)) {
    const zone: Zone = value.zone          // Task 3: only a type guard makes this line pass
    void zone
  }
  const edit: SurveyEdit = { count: 13 }
  // @ts-expect-error: an edit never changes the id (Task 3)
  const idEdit: SurveyEdit = { id: 's9' }
  void [reef, missing, best, edit, idEdit]
}
