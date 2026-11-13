import { useReducer, type SubmitEvent } from 'react'
import { useLoaderData, useNavigate } from 'react-router'
import { ApiError, describeError, grades, holdColors, postRoute } from '../api/client.ts'
import { FieldError } from '../components/FieldError.tsx'
import { emptyDraft, routeDraftReducer, type DraftField } from '../state/routeDraft.ts'
import type { setterLoader } from './loaders.ts'

export function SetterPage() {
  const { walls } = useLoaderData<typeof setterLoader>()
  const navigate = useNavigate()
  const [draft, dispatch] = useReducer(routeDraftReducer, emptyDraft)
  const { values, fieldErrors, status, message } = draft
  const sending = status === 'sending'

  // What every field needs to say about its own message
  function invalid(field: DraftField) {
    const messages = fieldErrors[field]
    return {
      'aria-invalid': messages !== undefined,
      'aria-describedby': messages && `${field}-error`,
    }
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    if (sending) return
    dispatch({ type: 'submitted' })
    try {
      // The API checks every field: its answer decides what happens next
      const route = await postRoute(values)
      dispatch({ type: 'reset' })
      navigate(`/routes/${route.id}`)
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        dispatch({ type: 'failed', message: error.message, fieldErrors: error.fieldErrors ?? {} })
      } else {
        dispatch({ type: 'failed', message: describeError(error), fieldErrors: {} })
      }
    }
  }

  return (
    <>
      <h1>Log a new route</h1>
      <p className="lead">It goes up as active, set by you, today.</p>
      <form className="form" noValidate onSubmit={handleSubmit}>
        <p role="alert" className="form-message">
          {message}
        </p>
        <div className="field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            value={values.name}
            onChange={(e) => dispatch({ type: 'field', field: 'name', value: e.target.value })}
            {...invalid('name')}
          />
          <FieldError id="name-error" messages={fieldErrors.name} />
        </div>
        <div className="field">
          <label htmlFor="wallId">Wall</label>
          <select
            id="wallId"
            value={values.wallId}
            onChange={(e) => dispatch({ type: 'field', field: 'wallId', value: e.target.value })}
            {...invalid('wallId')}
          >
            <option value="">Pick a wall</option>
            {walls.map((wall) => (
              <option key={wall.id} value={wall.id}>
                {wall.name}
              </option>
            ))}
          </select>
          <FieldError id="wallId-error" messages={fieldErrors.wallId} />
        </div>
        <div className="field">
          <label htmlFor="grade">Grade</label>
          <select
            id="grade"
            value={values.grade}
            onChange={(e) => dispatch({ type: 'field', field: 'grade', value: e.target.value })}
            {...invalid('grade')}
          >
            <option value="">Pick a grade</option>
            {grades.map((grade) => (
              <option key={grade} value={grade}>
                {grade}
              </option>
            ))}
          </select>
          <FieldError id="grade-error" messages={fieldErrors.grade} />
        </div>
        <div className="field">
          <label htmlFor="holdColor">Hold color</label>
          <select
            id="holdColor"
            value={values.holdColor}
            onChange={(e) => dispatch({ type: 'field', field: 'holdColor', value: e.target.value })}
            {...invalid('holdColor')}
          >
            <option value="">Pick a color</option>
            {holdColors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
          <FieldError id="holdColor-error" messages={fieldErrors.holdColor} />
        </div>
        <button type="submit" className="primary" disabled={sending}>
          {sending ? 'Logging…' : 'Log route'}
        </button>
      </form>
    </>
  )
}
