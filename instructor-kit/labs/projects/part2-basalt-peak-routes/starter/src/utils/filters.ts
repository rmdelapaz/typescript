// The routes list's filters live in the address: /routes?wall=the-cave&grade=V4 (Lesson 6.2).
// Every value there is a string (or missing), whatever we hoped: a guard decides what it is.
import type { RouteFilters } from '../api/client.ts'

/** The filters in the address; a value the app does not know (?wall=the-moon) is ignored, never sent to the API */
export function readFilters(params: URLSearchParams): RouteFilters {
  // TODO R3: wall and grade from params, each kept only when isWallId / isGrade (src/api/client.ts) says yes
  throw new Error(`TODO R3: readFilters is not written yet (${params.toString()})`)
}

/** A copy of params with one value set; an empty value removes the parameter */
export function withParam(params: URLSearchParams, name: string, value: string): URLSearchParams {
  // TODO R3: a NEW URLSearchParams (never change the one you were given)
  throw new Error(`TODO R3: withParam is not written yet (${params.toString()}, ${name}=${value})`)
}
