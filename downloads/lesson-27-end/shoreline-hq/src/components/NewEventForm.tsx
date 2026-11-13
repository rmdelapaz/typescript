import { useMutation } from '@tanstack/react-query'
import { useActionState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import { z } from 'zod'
import { ApiError, describeError } from '../api/client.ts'
import { createEventMutation } from '../api/mutations.ts'
import { eventFormSchema, type EventFormValues } from '../api/schemas.ts'
import type { Site } from '../api/types.ts'
import { emptyValues, readValues, type EventField, type FieldErrors } from '../utils/eventForm.ts'
import { Button } from './Button.tsx'
import { FieldError } from './FieldError.tsx'
import formStyles from './Form.module.css'

// What the form shows: what the person typed, what to fix, and why the API said no
interface FormState {
  values: EventFormValues
  errors: FieldErrors
  /** A problem that is not about one field (the API is down, the sign-in ended, ...) */
  problem: string
}

const initialState: FormState = { values: emptyValues, errors: {}, problem: '' }

interface NewEventFormProps {
  /** The beach sites to choose from (loaded from the API by the page) */
  sites: Site[]
}

export function NewEventForm({ sites }: NewEventFormProps) {
  const createEvent = useMutation(createEventMutation())
  const navigate = useNavigate()

  // The form's action: React calls it with the previous state and the submitted FormData.
  // It is inside the component because it uses the mutation and navigate.
  async function planCleanup(_previous: FormState, formData: FormData): Promise<FormState> {
    const values = readValues(formData)
    // The same schema as the Edit form: text in, checked data (capacity a number) out
    const result = eventFormSchema.safeParse(values)
    if (!result.success) {
      return { values, errors: z.flattenError(result.error).fieldErrors, problem: '' }
    }
    // The button that submitted the form sends its own name and value
    const status = formData.get('status') === 'scheduled' ? 'scheduled' : 'draft'
    try {
      const created = await createEvent.mutateAsync({ ...result.data, status })
      await navigate(`/events/${created.id}`)
      return initialState
    } catch (error: unknown) {
      // 400: the API checked the fields too, and its messages go under the same fields
      if (error instanceof ApiError && error.fieldErrors !== undefined) {
        return { values, errors: error.fieldErrors, problem: error.message }
      }
      return { values, errors: {}, problem: `Not saved. ${describeError(error)}` }
    }
  }

  const [state, formAction, isPending] = useActionState(planCleanup, initialState)
  const { values, errors } = state
  const formRef = useRef<HTMLFormElement>(null)

  // After every check that found problems, move the focus to the first field to fix
  useEffect(() => {
    const firstInvalid = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')
    firstInvalid?.focus()
  }, [state])

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
        {isPending ? 'Saving…' : state.problem}
      </p>
      <form ref={formRef} action={formAction} noValidate className={formStyles.form}>
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
          <Button type="submit" name="status" value="draft" disabled={isPending}>
            Save as draft
          </Button>
          <Button
            type="submit"
            name="status"
            value="scheduled"
            variant="primary"
            disabled={isPending}
          >
            Publish
          </Button>
        </div>
      </form>
    </>
  )
}
