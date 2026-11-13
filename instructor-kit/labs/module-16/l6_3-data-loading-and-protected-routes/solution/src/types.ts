// The shapes this lab uses, as shoreline-api sends them (only the fields the pages need). Do not edit.
export type Terrain = 'sand' | 'rocky' | 'marsh' | 'mixed'

export interface Site {
  id: string
  name: string
  town: string
  terrain: Terrain
  parking: string
  description: string
}

export type Role = 'organizer' | 'volunteer'

export interface CrewMember {
  id: string
  name: string
  role: Role
  skills: string[]
}

export interface User {
  id: string
  name: string
  email: string
  role: Role
}

/** What POST /api/auth/sign-in answers */
export interface Session {
  token: string
  user: User
}

/** Every error answer of the API */
export interface ApiErrorBody {
  error: string
  message: string
  fieldErrors?: Record<string, string[]>
}
