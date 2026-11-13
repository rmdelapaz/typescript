// The debug handout, fixed (instructor copy): node count_events.ts http://localhost:4000
const api: string = process.argv[2] ?? 'http://localhost:4000'

const response = await fetch(`${api}/api/events`)
const events = await response.json()
console.log(`${response.status}: ${events.length} cleanups on the first page`)
console.log(`The first one: ${events[0].title}`)
