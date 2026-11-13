// The mock API's sample data (Milestone 1): replace these with 6 to 12 records of your own.
// Make at least one of them awkward on purpose (no notes, a long name, a zero): it is the test
// content for your empty and missing-value states.
import type { Item } from '../api/types.ts'

function sampleItems(): Item[] {
  return [
    {
      id: 'i1',
      name: 'First example item',
      status: 'open',
      notes: 'Replace the sample data in src/mocks/db.ts with your own.',
      createdAt: '2026-05-01T16:30:00.000Z',
    },
    {
      id: 'i2',
      name: 'Second example item',
      status: 'open',
      notes: 'Each record has every field your types ask for.',
      createdAt: '2026-05-02T09:15:00.000Z',
    },
    {
      id: 'i3',
      name: 'An awkward one',
      status: 'done',
      notes: null,
      createdAt: '2026-05-03T20:45:00.000Z',
    },
  ]
}

/** The data the mock API keeps in memory, and a way back to the sample data */
export function createDb() {
  let items = sampleItems()
  let counter = items.length
  return {
    get items(): readonly Item[] {
      return items
    },
    add(item: Omit<Item, 'id'>): Item {
      counter += 1
      const saved = { ...item, id: `i${counter}` }
      items = [...items, saved]
      return saved
    },
    /** Every test (and every reload of the demo) starts from the sample data */
    reset() {
      items = sampleItems()
      counter = items.length
    },
  }
}

export type Db = ReturnType<typeof createDb>
