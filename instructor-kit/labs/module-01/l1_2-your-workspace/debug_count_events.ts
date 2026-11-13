// Debug handout (deliberately broken: two bugs). With the API running, from this lab's folder:
//   node debug_count_events.ts http://localhost:4000
// Read the first message from the top, fix that line, run it again: the second bug only shows then.
const api: string = process.argv[2] ?? 'http://localhost:4000'

const response = await fetch(api + 'api/events')
const events = response.json()
console.log(`${response.status}: ${events.length} cleanups on the first page`)
console.log(`The first one: ${events[0].title}`)
