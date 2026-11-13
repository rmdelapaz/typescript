interface FieldErrorProps {
  /** the id the field points at with aria-describedby */
  id: string
  messages: string[] | undefined
}

// The messages for one field, under it; nothing at all when there are none
export function FieldError({ id, messages }: FieldErrorProps) {
  if (messages === undefined || messages.length === 0) return null
  return (
    <p id={id} className="field-error">
      {messages.join(' ')}
    </p>
  )
}
