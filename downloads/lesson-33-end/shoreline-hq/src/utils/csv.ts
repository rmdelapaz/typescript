// Turning rows of data into a CSV file that spreadsheets open (Lesson 10.1)

/** One column of the file: its heading, and how to read its value from a row */
export interface CsvColumn<Row> {
  heading: string
  value: (row: Row) => string | number
}

// A text cell starting with = + - @ could run as a formula when the file is opened in a
// spreadsheet ("CSV injection"): a ' in front makes the spreadsheet show it as plain text.
function cell(value: string | number): string {
  if (typeof value === 'number') return String(value)
  const text = /^[=+\-@\t\r]/.test(value) ? `'${value}` : value
  // Commas, quotes and line breaks are allowed inside "…", with each " doubled
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text
}

/** A heading line, then one line per row (CRLF line endings, as the CSV standard says) */
export function toCsv<Row>(rows: readonly Row[], columns: readonly CsvColumn<Row>[]): string {
  const lines = [
    columns.map((column) => cell(column.heading)),
    ...rows.map((row) => columns.map((column) => cell(column.value(row)))),
  ]
  return lines.map((line) => line.join(',')).join('\r\n') + '\r\n'
}

/** Hands the text to the browser as a file download */
export function downloadCsv(fileName: string, csv: string): void {
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  link.click()
  URL.revokeObjectURL(url)
}
