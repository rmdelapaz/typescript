// Lab 10.2's deploy check (given, do not edit). Run it after both builds:
//   npx vite build && npx vite build --mode demo --outDir dist-demo && node deploy.check.ts
// It reads the two builds, the host's files in them and the workflow, and prints OK or FIX for each rule.
import { existsSync, readdirSync, readFileSync } from 'node:fs'

const MARKER = 'Gear Library demo API'
const results: [boolean, string][] = []
const check = (ok: boolean, text: string) => results.push([ok, text])
const read = (file: string) => (existsSync(file) ? readFileSync(file, 'utf8') : '')
const jsWithDemo = (dir: string) =>
  existsSync(`${dir}/assets`)
    ? readdirSync(`${dir}/assets`).filter((file) => file.endsWith('.js') && read(`${dir}/assets/${file}`).includes(MARKER))
    : []

// Task 1: "demo or not" is decided by the build
check(jsWithDemo('dist').length === 0, 'Task 1: the normal build has no demo API in it')
check(!existsSync('dist/mockServiceWorker.js'), 'Task 1: the normal build has no mockServiceWorker.js')
check(jsWithDemo('dist-demo').length > 0, 'Task 1: the demo build has the demo API')
check(existsSync('dist-demo/mockServiceWorker.js'), 'Task 1: the demo build has mockServiceWorker.js')

// Task 2: the host's files, in the published folder
for (const dir of ['dist', 'dist-demo']) {
  check(/^\/\*\s+\/index\.html\s+200\s*$/m.test(read(`${dir}/_redirects`)), `Task 2: ${dir}/_redirects sends index.html for every address (200)`)
}
const blocks = new Map<string, string[]>()
let pattern = ''
for (const line of read('dist/_headers').split(/\r?\n/)) {
  if (!line.trim() || line.trim().startsWith('#')) continue
  if (!/^\s/.test(line)) blocks.set((pattern = line.trim()), [])
  else blocks.get(pattern)?.push(line.trim().toLowerCase())
}
const headers = (path: string) => blocks.get(path) ?? []
check(headers('/assets/*').some((h) => h.startsWith('cache-control:') && h.includes('max-age=31536000') && h.includes('immutable')),
  'Task 2: /assets/* may be cached for a year (immutable)')
check(![...blocks].some(([path, list]) => path !== '/assets/*' && list.some((h) => h.startsWith('cache-control:'))),
  'Task 2: nothing else is cached for a year (index.html must be checked on every visit)')
for (const header of ['x-content-type-options: nosniff', 'referrer-policy: strict-origin-when-cross-origin', 'x-frame-options: deny']) {
  check(headers('/*').includes(header), `Task 2: every response sends ${header.split(':')[0]}`)
}

// Task 3: the workflow (a text review; actionlint, Lesson 10.2 Exercise 1, is the real checker)
const workflow = read('.github/workflows/ci.yml')
const lines = workflow.split(/\r?\n/)
check(workflow !== '', 'Task 3: .github/workflows/ci.yml exists')
check(!workflow.includes('\t') && lines.every((line) => (line.length - line.trimStart().length) % 2 === 0),
  'Task 3: indented with spaces, two per level')
check(/^ {2}push:/m.test(workflow) && /^ {2}pull_request:/m.test(workflow), 'Task 3: runs on pushes and on pull requests')
check(/^permissions:\n {2}contents: read$/m.test(workflow), 'Task 3: read-only permissions')
check(workflow.includes('actions/checkout@v7') && workflow.includes('actions/setup-node@v7'), 'Task 3: current action versions (@v7)')
check(/node-version: 24\b/.test(workflow), 'Task 3: Node.js 24, like the course')
for (const step of ['npm ci', 'npm run typecheck', 'npm test', 'npx vite build', 'npx vite build --mode demo']) {
  check(lines.some((line) => line.trim() === `- run: ${step}`), `Task 3: a step runs ${step}`)
}

for (const [ok, text] of results) console.log(`${ok ? 'OK ' : 'FIX'}  ${text}`)
const fixes = results.filter(([ok]) => !ok).length
console.log(fixes ? `${fixes} to fix` : 'All checks pass: ready for a draft deploy')
process.exitCode = fixes ? 1 : 0
