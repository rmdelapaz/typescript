import { useActionState } from 'react'
import type { PlotRequest } from '../types.ts'
import { bedKinds, bedLabels, isBedKind } from '../utils/labels.ts'
import {
  emptyValues,
  readValues,
  validateRequest,
  type FieldErrors,
  type RequestField,
  type RequestValues,
} from '../utils/requestForm.ts'
import buttonStyles from './Button.module.css'
import { FieldError } from './FieldError.tsx'
import formStyles from './Form.module.css'

// What the form shows: what the person typed and what to fix, or the request it received
type FormState =
  | { kind: 'editing'; values: RequestValues; errors: FieldErrors }
  | { kind: 'sent'; request: PlotRequest }

const initialState: FormState = { kind: 'editing', values: emptyValues, errors: {} }

// The form's action: React calls it with the previous state and the submitted FormData
function sendRequest(_previous: FormState, formData: FormData): FormState {
  const values = readValues(formData)
  const errors = validateRequest(values)
  // isBedKind narrows the text to a BedKind (validateRequest has already said it is one)
  if (Object.keys(errors).length > 0 || !isBedKind(values.bed)) {
    return { kind: 'editing', values, errors }
  }
  return {
    kind: 'sent',
    request: {
      name: values.name,
      email: values.email,
      bed: values.bed,
      householdSize: Number(values.householdSize),
    },
  }
}

export function RequestForm() {
  const [state, formAction] = useActionState(sendRequest, initialState)
  const values = state.kind === 'editing' ? state.values : emptyValues
  const errors = state.kind === 'editing' ? state.errors : {}

  // The props every field needs: its name, a link to its message, and whether it is invalid
  function fieldProps(field: RequestField) {
    const invalid = errors[field] !== undefined
    return {
      id: field,
      name: field,
      'aria-invalid': invalid,
      'aria-describedby': invalid ? `${field}-error` : undefined,
    }
  }

  return (
    <>
      <p role="status" className={formStyles.status}>
        {state.kind === 'sent' &&
          `Thank you, ${state.request.name}. We will email ${state.request.email} when a ${bedLabels[state.request.bed].toLowerCase()} opens up.`}
      </p>
      <form action={formAction} noValidate className={formStyles.form}>
        <div className={formStyles.field}>
          <label htmlFor="name">Your name</label>
          <input type="text" autoComplete="name" defaultValue={values.name} {...fieldProps('name')} />
          <FieldError id="name-error" message={errors.name} />
        </div>
        <div className={formStyles.field}>
          <label htmlFor="email">Email</label>
          <input type="email" autoComplete="email" defaultValue={values.email} {...fieldProps('email')} />
          <FieldError id="email-error" message={errors.email} />
        </div>
        <div className={formStyles.field}>
          <label htmlFor="bed">Kind of plot</label>
          {/* React reads a select's defaultValue only when it creates the select (Lesson 3.5): a new key */}
          <select key={values.bed} defaultValue={values.bed} {...fieldProps('bed')}>
            <option value="">Choose one</option>
            {bedKinds.map((bed) => (
              <option key={bed} value={bed}>
                {bedLabels[bed]}
              </option>
            ))}
          </select>
          <FieldError id="bed-error" message={errors.bed} />
        </div>
        <div className={formStyles.field}>
          <label htmlFor="householdSize">People in your household</label>
          <input
            type="number"
            min={1}
            max={8}
            defaultValue={values.householdSize}
            {...fieldProps('householdSize')}
          />
          <FieldError id="householdSize-error" message={errors.householdSize} />
        </div>
        <div className={formStyles.field}>
          <div className={formStyles.check}>
            <input
              type="checkbox"
              value="yes"
              defaultChecked={values.rules === 'yes'}
              {...fieldProps('rules')}
            />
            <label htmlFor="rules">I have read the garden rules</label>
          </div>
          <FieldError id="rules-error" message={errors.rules} />
        </div>
        <div>
          <button type="submit" className={buttonStyles.primary}>
            Send request
          </button>
        </div>
      </form>
    </>
  )
}
