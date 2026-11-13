// Task 3: the signed checkout sheet, photographed or scanned, checked before anything is sent
const sheetTypes = ['image/jpeg', 'image/png', 'application/pdf']
const maxBytes = 2 * 1024 * 1024

/** What is wrong with a chosen file (null: nothing). The accept attribute is only a hint to the picker. */
export function checkSheet(file: File): string | null {
  if (!sheetTypes.includes(file.type)) {
    return `${file.name} is not a JPEG, PNG or PDF file.`
  }
  if (file.size > maxBytes) {
    const megabytes = (file.size / 1024 / 1024).toFixed(1)
    return `${file.name} is ${megabytes} MB. Sheets must be 2 MB or smaller.`
  }
  return null
}
