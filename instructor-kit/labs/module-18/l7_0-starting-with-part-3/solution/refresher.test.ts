// Tests (do not edit): npm test
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import { isSiteSummary, parseList, statusLine, type SiteSummary } from './refresher.ts'

// The real answer of GET /api/sites, saved from shoreline-api: unknown until a check says otherwise
const data: unknown = JSON.parse(readFileSync(new URL('../fixtures/sites.json', import.meta.url), 'utf8'))

test('Task 2: isSiteSummary accepts the six real sites', () => {
  assert.ok(Array.isArray(data) && data.length === 6 && data.every(isSiteSummary))
})

test('Task 2: isSiteSummary refuses a missing or wrong field', () => {
  assert.equal(isSiteSummary({ id: 'north-jetty', name: 'North Jetty', town: 'Port Marisol' }), false)
  assert.equal(isSiteSummary({ id: 'north-jetty', name: 'North Jetty', town: 'Port Marisol', accessible: 'no' }), false)
  assert.equal(isSiteSummary(null), false)
})

test('Task 2: parseList gives back a typed list, or throws', () => {
  // A SiteSummary[] variable: tsc accepts this line only when parseList is generic (npm run check)
  const sites: SiteSummary[] = parseList(data, isSiteSummary)
  assert.equal(sites[0]?.name, 'Pelican Point Beach')
  assert.throws(() => parseList({ items: [] }, isSiteSummary))
  assert.throws(() => parseList([{ id: 'seal-rock' }], isSiteSummary))
})

test('Task 3: loading', () => {
  assert.equal(statusLine({ kind: 'loading' }), 'Loading the sites…')
})

test('Task 3: error', () => {
  assert.equal(statusLine({ kind: 'error', message: 'The server had a problem (500).' }),
    'Could not load the sites: The server had a problem (500).')
})

test('Task 3: ready', () => {
  assert.equal(statusLine({ kind: 'ready', data: parseList(data, isSiteSummary) }), '6 sites, 3 step-free')
})
