// Tasks 2 and 3: the join-the-crew form
import type { JoinData } from './schemas.ts'
import { shirtSizes } from './schemas.ts'

interface JoinFormProps {
  /** Sends the checked answers; rejects with an ApiError when the API says no */
  onJoin: (data: JoinData) => Promise<void>
}

// TODO 2: useForm with zodResolver(joinSchema) and defaultValues from fields.ts (no type arguments); register each
//         box; <form onSubmit={handleSubmit(save)} noValidate>; under each box with a problem
//         <p id="NAME-error">message</p>, and the box gets aria-invalid and aria-describedby
// TODO 3: save awaits onJoin; an ApiError with fieldErrors -> setError for each known field (the first one gets
//         the focus) and 'root.server' with the API's message; any other failure -> 'Not sent. Try again in a moment.'
//         <p role="status"> shows 'Sending…' while submitting, otherwise the root message
export function JoinForm({ onJoin }: JoinFormProps) {
  return (
    <form onSubmit={(event) => event.preventDefault()} data-todo={String(typeof onJoin)} noValidate>
      <label htmlFor="name">Your name</label>
      <input id="name" name="name" />
      <label htmlFor="email">Email</label>
      <input id="email" name="email" type="email" />
      <label htmlFor="shirtSize">Shirt size</label>
      <select id="shirtSize" name="shirtSize">
        <option value="">Choose…</option>
        {shirtSizes.map((size) => (
          <option key={size} value={size}>{size}</option>
        ))}
      </select>
      <label htmlFor="hoursPerMonth">Hours a month</label>
      <input id="hoursPerMonth" name="hoursPerMonth" inputMode="numeric" />
      <p role="status"></p>
      <button type="submit">Join the crew</button>
    </form>
  )
}
