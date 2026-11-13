// Lab 1.2: three tools, three kinds of feedback.
//   npm test        RUNS the code (Node removes the types first, like Vite's dev server)
//   npm run check   CHECKS the types (tsc, like npm run build does first)
//   npm run lint    looks for suspicious code (oxlint, like npm run lint in shoreline-hq)
// Make all three clean. The tests say what banner() must return.

export const crewName: string = 'Shoreline Crew'
export const crewSize: string = 24
const motto = 'Many hands, cleaner sands.'

export function banner(): string {
  return `${crewName.toUppercase()} · ${crewSize} volunteers`
}
