// The setter's form as one piece of state, changed only by actions (Lesson 5.1)
import type { RouteForm } from '../api/client.ts'
import { assertNever } from '../utils/assertNever.ts'

/** The four fields of a new route */
export type DraftField = keyof RouteForm

export interface RouteDraft {
  /** What is in the fields now (text, as the fields hold it) */
  values: RouteForm
  /** 'sending' while the POST is on its way: the button is disabled and says so */
  status: 'editing' | 'sending'
  /** The API's message for each field it refused */
  fieldErrors: Partial<Record<DraftField, string[]>>
  /** The API's message for the whole form, or '' */
  message: string
}

/** Every change the form can make: one object type per kind of change */
export type DraftAction =
  | { type: 'field'; field: DraftField; value: string }
  | { type: 'submitted' }
  | { type: 'failed'; message: string; fieldErrors: Record<string, string[]> }
  | { type: 'reset' }

export const emptyDraft: RouteDraft = {
  values: { name: '', wallId: '', grade: '', holdColor: '' },
  status: 'editing',
  fieldErrors: {},
  message: '',
}

const draftFields: readonly DraftField[] = ['name', 'wallId', 'grade', 'holdColor']

export function routeDraftReducer(state: RouteDraft, action: DraftAction): RouteDraft {
  switch (action.type) {
    case 'field': {
      // Typing in a field takes its old message away; the other fields keep theirs
      const { [action.field]: _fixed, ...otherErrors } = state.fieldErrors
      return {
        ...state,
        values: { ...state.values, [action.field]: action.value },
        fieldErrors: otherErrors,
      }
    }
    case 'submitted':
      return { ...state, status: 'sending', message: '' }
    case 'failed': {
      // Keep only the messages for fields this form has
      const fieldErrors: RouteDraft['fieldErrors'] = {}
      for (const field of draftFields) {
        const messages = action.fieldErrors[field]
        if (messages !== undefined) fieldErrors[field] = messages
      }
      return { ...state, status: 'editing', message: action.message, fieldErrors }
    }
    case 'reset':
      return emptyDraft
    default:
      return assertNever(action)
  }
}
