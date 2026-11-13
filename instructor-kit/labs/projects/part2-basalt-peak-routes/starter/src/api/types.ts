// The Basalt Peak routes API: every shape it sends and accepts (a copy of api/types.ts).
// Change both or neither.

/** A day as "YYYY-MM-DD" */
export type DateString = string

/** The four walls of the gym */
export type WallId = 'the-slab' | 'the-cave' | 'the-prow' | 'kids-corner'

export interface Wall {
  id: WallId
  /** What the gym calls it: "The Slab" */
  name: string
}

/** The bouldering grades the gym sets, easiest first */
export type Grade = 'V0' | 'V1' | 'V2' | 'V3' | 'V4' | 'V5' | 'V6' | 'V7'

/** Every hold on a route has the same color */
export type HoldColor = 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'black'

/** Active: on the wall now. Retired: taken down (its page still works). */
export type RouteStatus = 'active' | 'retired'

/** One boulder problem ("route") on one wall */
export interface ClimbRoute {
  /** r01, r02, ... */
  id: string
  name: string
  wallId: WallId
  grade: Grade
  holdColor: HoldColor
  /** The setter's name */
  setter: string
  /** The day it went up */
  setOn: DateString
  status: RouteStatus
}

/** Setters log and retire routes; staff can sign in but only read */
export type Role = 'setter' | 'staff'

export interface User {
  id: string
  name: string
  role: Role
}

/** The answer to POST /api/auth/sign-in: send the token as "Authorization: Bearer <token>" */
export interface Session {
  token: string
  user: User
}

/** The body of POST /api/routes (the API checks every field) */
export interface NewRoute {
  name: string
  wallId: WallId
  grade: Grade
  holdColor: HoldColor
}

export type ErrorCode =
  | 'validation_failed'
  | 'unauthorized'
  | 'forbidden'
  | 'not_found'
  | 'method_not_allowed'
  | 'server_error'

/** Every error answer: a code for programs, a message for people, and per-field messages after a 400 */
export interface ApiErrorBody {
  error: ErrorCode
  message: string
  fieldErrors?: Record<string, string[]>
}
