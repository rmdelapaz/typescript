import { useEffect, useState } from 'react'

interface SignUpFormProps {
  apiUrl: string
  eventId: string
}

type Status =
  | { kind: 'editing'; problem?: string }
  | { kind: 'sending' }
  | { kind: 'done'; name: string }
  | { kind: 'failed'; message: string }

/** "Sign up for this cleanup": spots left from the API, a name, and the API's answer */
export function SignUpForm({ apiUrl, eventId }: SignUpFormProps) {
  const [spotsLeft, setSpotsLeft] = useState<number | null>(null)
  const [name, setName] = useState('')
  const [status, setStatus] = useState<Status>({ kind: 'editing' })

  useEffect(() => {
    const controller = new AbortController()
    fetch(`${apiUrl}/api/events/${eventId}`, { signal: controller.signal })
      .then((response) => response.json() as Promise<{ spotsLeft: number }>)
      .then((event) => setSpotsLeft(event.spotsLeft))
      .catch(() => {})
    return () => controller.abort()
  }, [apiUrl, eventId])

  async function signUp() {
    const trimmed = name.trim()
    if (trimmed === '') {
      setStatus({ kind: 'editing', problem: 'Add your name.' })
      return
    }
    setStatus({ kind: 'sending' })
    const response = await fetch(`${apiUrl}/api/events/${eventId}/signups`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: trimmed }),
    })
    if (response.ok) {
      setStatus({ kind: 'done', name: trimmed })
      setSpotsLeft((spots) => (spots === null ? spots : spots - 1))
      return
    }
    const body = (await response.json().catch(() => ({}))) as { message?: string }
    setStatus({ kind: 'failed', message: body.message ?? `Something went wrong (${response.status}). Try again.` })
  }

  const problem = status.kind === 'editing' ? status.problem : undefined
  return (
    <section aria-labelledby="signup-heading">
      <h2 id="signup-heading">Sign up for this cleanup</h2>
      <p role="status">{spotsLeft === null ? 'Checking the spots…' : `${spotsLeft} spots left`}</p>
      {status.kind === 'done' ? (
        <p>You are on the list, {status.name}.</p>
      ) : (
        <form
          noValidate
          onSubmit={(event) => {
            event.preventDefault()
            void signUp()
          }}
        >
          <label htmlFor="signup-name">Your name</label>
          <input
            id="signup-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            aria-invalid={problem ? true : undefined}
            aria-describedby={problem ? 'signup-problem' : undefined}
          />
          {problem && <p id="signup-problem">{problem}</p>}
          <button type="submit" disabled={status.kind === 'sending'}>
            {status.kind === 'sending' ? 'Signing up…' : 'Sign up'}
          </button>
          {status.kind === 'failed' && <p role="alert">{status.message}</p>}
        </form>
      )}
    </section>
  )
}
