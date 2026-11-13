// Given: the HQ's ApiError with the API's fieldErrors (Lesson 7.2). Nothing to change here.
export class ApiError extends Error {
  status: number
  /** shoreline-api's 400 answers: field name -> messages (plain strings: it is JSON from outside) */
  fieldErrors: Record<string, string[]> | undefined

  constructor(status: number, message: string, fieldErrors?: Record<string, string[]>) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.fieldErrors = fieldErrors
  }
}
