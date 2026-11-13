import { assertNever } from '../utils/assertNever.ts'

/** What the check-in desk records about one sign-up today */
export type Mark = 'attended' | 'no-show'

/** Every change the check-in desk can make: one object type per kind of change */
export type RosterAction =
  | { type: 'checkIn'; signupId: string }
  | { type: 'markNoShow'; signupId: string }
  | { type: 'clear'; signupId: string }
  | { type: 'undo' }

/** One change, remembered so that it can be undone */
interface Change {
  signupId: string
  before: Mark | undefined
}

export interface RosterState {
  /** sign-up id → mark; anyone without a mark is still expected */
  marks: ReadonlyMap<string, Mark>
  /** the changes so far, newest last */
  history: readonly Change[]
}

export const initialRoster: RosterState = { marks: new Map(), history: [] }

// A copy of the marks with one of them changed: the old Map is never touched
function withMark(marks: ReadonlyMap<string, Mark>, signupId: string, mark: Mark | undefined) {
  const next = new Map(marks)
  if (mark === undefined) {
    next.delete(signupId)
  } else {
    next.set(signupId, mark)
  }
  return next
}

function setMark(state: RosterState, signupId: string, mark: Mark | undefined): RosterState {
  const before = state.marks.get(signupId)
  if (before === mark) {
    return state
  }
  return {
    marks: withMark(state.marks, signupId, mark),
    history: [...state.history, { signupId, before }],
  }
}

export function rosterReducer(state: RosterState, action: RosterAction): RosterState {
  switch (action.type) {
    case 'checkIn':
      return setMark(state, action.signupId, 'attended')
    case 'markNoShow':
      return setMark(state, action.signupId, 'no-show')
    case 'clear':
      return setMark(state, action.signupId, undefined)
    case 'undo': {
      const last = state.history.at(-1)
      if (last === undefined) {
        return state
      }
      return {
        marks: withMark(state.marks, last.signupId, last.before),
        history: state.history.slice(0, -1),
      }
    }
    default:
      return assertNever(action)
  }
}
