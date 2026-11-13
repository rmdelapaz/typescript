// Tests (do not edit): npm test runs them, npm run check type-checks them with your code.
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import { counts, totalWeight } from './bags.ts'
import { statusLabel, summary, type CleanupEvent, type EventStatus } from './events.ts'

// the real answer of GET /api/events (saved in ../fixtures/events.json)
const events: CleanupEvent[] = JSON.parse(readFileSync(new URL('../fixtures/events.json', import.meta.url), 'utf8'))

test('Task 1: the summary of the first cleanup', () => {
  assert.equal(summary(events[0]!), 'Storm Debris Sweep (completed), 09:00 to 12:00: 10 spots left')
})

test('Task 1: a full cleanup has 0 spots left', () => {
  const cove = events.find((event) => summary(event).startsWith('Weekend Cove Cleanup'))
  assert.equal(summary(cove!), 'Weekend Cove Cleanup (scheduled), 09:00 to 11:30: 0 spots left')
})

test('Task 2: every count has a number of bags and a weight', () => {
  assert.equal(counts.length, 3)
  for (const count of counts) {
    assert.equal(typeof count.bags, 'number')
    assert.equal(typeof count.weightKg, 'number')
  }
})

test('Task 2: totalWeight adds the weights', () => {
  assert.equal(totalWeight([{ siteName: 'A', bags: 1, weightKg: 2.5 }, { siteName: 'B', bags: 3, weightKg: 4 }]), 6.5)
})

test('Task 3: a label for each status', () => {
  assert.equal(statusLabel('scheduled'), 'Scheduled')
  assert.equal(statusLabel('cancelled'), 'Cancelled')
})

// Task 3 is done when npm run check accepts this: 'canceled' (one L) must NOT be an EventStatus.
// @ts-expect-error: 'canceled' is not one of the four words
const typo: EventStatus = 'canceled'
void typo
