import formStyles from '../pages/Form.module.css'

interface FieldErrorProps {
  id: string
  messages: string[] | undefined
}

// The message under a field. The field points at it with aria-describedby.
export function FieldError({ id, messages }: FieldErrorProps) {
  if (messages === undefined) {
    return null
  }
  return (
    <p id={id} className={formStyles.error}>
      {messages.join(' ')}
    </p>
  )
}
