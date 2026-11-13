// Tests (do not edit): npm test
import assert from 'node:assert/strict'
import { test } from 'node:test'
import { banner, crewSize } from './banner.ts'

test('the banner names the crew in capitals and counts the volunteers', () => {
  assert.equal(banner(), 'SHORELINE CREW · 24 volunteers')
})

test('the crew size is a number', () => {
  assert.equal(typeof crewSize, 'number')
})
