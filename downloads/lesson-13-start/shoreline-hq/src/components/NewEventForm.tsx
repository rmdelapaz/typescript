import { useActionState } from 'react'
import type { NewEvent } from '../api/types.ts'
import { sites } from '../data/sites.ts'
import {
  emptyValues,
  readValues,
  toNewEvent,
  validateEvent,
  type EventField,
  type EventFormValues,
  type FieldErrors,
} from '../utils/eventForm.ts'
import { formatDate, toDateString } from '../utils/format.ts'
import buttonStyles from './Button.module.css'
import { FieldError } from './FieldError.tsx'
import formStyles from './Form.module.css'

// What the form shows: what the person typed and what to fix, or a cleanup ready to save
type FormState =
  | { kind: 'editing'; values: EventFormValues; errors: FieldErrors }
  | { kind: 'ready'; event: NewEvent }

const initialState: FormState = { kind: 'editing', values: emptyValues, errors: {} }

// The form's action: React calls it with the previous state and the submitted FormData
function planCleanup(_previous: FormState, formData: FormData): FormState {
  const values = readValues(formData)
  const errors = validateEvent(values, toDateString(new Date()))
  if (Object.keys(errors).length > 0) {
    return { kind: 'editing', values, errors }
  }
  // The button that submitted the form sends its own name and value
  const status = formData.get('status') === 'scheduled' ? 'scheduled' : 'draft'
  return { kind: 'ready', event: toNewEvent(values, status) }
}

export function NewEventForm() {
  const [state, formAction, isPending] = useActionState(planCleanup, initialState)
  const values = state.kind === 'editing' ? state.values : emptyValues
  const errors = state.kind === 'editing' ? state.errors : {}

  // The props every field needs: its name, what to show, and a link to its message
  function fieldProps(field: EventField) {
    const invalid = errors[field] !== undefined
    return {
      id: field,
      name: field,
      defaultValue: values[field],
      'aria-invalid': invalid,
      'aria-describedby': invalid ? `${field}-error` : undefined,
    }
  }

  return (
    <>
      <p role="status" className={formStyles.status}>
        {state.kind === 'ready' && (
          <>
            Ready to save: <strong>{state.event.title}</strong>,{' '}
            {formatDate(state.event.date)}, {state.event.startTime} to {state.event.endTime}, as{' '}
            {state.event.status === 'scheduled' ? 'a published cleanup' : 'a draft'}.
          </>
        )}
      </p>
      <form action={formAction} noValidate className={formStyles.form}>
        <div className={formStyles.field}>
          <label htmlFor="title">Title (5 to 80 characters)</label>
          <input type="text" {...fieldProps('title')} />
          <FieldError id="title-error" messages={errors.title} />
        </div>
        <div className={formStyles.field}>
          <label htmlFor="siteId">Beach site</label>
          {/* React reads a select's defaultValue only when it creates the select: a new key */}
          {/* makes a new select whenever the value to show changes */}
          <select key={values.siteId} {...fieldProps('siteId')}>
            <option value="">Choose a site</option>
            {sites.map((site) => (
              <option key={site.id} value={site.id}>
                {site.name}
              </option>
            ))}
          </select>
          <FieldError id="siteId-error" messages={errors.siteId} />
        </div>
        <div className={formStyles.row}>
          <div className={formStyles.field}>
            <label htmlFor="date">Date</label>
            <input type="date" {...fieldProps('date')} />
            <FieldError id="date-error" messages={errors.date} />
          </div>
          <div className={formStyles.field}>
            <label htmlFor="startTime">Starts</label>
            <input type="time" {...fieldProps('startTime')} />
            <FieldError id="startTime-error" messages={errors.startTime} />
          </div>
          <div className={formStyles.field}>
            <label htmlFor="endTime">Ends</label>
            <input type="time" {...fieldProps('endTime')} />
            <FieldError id="endTime-error" messages={errors.endTime} />
          </div>
        </div>
        <div className={formStyles.field}>
          <label htmlFor="capacity">Volunteers needed (1 to 200)</label>
          <input type="number" min={1} max={200} {...fieldProps('capacity')} />
          <FieldError id="capacity-error" messages={errors.capacity} />
        </div>
        <div className={formStyles.field}>
          <label htmlFor="meetingPoint">Meeting point</label>
          <input type="text" {...fieldProps('meetingPoint')} />
          <FieldError id="meetingPoint-error" messages={errors.meetingPoint} />
        </div>
        <div className={formStyles.field}>
          <label htmlFor="description">Description (optional)</label>
          <textarea rows={4} {...fieldProps('description')} />
          <FieldError id="description-error" messages={errors.description} />
        </div>
        <div className={formStyles.actions}>
          <button
            type="submit"
            name="status"
            value="draft"
            className={buttonStyles.secondary}
            disabled={isPending}
          >
            Save as draft
          </button>
          <button
            type="submit"
            name="status"
            value="scheduled"
            className={buttonStyles.primary}
            disabled={isPending}
          >
            Publish
          </button>
        </div>
      </form>
    </>
  )
}
