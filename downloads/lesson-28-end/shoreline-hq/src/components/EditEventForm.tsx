import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { ApiError, describeError } from '../api/client.ts'
import { updateEventMutation } from '../api/mutations.ts'
import { eventFormSchema, type EventFormData } from '../api/schemas.ts'
import type { CleanupEvent, Site } from '../api/types.ts'
import { isEventField, toFormValues, type EventField } from '../utils/eventForm.ts'
import { Button } from './Button.tsx'
import { FieldError } from './FieldError.tsx'
import formStyles from './Form.module.css'

interface EditEventFormProps {
  /** The cleanup as it is saved now: the form starts from its values */
  event: CleanupEvent
  /** The beach sites to choose from */
  sites: Site[]
}

export function EditEventForm({ event, sites }: EditEventFormProps) {
  const update = useMutation(updateEventMutation())
  const navigate = useNavigate()
  // The resolver runs the schema: its input type is the fields' type, its output what save gets
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(eventFormSchema),
    defaultValues: toFormValues(event),
  })

  // handleSubmit calls this only when the schema found nothing to fix
  async function save(changes: EventFormData) {
    try {
      await update.mutateAsync({ eventId: event.id, changes })
      await navigate(`/events/${event.id}`)
    } catch (error: unknown) {
      if (error instanceof ApiError && error.fieldErrors !== undefined) {
        // 400: the API's own rules said no. Its messages go under the same fields as ours.
        let first = true
        for (const [name, messages] of Object.entries(error.fieldErrors)) {
          if (isEventField(name)) {
            setError(name, { type: 'server', message: messages.join(' ') }, { shouldFocus: first })
            first = false
          }
        }
        setError('root.server', { message: error.message })
      } else {
        setError('root.server', { message: `Not saved. ${describeError(error)}` })
      }
    }
  }

  // What every field needs: register's name, ref and handlers, plus a link to its message
  function fieldProps(field: EventField) {
    const invalid = errors[field] !== undefined
    return {
      id: field,
      ...register(field),
      'aria-invalid': invalid,
      'aria-describedby': invalid ? `${field}-error` : undefined,
    }
  }

  // React Hook Form keeps one message per field; FieldError takes a list
  function messagesFor(field: EventField) {
    const message = errors[field]?.message
    return message === undefined ? undefined : [message]
  }

  return (
    <>
      <p role="status" className={formStyles.status}>
        {isSubmitting ? 'Saving…' : errors.root?.server?.message}
      </p>
      <form onSubmit={handleSubmit(save)} noValidate className={formStyles.form}>
        <div className={formStyles.field}>
          <label htmlFor="title">Title (5 to 80 characters)</label>
          <input type="text" {...fieldProps('title')} />
          <FieldError id="title-error" messages={messagesFor('title')} />
        </div>
        <div className={formStyles.field}>
          <label htmlFor="siteId">Beach site</label>
          <select {...fieldProps('siteId')}>
            <option value="">Choose a site</option>
            {sites.map((site) => (
              <option key={site.id} value={site.id}>
                {site.name}
              </option>
            ))}
          </select>
          <FieldError id="siteId-error" messages={messagesFor('siteId')} />
        </div>
        <div className={formStyles.row}>
          <div className={formStyles.field}>
            <label htmlFor="date">Date</label>
            <input type="date" {...fieldProps('date')} />
            <FieldError id="date-error" messages={messagesFor('date')} />
          </div>
          <div className={formStyles.field}>
            <label htmlFor="startTime">Starts</label>
            <input type="time" {...fieldProps('startTime')} />
            <FieldError id="startTime-error" messages={messagesFor('startTime')} />
          </div>
          <div className={formStyles.field}>
            <label htmlFor="endTime">Ends</label>
            <input type="time" {...fieldProps('endTime')} />
            <FieldError id="endTime-error" messages={messagesFor('endTime')} />
          </div>
        </div>
        <div className={formStyles.field}>
          <label htmlFor="capacity">Volunteers needed (1 to 200)</label>
          <input type="number" min={1} max={200} {...fieldProps('capacity')} />
          <FieldError id="capacity-error" messages={messagesFor('capacity')} />
        </div>
        <div className={formStyles.field}>
          <label htmlFor="meetingPoint">Meeting point</label>
          <input type="text" {...fieldProps('meetingPoint')} />
          <FieldError id="meetingPoint-error" messages={messagesFor('meetingPoint')} />
        </div>
        <div className={formStyles.field}>
          <label htmlFor="description">Description (optional)</label>
          <textarea rows={4} {...fieldProps('description')} />
          <FieldError id="description-error" messages={messagesFor('description')} />
        </div>
        <div className={formStyles.actions}>
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            Save changes
          </Button>
          <Button as={Link} to={`/events/${event.id}`}>
            Back without saving
          </Button>
        </div>
      </form>
    </>
  )
}
