// Task 3: the signed checkout sheet, photographed or scanned, checked before anything is sent
const sheetTypes = ['image/jpeg', 'image/png', 'application/pdf']
const maxBytes = 2 * 1024 * 1024

/** What is wrong with a chosen file (null: nothing). TODO 3: the type, then the size (TASKS.md has the words) */
export function checkSheet(file: File): string | null {
  return `TODO 3: ${file.name} (${sheetTypes.length} types, ${maxBytes} bytes)`
}
