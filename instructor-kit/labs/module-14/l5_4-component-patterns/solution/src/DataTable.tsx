import type { ReactNode } from 'react'

export interface Column<T> {
  header: string
  /** What this column shows for one row: a render prop */
  cell: (row: T) => ReactNode
}

interface DataTableProps<T> {
  caption: string
  rows: T[]
  /** A key for each row: unique in the table and the same on every render */
  getKey: (row: T) => string
  columns: Column<T>[]
  /** Shown instead of an empty table */
  emptyMessage: string
}

// Any table: DataTable owns the table, its headers and its empty state; the caller owns each cell
export function DataTable<T>({ caption, rows, getKey, columns, emptyMessage }: DataTableProps<T>) {
  if (rows.length === 0) {
    return <p>{emptyMessage}</p>
  }
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
      <tbody>
        {rows.map((row) => (
          <tr key={getKey(row)}>
            {columns.map((column) => (
              <td key={column.header}>{column.cell(row)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
