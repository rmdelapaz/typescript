import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { ApiError } from '../api/client.ts'
import { createItemMutation } from '../api/mutations.ts'
import { newItemSchema, type NewItemFormData, type NewItemFormValues } from '../api/schemas.ts'
import { FieldError } from '../components/FieldError.tsx'
import { useDocumentTitle } from '../hooks/useDocumentTitle.ts'
import formStyles from './Form.module.css'

const fields = ['name', 'notes'] as const satisfies (keyof NewItemFormValues)[]

function isField(name: string): name is (typeof fields)[number] {
  return fields.some((field) => field === name)
}

// A form with one schema for its rules and its types (Lesson 8.1), saved through a mutation (7.2)
export function NewItemPage() {
  useDocumentTitle('New item')
  const navigate = useNavigate()
  const create = useMutation(createItemMutation())
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(newItemSchema), defaultValues: { name: '', notes: '' } })

  async function save(data: NewItemFormData) {
    try {
      const item = await create.mutateAsync(data)
      await navigate(`/items/${item.id}`)
    } catch (error) {
      // The server's own rules (like "this name is taken") arrive as fieldErrors: show them under the fields
      if (error instanceof ApiError && error.fieldErrors) {
        for (const [name, messages] of Object.entries(error.fieldErrors)) {
          if (isField(name)) {
            setError(name, { type: 'server', message: messages.join(' ') }, { shouldFocus: true })
          }
        }
      } else {
        setError('root.server', { message: 'Not saved. Check your connection, then try again.' })
      }
    }
  }

  // Everything a field needs to be labeled, checked and described
  function fieldProps(name: (typeof fields)[number]) {
    return {
      id: name,
      'aria-invalid': errors[name] !== undefined,
      'aria-describedby': errors[name] ? `${name}-error` : undefined,
      ...register(name),
    }
  }

  return (
    <>
      <h1>New item</h1>
      <form className={formStyles.form} noValidate onSubmit={handleSubmit(save)}>
        <div className={formStyles.field}>
          <label htmlFor="name">Name</label>
          <input type="text" {...fieldProps('name')} />
          <FieldError id="name-error" messages={errors.name?.message ? [errors.name.message] : undefined} />
        </div>
        <div className={formStyles.field}>
          <label htmlFor="notes">Notes (optional)</label>
          <textarea rows={4} {...fieldProps('notes')} />
          <FieldError id="notes-error" messages={errors.notes?.message ? [errors.notes.message] : undefined} />
        </div>
        <p>
          <button type="submit" disabled={isSubmitting}>
            Save item
          </button>
        </p>
        <p role="status" className={formStyles.status}>
          {isSubmitting ? 'Saving…' : errors.root?.server?.message}
        </p>
      </form>
    </>
  )
}
