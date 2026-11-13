import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRef, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { ApiError, describeError } from '../api/client.ts'
import { saveImpactMutation } from '../api/mutations.ts'
import { impactReportSchema, type ImpactFormData } from '../api/schemas.ts'
import type { CleanupEvent, ImpactReport } from '../api/types.ts'
import { debrisCategories, debrisLabels } from '../utils/debris.ts'
import { listErrors } from '../utils/formErrors.ts'
import { nextCategory, toImpactValues, withRowNumbers, type ImpactField } from '../utils/impactForm.ts'
import { Button } from './Button.tsx'
import { ErrorSummary } from './ErrorSummary.tsx'
import { FieldError } from './FieldError.tsx'
import formStyles from './Form.module.css'
import styles from './ImpactReportForm.module.css'
import { PhotoUpload, type UploadedPhoto } from './PhotoUpload.tsx'
import { VisuallyHidden } from './VisuallyHidden.tsx'

interface ImpactReportFormProps {
  event: CleanupEvent
  /** The saved report, or null: the form starts from it */
  report: ImpactReport | null
}

export function ImpactReportForm({ event, report }: ImpactReportFormProps) {
  const save = useMutation(saveImpactMutation())
  const navigate = useNavigate()
  const [photos, setPhotos] = useState<UploadedPhoto[]>([])
  const addRef = useRef<HTMLButtonElement>(null)
  const {
    control,
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors, isSubmitting, submitCount },
  } = useForm({
    resolver: zodResolver(impactReportSchema),
    defaultValues: toImpactValues(report),
    // The error summary takes the focus after a failed submit, not the first field
    shouldFocusError: false,
  })
  // The debris rows: fields has one entry per row, with an id to use as its key
  const { fields, append, remove } = useFieldArray({ control, name: 'items' })
  const allListed = fields.length === debrisCategories.length
  // Photos already in a saved report stay in it
  const keptPhotoIds = report?.photoIds ?? []

  // handleSubmit calls this only when the schema found nothing to fix
  async function submit(data: ImpactFormData) {
    const photoIds = [...keptPhotoIds, ...photos.map((photo) => photo.id)]
    try {
      await save.mutateAsync({ eventId: event.id, report: { ...data, photoIds } })
      await navigate(`/events/${event.id}`)
    } catch (error: unknown) {
      // 409: the API's rule that the cleanup must have taken place
      const message =
        error instanceof ApiError && error.status === 409 ? error.message : describeError(error)
      setError('root.server', { message: `Not saved. ${message}` })
    }
  }

  function addRow() {
    const category = nextCategory(getValues('items'))
    if (category === undefined) return
    // The new row's count box gets the focus: the kind of debris is already chosen
    append({ category, count: '' }, { focusName: `items.${fields.length}.count` })
  }

  function removeRow(index: number) {
    remove(index)
    // The Remove button is gone: put the focus somewhere that makes sense
    addRef.current?.focus()
  }

  // What every field needs: register's props, an id, and a link to its message
  function fieldProps(name: ImpactField, message: string | undefined) {
    return {
      id: name,
      ...register(name),
      'aria-invalid': message !== undefined,
      'aria-describedby': message === undefined ? undefined : `${name}-error`,
    }
  }

  function messages(message: string | undefined) {
    return message === undefined ? undefined : [message]
  }

  const totals = [
    { name: 'volunteersAttended', label: 'Volunteers who came', error: errors.volunteersAttended },
    { name: 'bags', label: 'Bags filled', error: errors.bags },
    { name: 'weightKg', label: 'Weight (kg)', error: errors.weightKg },
  ] as const

  return (
    <>
      <p role="status" className={formStyles.status}>
        {isSubmitting ? 'Saving…' : errors.root?.server?.message}
      </p>
      <form onSubmit={handleSubmit(submit)} noValidate className={formStyles.form}>
        {/* A new key on every submit: the summary appears again and takes the focus */}
        {submitCount > 0 && (
          <ErrorSummary key={submitCount} errors={withRowNumbers(listErrors(errors))} />
        )}
        <div className={formStyles.row}>
          {totals.map(({ name, label, error }) => (
            <div key={name} className={formStyles.field}>
              <label htmlFor={name}>{label}</label>
              <input
                type="number"
                min={0}
                step={name === 'weightKg' ? 0.1 : 1}
                {...fieldProps(name, error?.message)}
              />
              <FieldError id={`${name}-error`} messages={messages(error?.message)} />
            </div>
          ))}
        </div>
        <fieldset className={styles.debris}>
          <legend>Pieces counted</legend>
          {fields.length === 0 && <p>No counts yet.</p>}
          <ol className={styles.rows}>
            {fields.map((field, index) => {
              const rowErrors = errors.items?.[index]
              return (
                <li key={field.id} className={styles.row}>
                  <div className={formStyles.field}>
                    <label htmlFor={`items.${index}.category`}>
                      Kind of debris<VisuallyHidden>, row {index + 1}</VisuallyHidden>
                    </label>
                    <select {...fieldProps(`items.${index}.category`, rowErrors?.category?.message)}>
                      {debrisCategories.map((category) => (
                        <option key={category} value={category}>
                          {debrisLabels[category]}
                        </option>
                      ))}
                    </select>
                    <FieldError
                      id={`items.${index}.category-error`}
                      messages={messages(rowErrors?.category?.message)}
                    />
                  </div>
                  <div className={formStyles.field}>
                    <label htmlFor={`items.${index}.count`}>
                      Pieces<VisuallyHidden>, row {index + 1}</VisuallyHidden>
                    </label>
                    <input
                      type="number"
                      min={0}
                      {...fieldProps(`items.${index}.count`, rowErrors?.count?.message)}
                    />
                    <FieldError
                      id={`items.${index}.count-error`}
                      messages={messages(rowErrors?.count?.message)}
                    />
                  </div>
                  <Button variant="link" onClick={() => removeRow(index)}>
                    Remove{' '}<VisuallyHidden>row {index + 1}</VisuallyHidden>
                  </Button>
                </li>
              )
            })}
          </ol>
          <Button ref={addRef} aria-disabled={allListed} onClick={addRow}>
            Add a row
          </Button>
        </fieldset>
        <div className={formStyles.field}>
          <label htmlFor="notes">Notes (optional)</label>
          <textarea rows={3} {...fieldProps('notes', errors.notes?.message)} />
          <FieldError id="notes-error" messages={messages(errors.notes?.message)} />
        </div>
        <PhotoUpload
          photos={photos}
          onUploaded={(photo) => setPhotos((current) => [...current, photo])}
          onRemove={(id) => setPhotos((current) => current.filter((photo) => photo.id !== id))}
        />
        {keptPhotoIds.length > 0 && (
          <p>Photos already in the report stay in it: {keptPhotoIds.length}.</p>
        )}
        <div className={formStyles.actions}>
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            Save the report
          </Button>
          <Button as={Link} to={`/events/${event.id}`}>
            Back without saving
          </Button>
        </div>
      </form>
    </>
  )
}
