import { useLoaderData } from 'react-router'
import type { setterLoader } from './loaders.ts'

export function SetterPage() {
  const { walls } = useLoaderData<typeof setterLoader>()

  // TODO R5: useReducer(routeDraftReducer, emptyDraft) and a form with four labeled fields, "Name" (input) and the
  // selects "Wall", "Grade" and "Hold color" (a "Pick a ..." option first). On submit: dispatch submitted,
  // postRoute(values); on success open /routes/<new id>; on an ApiError dispatch failed with its message and
  // fieldErrors: each message under its field (FieldError, aria-invalid, aria-describedby), the form's message
  // in a <p role="alert">. The button "Log route" says "Logging…" and is disabled while the POST is on its way.
  return (
    <>
      <h1>Log a new route</h1>
      <p className="todo">TODO R5: the form ({walls.length} walls loaded)</p>
    </>
  )
}
