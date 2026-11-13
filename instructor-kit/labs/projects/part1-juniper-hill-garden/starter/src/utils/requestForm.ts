// Reading and checking the "Request a plot" form (TODO E)

// The form's fields: the name attribute of each input
export type RequestField = 'name' | 'email' | 'bed' | 'householdSize' | 'rules'

// What the person typed, as text, so the form can show it again
export type RequestValues = Record<RequestField, string>

// One message per field that needs fixing
export type FieldErrors = Partial<Record<RequestField, string>>

export const emptyValues: RequestValues = { name: '', email: '', bed: '', householdSize: '', rules: '' }

// Given: formData.get() returns a string, a File or null (no such field, or a checkbox that is not ticked)
function readText(formData: FormData, name: RequestField): string {
  const value = formData.get(name)
  return typeof value === 'string' ? value.trim() : ''
}

export function readValues(formData: FormData): RequestValues {
  return {
    name: readText(formData, 'name'),
    email: readText(formData, 'email'),
    bed: readText(formData, 'bed'),
    householdSize: readText(formData, 'householdSize'),
    rules: readText(formData, 'rules'),
  }
}

// TODO E1: one message per problem, worded exactly as TASKS.md says (the tests compare the words)
export function validateRequest(values: RequestValues): FieldErrors {
  throw new Error(`TODO E1: check the request from ${values.name || 'nobody'}`)
}
