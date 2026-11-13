// Reading and checking the sign-up sheet for one cleanup (Lab 3.5, Tasks 1 and 2).

// The sheet's fields, named like the form's name attributes
export type SignupField = 'name' | 'email' | 'shirt' | 'note'

// What the person typed, as text, so the form can show it again
export type SignupValues = Record<SignupField, string>

// Field name: messages (the API's fieldErrors shape), with names TypeScript can check
export type SignupErrors = Partial<Record<SignupField, string[]>>

export type ShirtSize = 'S' | 'M' | 'L' | 'XL'

export const emptySignup: SignupValues = { name: '', email: '', shirt: '', note: '' }

// formData.get() returns a string, a File (from a file input) or null (no such field)
function readText(formData: FormData, name: SignupField): string {
  const value = formData.get(name)
  return typeof value === 'string' ? value.trim() : ''
}

// Task 1: every field as trimmed text; a field that is missing (or a file) reads as ''.
export function readSignup(formData: FormData): SignupValues {
  return {
    name: readText(formData, 'name'),
    email: readText(formData, 'email'),
    shirt: readText(formData, 'shirt'),
    note: readText(formData, 'note'),
  }
}

// Task 2: a type guard for the four sizes (the <select> hands over any string)
export function isShirtSize(value: string): value is ShirtSize {
  return value === 'S' || value === 'M' || value === 'L' || value === 'XL'
}

// Task 2: one message per problem, under the field it belongs to. An empty object = nothing to fix.
export function validateSignup(values: SignupValues): SignupErrors {
  const errors: SignupErrors = {}
  function add(field: SignupField, message: string) {
    errors[field] = [...(errors[field] ?? []), message]
  }

  if (values.name === '') add('name', 'Add your name.')
  if (!values.email.includes('@')) add('email', 'Enter an email address, such as you@example.com.')
  if (!isShirtSize(values.shirt)) add('shirt', 'Choose a shirt size.')
  if (values.note.length > 200) add('note', 'Keep the note to 200 characters or fewer.')
  return errors
}
