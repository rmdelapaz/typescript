// Task 2's tests (do not edit): values computed from the sample data, never stored
import { describe, expect, it } from 'vitest'
import { sampleVisits } from './db.ts'
import { isOverdue, isVisitStatus, nextSteps, visitTotal } from './rules.ts'

function visit(id: string) {
  const found = sampleVisits().find((candidate) => candidate.id === id)
  if (!found) {
    throw new Error(`There is no sample visit ${id}`)
  }
  return found
}

describe('Task 2: computed, never stored', () => {
  it('adds the fee and every extra line, in cents', () => {
    expect(visitTotal(visit('pv5'))).toBe(17000)
  })

  it('is 0 for the awkward visit with no fee and no extras', () => {
    expect(visitTotal(visit('pv4'))).toBe(0)
  })

  it('calls a scheduled visit overdue only after its day', () => {
    expect(isOverdue(visit('pv1'), '2026-06-18')).toBe(false)
    expect(isOverdue(visit('pv1'), '2026-06-19')).toBe(true)
  })

  it('never calls a visit with no day, or a tuned one, overdue', () => {
    expect(isOverdue(visit('pv4'), '2026-07-01')).toBe(false)
    expect(isOverdue(visit('pv5'), '2026-07-01')).toBe(false)
  })

  it('knows the five statuses and nothing else', () => {
    expect(isVisitStatus('tuned')).toBe(true)
    expect(isVisitStatus('tunned')).toBe(false)
    expect(isVisitStatus(42)).toBe(false)
  })

  it('moves one step at a time, and a paid visit nowhere', () => {
    expect(nextSteps.requested, 'TODO 2: nextSteps').toEqual(['scheduled'])
    expect(nextSteps.invoiced).toEqual(['paid'])
    expect(nextSteps.paid).toEqual([])
  })
})
