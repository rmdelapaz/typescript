// The part of the address after the ?: every value is text, or missing (Task 1)

/** One search parameter, if it is one of `allowed`; undefined when it is missing or anything else */
// TODO 1: make it generic, so readChoice(params, 'status', statuses) is EventStatus | undefined, with no `as`
export function readChoice(params: URLSearchParams, name: string, allowed: readonly string[]): string | undefined {
  throw new Error(`TODO 1: read ${name} from "${params.toString()}" if it is one of ${allowed.join(', ')}`)
}

/** A copy of params with each change applied; an empty value removes that name (defaults stay out of the address) */
export function withParams(params: URLSearchParams, changes: Record<string, string>): URLSearchParams {
  throw new Error(`TODO 1: apply ${JSON.stringify(changes)} to a COPY of "${params.toString()}"`)
}
