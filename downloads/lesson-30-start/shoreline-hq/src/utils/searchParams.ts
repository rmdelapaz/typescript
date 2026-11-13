// The part of the address after the ?: every value is a string (or missing), whatever we hoped

/** One search parameter, if it is one of the values we allow; undefined when it is missing or wrong */
export function readParam<T extends string>(
  params: URLSearchParams,
  name: string,
  isT: (value: string) => value is T,
): T | undefined {
  const value = params.get(name)
  return value !== null && isT(value) ? value : undefined
}

/** The ?page= number: 1 when it is missing or is not a whole number above 0 */
export function readPageNumber(params: URLSearchParams): number {
  const page = Number(params.get('page'))
  return Number.isInteger(page) && page > 0 ? page : 1
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
