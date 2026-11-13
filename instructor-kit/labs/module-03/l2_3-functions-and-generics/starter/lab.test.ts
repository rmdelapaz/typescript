// Tests (do not edit): npm test runs them, npm run check type-checks them with your code.
import assert from 'node:assert/strict'
import { test } from 'node:test'
import { formatAll, hoursLine, indexById, lastOf, sumBy, totalHours, type Shift, type ShiftFormatter } from './shifts.ts'

const shifts: Shift[] = [
  { id: 'sh1', volunteer: 'Maya Okafor', site: 'Driftwood Cove', role: 'lead', hours: 3 },
  { id: 'sh2', volunteer: 'Theo Nakamura', site: 'North Jetty', role: 'crew', hours: 2.5 },
  { id: 'sh3', volunteer: 'Amara Diallo', site: 'Pelican Point Beach', role: 'first-aid', hours: 4 },
]
const maya = shifts[0]!

test('Task 1: hoursLine with and without options', () => {
  assert.equal(hoursLine(maya), 'Maya Okafor: 3h')
  assert.equal(hoursLine(maya, { showRole: true }), 'Maya Okafor (lead): 3h')
  assert.equal(hoursLine(maya, { unit: ' hours' }), 'Maya Okafor: 3 hours')
})

test('Task 1: totalHours takes any number of hours', () => {
  assert.equal(totalHours(3, 2.5, 4), 9.5)
  assert.equal(totalHours(), 0)
})

test('Task 2: formatAll applies one formatter to every shift', () => {
  const siteOnly: ShiftFormatter = (shift) => shift.site
  assert.deepEqual(formatAll(shifts, siteOnly), ['Driftwood Cove', 'North Jetty', 'Pelican Point Beach'])
  assert.deepEqual(formatAll(shifts, (shift) => hoursLine(shift, { showRole: true })).at(-1), 'Amara Diallo (first-aid): 4h')
})

test('Task 3: lastOf, for any list', () => {
  assert.equal(lastOf(shifts)?.volunteer, 'Amara Diallo')
  assert.equal(lastOf(['pelican-point', 'north-jetty']), 'north-jetty')
  assert.equal(lastOf([]), undefined)
})

test('Task 3: sumBy and indexById', () => {
  assert.equal(sumBy(shifts, (shift) => shift.hours), 9.5)
  assert.equal(sumBy(['gloves', 'bags'], (word) => word.length), 10)
  assert.equal(indexById(shifts).get('sh2')?.volunteer, 'Theo Nakamura')
})

// Tasks 1 to 3 are done when npm run check accepts these lines. Each @ts-expect-error EXPECTS an error.
// (The function is never called: only the type checker reads it.)
function typeChecksOnly() {
  // @ts-expect-error: there is no option called showRol (Task 1: an interface for the options)
  hoursLine(maya, { showRol: true })
  // @ts-expect-error: hours are numbers (Task 1)
  totalHours(3, '2.5')
  // @ts-expect-error: a formatter returns text, not a number (Task 2)
  formatAll(shifts, (shift) => shift.hours)
  // @ts-expect-error: lastOf may find nothing, so it is not always a Shift (Task 3)
  const last: Shift = lastOf(shifts)
  // @ts-expect-error: numbers have no id (Task 3: a constraint)
  indexById([1, 2, 3])
  const name: string | undefined = lastOf(shifts)?.volunteer
  void [last, name]
}
