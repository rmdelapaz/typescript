// Tests (do not edit): npm test runs them, npm run check type-checks them with your code.
import assert from 'node:assert/strict'
import { test } from 'node:test'
import { averageBags, bagsLine, leadOrganizer, weighIns } from './numbers.ts'
import { capacityFrom, firstOver, welcome } from './outside.ts'

test('Task 1: averageBags and bagsLine', () => {
  assert.equal(averageBags(45, 3), 15)
  assert.equal(bagsLine('North Jetty', 4), 'North Jetty: 4 bags')
})

test('Task 1: the weigh-ins and the lead organizer', () => {
  assert.equal(weighIns.reduce((sum, kg) => sum + kg, 0), 35.75)
  assert.equal(leadOrganizer, 'Maya Okafor')
})

test('Task 2: a number from the saved form', () => {
  assert.equal(capacityFrom('18'), 18)
  assert.equal(capacityFrom('0'), 0)
})

test('Task 2: anything else is null', () => {
  assert.equal(capacityFrom('"18"'), null)
  assert.equal(capacityFrom('true'), null)
  assert.equal(capacityFrom('null'), null)
})

test('Task 3: a returning volunteer and a first visit', () => {
  assert.equal(welcome('  Maya Okafor '), 'Welcome back, Maya Okafor')
  assert.equal(welcome(null), 'Welcome, new volunteer')
})

test('Task 3: the first bag over the limit, or none', () => {
  assert.equal(firstOver([12.5, 22.25, 30], 20), 'First bag over 20 kg: 22.3 kg')
  assert.equal(firstOver([12.5, 8], 20), 'No bag over 20 kg')
})

// Task 1 is done when npm run check accepts these lines: a weigh-in is a number, and the parameters are typed.
// (The function is never called: only the type checker reads it.)
function typeChecksOnly() {
  // @ts-expect-error: a weigh-in is a number, not text
  weighIns.push('heavy')
  // @ts-expect-error: bags is a number
  bagsLine('North Jetty', 'four')
}
