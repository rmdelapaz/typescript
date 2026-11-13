// Turning React Hook Form's errors into one list, for an error summary (Lesson 8.2)
import type { FieldErrors, FieldValues } from 'react-hook-form'

/** One problem: the message, and the id of the field it belongs to */
export interface ErrorItem {
  id: string
  message: string
}

/** Every field's message, in the order the schema checked them. Field ids are their names:
 * 'bags', 'items.2.count'. The form-wide root errors are left out (the status line shows those). */
export function listErrors<T extends FieldValues>(errors: FieldErrors<T>): ErrorItem[] {
  return collect(errors, '')
}

// errors is a tree: { bags: { message }, items: [ , { count: { message } } ] }
function collect(value: unknown, path: string): ErrorItem[] {
  if (typeof value !== 'object' || value === null) {
    return []
  }
  if ('message' in value && typeof value.message === 'string') {
    return [{ id: path, message: value.message }]
  }
  return Object.entries(value).flatMap(([key, inner]) =>
    key === 'root' || key === 'ref' ? [] : collect(inner, path === '' ? key : `${path}.${key}`),
  )
}
