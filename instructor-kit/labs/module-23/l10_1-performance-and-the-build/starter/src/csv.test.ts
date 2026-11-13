// Tests (handed out, do not edit): npm test, and npm run typecheck for the last one
import { describe, expect, it } from 'vitest'
import { toCsv } from './csv.ts'
import type { Tide } from './types.ts'

const tides: Tide[] = [
  { date: '2026-06-01', time: '04:12', heightM: 1.83, kind: 'high' },
  { date: '2026-06-01', time: '10:24', heightM: 0.31, kind: 'low' },
]

describe('toCsv', () => {
  it('writes a heading line, then one line per row, each ending with CRLF', () => {
    const csv = toCsv(tides, [
      { heading: 'Date', value: (tide) => tide.date },
      { heading: 'Height (m)', value: (tide) => tide.heightM },
    ])
    expect(csv).toBe('Date,Height (m)\r\n2026-06-01,1.83\r\n2026-06-01,0.31\r\n')
  })

  it('quotes text with a comma, a quote or a line break, doubling each quote', () => {
    const notes = [{ note: 'Meet at "the rocks", north end' }, { note: 'Two lines\nof text' }]
    expect(toCsv(notes, [{ heading: 'Note', value: (row) => row.note }])).toBe(
      'Note\r\n"Meet at ""the rocks"", north end"\r\n"Two lines\nof text"\r\n',
    )
  })

  it('defuses text that a spreadsheet would run as a formula', () => {
    const names = [{ name: '=HYPERLINK("http://example.com")' }, { name: '-5 kg' }, { name: 'Maya' }]
    expect(toCsv(names, [{ heading: 'Name', value: (row) => row.name }])).toBe(
      'Name\r\n"\'=HYPERLINK(""http://example.com"")"\r\n\'-5 kg\r\nMaya\r\n',
    )
  })

  it('only accepts columns that read the rows it is given', () => {
    // tsc -b must reject the next line: a Tide has no "weightKg". With a loose toCsv, tsc reports
    // this directive as unused (TS2578) instead.
    // @ts-expect-error the column reads a property the rows do not have
    expect(() => toCsv(tides, [{ heading: 'Weight', value: (tide) => tide.weightKg }])).not.toThrow()
  })
})
