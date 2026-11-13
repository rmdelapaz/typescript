// The part of the address after the ?: every value is text, or missing (Task 1)

/** One search parameter, if it is one of `allowed`; undefined when it is missing or anything else */
export function readChoice<T extends string>(
  params: URLSearchParams,
  name: string,
  allowed: readonly T[],
): T | undefined {
  const value = params.get(name)
  // find() compares and hands back the ALLOWED value, already typed T: no `as` anywhere
  return allowed.find((choice) => choice === value)
}

/** A copy of params with each change applied; an empty value removes that name (defaults stay out of the address) */
export function withParams(params: URLSearchParams, changes: Record<string, string>): URLSearchParams {
  const next = new URLSearchParams(params)
  for (const [name, value] of Object.entries(changes)) {
    if (value === '') {
      next.delete(name)
    } else {
      next.set(name, value)
    }
  }
  return next
}
