import { assertNever } from '../utils/assertNever.ts'

/** What the check-in desk records about one sign-up today */
export type Mark = 'attended' | 'no-show'

/** One saved change, remembered so that it can be undone */
export interface Change {
  signupId: string
  before: Mark | undefined
}

/** The desk's own record: the marks live in shoreline-api now, the undo history stays here */
export type RosterAction =
  | { type: 'saved'; change: Change }
  | { type: 'undone' }

export interface RosterState {
  /** the changes the API has accepted, newest last */
  history: readonly Change[]
}

export const initialRoster: RosterState = { history: [] }

export function rosterReducer(state: RosterState, action: RosterAction): RosterState {
  switch (action.type) {
    case 'saved':
      return { history: [...state.history, action.change] }
    case 'undone':
      return { history: state.history.slice(0, -1) }
    default:
      return assertNever(action)
  }
}
