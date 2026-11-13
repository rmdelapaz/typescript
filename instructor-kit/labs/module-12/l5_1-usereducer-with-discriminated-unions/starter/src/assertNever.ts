// For the end of a switch that handles every member of a union (Lesson 5.1): TypeScript only accepts a call here
// when no case is left over, and a value nobody expected fails loudly at run time.
export function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${JSON.stringify(value)}`)
}
