// The routes list's filters live in the address: /routes?wall=the-cave&grade=V4 (Lesson 6.2).
// Every value there is a string (or missing), whatever we hoped: a guard decides what it is.
import { isGrade, isWallId, type RouteFilters } from '../api/client.ts'

/** The filters in the address; a value the app does not know (?wall=moon) is ignored, never sent to the API */
export function readFilters(params: URLSearchParams): RouteFilters {
  const wall = params.get('wall')
  const grade = params.get('grade')
  return {
    wall: isWallId(wall) ? wall : undefined,
    grade: isGrade(grade) ? grade : undefined,
  }
}

/** A copy of params with one value set; an empty value removes the parameter */
export function withParam(params: URLSearchParams, name: string, value: string): URLSearchParams {
  const next = new URLSearchParams(params)
  if (value === '') {
    next.delete(name)
  } else {
    next.set(name, value)
  }
  return next
}
