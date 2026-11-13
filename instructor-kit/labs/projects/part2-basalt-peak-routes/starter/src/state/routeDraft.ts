// The setter's form as one piece of state, changed only by actions (Lesson 5.1)
import type { RouteForm } from '../api/client.ts'

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

export function routeDraftReducer(state: RouteDraft, action: DraftAction): RouteDraft {
  // TODO R5: a switch on action.type that returns a NEW state for each kind of action, and
  // assertNever(action) (src/utils/assertNever.ts) in the default case:
  //   field      the value changes, that field's message goes, the other messages stay
  //   submitted  status 'sending', message ''
  //   failed     status 'editing', the message, and the fieldErrors for the four fields of this form
  //   reset      emptyDraft
  throw new Error(`TODO R5: routeDraftReducer is not written yet (${action.type} on a ${state.status} form)`)
}
