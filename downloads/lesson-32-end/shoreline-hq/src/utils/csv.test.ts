import { describe, expect, it } from 'vitest'
import { toCsv, type CsvColumn } from './csv.ts'

interface Bag {
  site: string
  kg: number
}

const columns: CsvColumn<Bag>[] = [
  { heading: 'Site', value: (bag) => bag.site },
  { heading: 'Weight (kg)', value: (bag) => bag.kg },
]

describe('toCsv', () => {
  it('writes a heading line and one line per row', () => {
    expect(toCsv([{ site: 'North Jetty', kg: 12.5 }], columns)).toBe('Site,Weight (kg)\r\nNorth Jetty,12.5\r\n')
  })

  it('quotes commas and doubles quotation marks', () => {
    expect(toCsv([{ site: 'Cove, "south" end', kg: 3 }], columns)).toContain('"Cove, ""south"" end",3')
  })

  it('stops text from running as a spreadsheet formula, but keeps negative numbers', () => {
    const csv = toCsv([{ site: '=HYPERLINK("http://example.com")', kg: -1 }], columns)
    expect(csv).toContain(`"'=HYPERLINK(""http://example.com"")",-1`)
  })
})
