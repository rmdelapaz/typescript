import formStyles from './Form.module.css'

interface FieldErrorProps {
  id: string
  message: string | undefined
}

// Given: the message under a field. The field points at it with aria-describedby.
export function FieldError({ id, message }: FieldErrorProps) {
  if (message === undefined) {
    return null
  }
  return (
    <p id={id} className={formStyles.error}>
      {message}
    </p>
  )
}
