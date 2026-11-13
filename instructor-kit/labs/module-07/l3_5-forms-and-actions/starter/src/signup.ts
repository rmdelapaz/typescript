// Reading and checking the sign-up sheet for one cleanup (Lab 3.5, Tasks 1 and 2).

// The sheet's fields, named like the form's name attributes
export type SignupField = 'name' | 'email' | 'shirt' | 'note'

// What the person typed, as text, so the form can show it again
export type SignupValues = Record<SignupField, string>

// Field name: messages (the API's fieldErrors shape), with names TypeScript can check
export type SignupErrors = Partial<Record<SignupField, string[]>>

export type ShirtSize = 'S' | 'M' | 'L' | 'XL'

export const emptySignup: SignupValues = { name: '', email: '', shirt: '', note: '' }

// Task 1: every field as trimmed text; a field that is missing (or a file) reads as ''.
// TODO 1: `as string` promises TypeScript something nobody checked. Narrow instead.
export function readSignup(formData: FormData): SignupValues {
  return {
    name: (formData.get('name') as string).trim(),
    email: (formData.get('email') as string).trim(),
    shirt: (formData.get('shirt') as string).trim(),
    note: (formData.get('note') as string).trim(),
  }
}

// Task 2: a type guard for the four sizes (the <select> hands over any string)
export function isShirtSize(value: string): value is ShirtSize {
  return value === 'S' || value === 'M' || value === 'L' || value === 'XL'
}

// Task 2: one message per problem, under the field it belongs to. An empty object = nothing to fix.
// TODO 2: name required ('Add your name.'); email must contain @ ('Enter an email address, such as
// you@example.com.'); shirt must be one of the sizes ('Choose a shirt size.'); note at most 200 characters
// ('Keep the note to 200 characters or fewer.').
export function validateSignup(values: SignupValues): SignupErrors {
  void values
  return {}
}
