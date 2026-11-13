// Tests (do not edit): npm test runs them, npm run typecheck type-checks them with your code.
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { expect, test } from 'vitest'
import { isSiteSummary, terrainLabels } from './checks.ts'
import { SiteChooser } from './SiteChooser.tsx'
import type { SiteSummary, Terrain } from './types.ts'

// the real answer of GET /api/sites, saved in the lab's fixtures/ folder (npm test runs in starter/)
const sites: unknown = JSON.parse(readFileSync(join(process.cwd(), '..', 'fixtures', 'sites.json'), 'utf8'))
// Task 2's tests trust the saved answer (Task 1's check proves it); a cast is fine in a test, never in the app
const siteList = sites as SiteSummary[]

test('Task 1: every site the API sends passes the check', () => {
  expect(Array.isArray(sites) && sites.length === 6 && sites.every(isSiteSummary)).toBe(true)
})

test('Task 1: anything else fails it', () => {
  const site = { id: 'x', name: 'Seal Rock', town: 'Seal Rock', terrain: 'sand', accessible: true }
  expect(isSiteSummary(site)).toBe(true)
  expect(isSiteSummary({ ...site, terrain: 'gravel' })).toBe(false)
  expect(isSiteSummary({ ...site, accessible: 'yes' })).toBe(false)
  expect(isSiteSummary({ id: 'x', town: 'Seal Rock', terrain: 'sand', accessible: true })).toBe(false)
  expect(isSiteSummary(null)).toBe(false)
  expect(isSiteSummary([site])).toBe(false)
})

test('Task 1: a label for every terrain', () => {
  const all: Terrain[] = ['sand', 'rocky', 'marsh', 'mixed']
  expect(all.map((terrain) => terrainLabels[terrain])).toEqual(['Sandy beach', 'Rocky shore', 'Tidal marsh', 'Sand and rocks'])
})

test('Task 2: every site is listed, with the count', () => {
  render(<SiteChooser sites={siteList} />)
  expect(screen.getAllByRole('listitem')).toHaveLength(6)
  expect(screen.getByRole('status')).toHaveTextContent('Showing 6 of 6 sites.')
  expect(screen.getByText(/^Sandpiper Flats, /)).toBeInTheDocument()
})

test('Task 2: the checkbox keeps only the step-free sites, and gives them all back', async () => {
  const user = userEvent.setup()
  render(<SiteChooser sites={siteList} />)
  const stepFree = siteList.filter((site) => site.accessible).length
  await user.click(screen.getByRole('checkbox', { name: 'Step-free access only' }))
  expect(screen.getAllByRole('listitem')).toHaveLength(stepFree)
  expect(screen.getByRole('status')).toHaveTextContent(`Showing ${stepFree} of 6 sites.`)
  await user.click(screen.getByRole('checkbox', { name: 'Step-free access only' }))
  expect(screen.getAllByRole('listitem')).toHaveLength(6)
})

// Task 1 is done when npm run typecheck accepts this: the labels are a COMPLETE Record, so no label is undefined.
const sandLabel: string = terrainLabels.sand
void sandLabel
