// For the end of a switch that handles every member of a union.
// TypeScript only accepts a call here when no case is left over (value is never),
// and if a value nobody expected arrives at runtime anyway, it fails loudly.
export function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${JSON.stringify(value)}`)
}
