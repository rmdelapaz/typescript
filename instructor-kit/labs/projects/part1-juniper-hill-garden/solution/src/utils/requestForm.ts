// Reading and checking the "Request a plot" form (TODO E)
import { isBedKind } from './labels.ts'

// The form's fields: the name attribute of each input
export type RequestField = 'name' | 'email' | 'bed' | 'householdSize' | 'rules'

// What the person typed, as text, so the form can show it again
export type RequestValues = Record<RequestField, string>

// One message per field that needs fixing
export type FieldErrors = Partial<Record<RequestField, string>>

export const emptyValues: RequestValues = { name: '', email: '', bed: '', householdSize: '', rules: '' }

// formData.get() returns a string, a File or null (no such field, or a checkbox that is not ticked)
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

// Pure: the same values always give the same messages (easy to test)
export function validateRequest(values: RequestValues): FieldErrors {
  const errors: FieldErrors = {}

  if (values.name === '') errors.name = 'Enter your name.'
  else if (values.name.length < 2) errors.name = 'Use at least 2 characters for your name.'
  else if (values.name.length > 60) errors.name = 'Keep your name to 60 characters or fewer.'

  if (values.email === '') errors.email = 'Enter your email address.'
  else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email)) {
    errors.email = 'Enter an email address like name@example.org.'
  }

  if (!isBedKind(values.bed)) errors.bed = 'Choose a kind of plot.'

  const size = Number(values.householdSize)
  if (values.householdSize === '' || !Number.isInteger(size) || size < 1 || size > 8) {
    errors.householdSize = 'Household size must be a whole number from 1 to 8.'
  }

  if (values.rules !== 'yes') errors.rules = 'Agree to the garden rules to send a request.'
  return errors
}
