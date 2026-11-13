// Rows of data as a CSV file that spreadsheets open (RFC 4180: CRLF line endings, "…" with doubled quotes)

/** One column of the file: its heading, and how to read its value from a row */
export interface CsvColumn<Row> {
  heading: string
  value: (row: Row) => string | number
}

// A text cell starting with = + - @ could run as a formula when a spreadsheet opens the file ("CSV injection"):
// a ' in front makes the spreadsheet show it as text.
function cell(value: string | number): string {
  if (typeof value === 'number') return String(value)
  const text = /^[=+\-@\t\r]/.test(value) ? `'${value}` : value
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text
}

/** A heading line, then one line per row, each ending with CRLF */
export function toCsv<Row>(rows: readonly Row[], columns: readonly CsvColumn<Row>[]): string {
  const lines = [
    columns.map((column) => cell(column.heading)),
    ...rows.map((row) => columns.map((column) => cell(column.value(row)))),
  ]
  return lines.map((line) => line.join(',')).join('\r\n') + '\r\n'
}
