// The fields of shoreline-api's answers this lab needs (the HQ's full types are in src/api/types.ts)
export type SignupStatus = 'confirmed' | 'waitlisted' | 'cancelled' | 'attended' | 'no-show'

export interface Signup {
  id: string
  eventId: string
  volunteerId: string
  status: SignupStatus
  note: string
  createdAt: string
  checkedInAt: string | null
}

export interface CleanupSummary {
  id: string
  title: string
  date: string
  capacity: number
  spotsTaken: number
}

/** GET /api/me/signups: each sign-up with its cleanup */
export interface MySignup extends Signup {
  event: CleanupSummary
}
