// Tasks 2 and 3: the join-the-crew form
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ApiError } from './api.ts'
import { emptyValues, isJoinField, type JoinField } from './fields.ts'
import { joinSchema, shirtSizes, type JoinData } from './schemas.ts'

interface JoinFormProps {
  /** Sends the checked answers; rejects with an ApiError when the API says no */
  onJoin: (data: JoinData) => Promise<void>
}

export function JoinForm({ onJoin }: JoinFormProps) {
  // No type arguments: zodResolver carries the schema's input AND output types
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(joinSchema), defaultValues: emptyValues })

  // handleSubmit calls this only with checked data: the output type, hours as a number
  async function save(data: JoinData) {
    try {
      await onJoin(data)
    } catch (error: unknown) {
      if (error instanceof ApiError && error.fieldErrors !== undefined) {
        let first = true
        for (const [name, messages] of Object.entries(error.fieldErrors)) {
          // The API's keys are plain strings: only the form's own names may reach setError
          if (isJoinField(name)) {
            setError(name, { type: 'server', message: messages.join(' ') }, { shouldFocus: first })
            first = false
          }
        }
        setError('root.server', { type: 'server', message: error.message })
        return
      }
      setError('root.server', { type: 'server', message: 'Not sent. Try again in a moment.' })
    }
  }

  // id, register and the accessibility attributes, for one field
  function fieldProps(name: JoinField) {
    const message = errors[name]?.message
    return {
      id: name,
      ...register(name),
      'aria-invalid': message ? true : undefined,
      'aria-describedby': message ? `${name}-error` : undefined,
    }
  }

  function messageFor(name: JoinField) {
    const message = errors[name]?.message
    return message ? <p id={`${name}-error`}>{message}</p> : null
  }

  return (
    <form onSubmit={handleSubmit(save)} noValidate>
      <label htmlFor="name">Your name</label>
      <input {...fieldProps('name')} />
      {messageFor('name')}
      <label htmlFor="email">Email</label>
      <input type="email" {...fieldProps('email')} />
      {messageFor('email')}
      <label htmlFor="shirtSize">Shirt size</label>
      <select {...fieldProps('shirtSize')}>
        <option value="">Choose…</option>
        {shirtSizes.map((size) => (
          <option key={size} value={size}>{size}</option>
        ))}
      </select>
      {messageFor('shirtSize')}
      <label htmlFor="hoursPerMonth">Hours a month</label>
      <input inputMode="numeric" {...fieldProps('hoursPerMonth')} />
      {messageFor('hoursPerMonth')}
      <p role="status">{isSubmitting ? 'Sending…' : errors.root?.server?.message}</p>
      <button type="submit">Join the crew</button>
    </form>
  )
}
