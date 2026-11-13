// Rows of data as a CSV file that spreadsheets open (RFC 4180: CRLF line endings, "…" with doubled quotes)

// TODO 1: export interface CsvColumn<Row> { heading: string; value: (row: Row) => string | number }
// and make toCsv generic: toCsv<Row>(rows: readonly Row[], columns: readonly CsvColumn<Row>[]): string.
// Numbers as they are; text with , " CR or LF inside "…" (each " doubled); text starting with = + - @ TAB CR
// gets a ' in front (CSV injection); a heading line first; every line ends with \r\n.
export function toCsv(rows: readonly any[], columns: readonly { heading: string; value: (row: any) => string | number }[]): string {
  throw new Error(`TODO 1: toCsv (${rows.length} rows, ${columns.length} columns)`)
}
