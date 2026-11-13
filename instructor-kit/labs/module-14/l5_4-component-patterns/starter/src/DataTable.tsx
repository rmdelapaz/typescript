import type { ReactNode } from 'react'

// TODO 2: make the table generic. Column, DataTableProps and DataTable each get a type parameter T (the type of
// one row), so that TypeScript infers T from rows and checks getKey and every cell against it.
export interface Column {
  header: string
  /** What this column shows for one row: a render prop */
  cell: (row: object) => ReactNode
}

interface DataTableProps {
  caption: string
  rows: object[]
  /** A key for each row: unique in the table and the same on every render */
  getKey: (row: object) => string
  columns: Column[]
  /** Shown instead of an empty table */
  emptyMessage: string
}

// Any table: DataTable owns the table, its headers and its empty state; the caller owns each cell
export function DataTable({ caption, rows, getKey, columns, emptyMessage }: DataTableProps) {
  // TODO 2: the empty message when there are no rows; one <tr> per row (key from getKey), one <td> per column
  console.log(rows, getKey, emptyMessage)
  return (
    <table>
      <caption>{caption}</caption>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.header} scope="col">
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody />
    </table>
  )
}
