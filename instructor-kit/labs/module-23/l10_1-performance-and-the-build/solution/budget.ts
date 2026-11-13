// Lab 10.1's budget check (given, do not edit). Run it after a build:  npx vite build && node budget.ts
// It reads dist/ the way a first visit does: index.html, its entry script and every file it preloads.
import { readdirSync, readFileSync, statSync } from 'node:fs'

const BUDGET_KB = 230
const MARKER = 'Port Marisol tide tables'

const html = readFileSync('dist/index.html', 'utf8')
const firstVisit = [...html.matchAll(/(?:src|href)="\/(assets\/[^"]+\.js)"/g)].map((match) => match[1] ?? '')
const files = readdirSync('dist/assets')
  .filter((file) => file.endsWith('.js'))
  .map((file) => `assets/${file}`)
  .sort()

const kb = (file: string) => statSync(`dist/${file}`).size / 1000
const hasTides = (file: string) => readFileSync(`dist/${file}`, 'utf8').includes(MARKER)

console.log('JavaScript in dist/ (kB, before compression):')
for (const file of files) {
  const when = firstVisit.includes(file) ? 'first visit' : 'when asked'
  console.log(`  ${file.padEnd(36)} ${kb(file).toFixed(2).padStart(8)}  ${when}${hasTides(file) ? '  (tide data)' : ''}`)
}

const total = firstVisit.reduce((sum, file) => sum + kb(file), 0)
const checks: [boolean, string][] = [
  [!firstVisit.some(hasTides), 'the tide data is not in the first visit (Task 2)'],
  [files.some((file) => !firstVisit.includes(file) && hasTides(file)), 'the tide data has a file of its own (Task 2)'],
  [firstVisit.some((file) => file.startsWith('assets/vendor-')), 'React has a vendor file of its own (Task 3)'],
  [total <= BUDGET_KB, `the first visit is within the budget: ${total.toFixed(2)} kB of ${BUDGET_KB} kB`],
]
for (const [ok, text] of checks) console.log(`${ok ? 'OK  ' : 'FAIL'}  ${text}`)
process.exitCode = checks.every(([ok]) => ok) ? 0 : 1
