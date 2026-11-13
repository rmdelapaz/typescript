// Final project evidence check (instructor kit, Session 26). Run it on a final project two days before the
// showcase: it reads the project's files (no network, no install, nothing changed) and says what is still missing
// from the evidence the Lesson 11.1 rubric asks for. It does NOT score the project: the rubric does, with a person.
//
//   node evidence_check.mjs [project folder]          (default: the current folder)
//
// Every line starts with PASS, FIX (missing evidence: the verdict is NOT READY, exit code 1) or CHECK (look at it
// yourself: READY WITH NOTES). The rubric row each line belongs to is in brackets.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const root = process.argv[2] ?? '.'
const results = []
const line = (kind, row, text) => results.push({ kind, row, text })
const pass = (row, text) => line('PASS', row, text)
const fix = (row, text) => line('FIX', row, text)
const check = (row, text) => line('CHECK', row, text)

function read(rel) {
  const file = join(root, rel)
  return existsSync(file) ? readFileSync(file, 'utf8') : null
}

/** Every file under a folder (no node_modules, dist or hidden folders), as paths relative to the project */
function filesUnder(rel) {
  const start = join(root, rel)
  if (!existsSync(start)) return []
  const found = []
  const walk = (dir) => {
    for (const name of readdirSync(dir).sort()) {
      if (name === 'node_modules' || name === 'dist' || name.startsWith('.')) continue
      const full = join(dir, name)
      if (statSync(full).isDirectory()) walk(full)
      else found.push(relative(root, full))
    }
  }
  walk(start)
  return found
}

/** The table rows of one "## N. Title" section of worksheet.md, as arrays of trimmed cells */
function sectionRows(worksheet, number) {
  const parts = worksheet.split(/^## /m)
  const section = parts.find((part) => part.startsWith(`${number}. `)) ?? ''
  return section
    .split('\n')
    .filter((text) => text.trim().startsWith('|') && !/^\|\s*-/.test(text.trim()))
    .map((text) => text.trim().replace(/^\||\|$/g, '').split('|').map((cell) => cell.trim()))
}

const pkgText = read('package.json')
if (pkgText === null) {
  fix('-', `no package.json in ${root}: run the check in your project's folder, or give it the folder`)
} else {
  // ---- Make it yours (Milestone 1)
  const pkg = JSON.parse(pkgText)
  if (pkg.name === 'final-project') fix('1', 'package.json still says "name": "final-project": give the project its own name')
  else pass('1', `the project has its own name (${pkg.name})`)
  const config = read('src/config.ts') ?? ''
  const appName = /appName\s*=\s*'([^']*)'/.exec(config)?.[1]
  if (appName === undefined || appName === 'Starter App') fix('3', "src/config.ts: appName is still 'Starter App'")
  else pass('3', `appName is '${appName}'`)
  const title = /<title>([^<]*)<\/title>/.exec(read('index.html') ?? '')?.[1]
  if (title === undefined || title === 'Starter App') fix('3', 'index.html: the <title> is still Starter App')
  else pass('3', `the browser tab says ${title}`)

  // ---- Row 1: the plan
  const worksheet = read('worksheet.md')
  if (worksheet === null) {
    fix('1', 'no worksheet.md next to package.json: copy the kit\'s worksheet into the project and keep it in Git')
  } else {
    const charter = sectionRows(worksheet, 0).slice(1)
    const empty = charter.filter((cells) => (cells[1] ?? '') === '').length
    if (charter.length === 0 || empty > 0) fix('1', `worksheet.md section 0 (charter): ${empty} of ${charter.length} questions not answered`)
    else pass('1', `worksheet.md: the charter answers all ${charter.length} questions`)
    const log = sectionRows(worksheet, 11)
    const head = log[0] ?? []
    const col = head.indexOf('Actual (h)')
    const milestones = log.slice(1).filter((cells) => /^\d+$/.test(cells[0] ?? ''))
    const missing = milestones.filter((cells) => col < 0 || (cells[col] ?? '') === '').map((cells) => cells[0])
    if (col < 0 || milestones.length === 0) fix('1', 'worksheet.md section 11: no time log table with an "Actual (h)" column')
    else if (missing.includes('1')) fix('1', 'worksheet.md time log: no actual hours for Milestone 1')
    else if (missing.length > 0) check('1', `worksheet.md time log: no actual hours yet for Milestone ${missing.join(', ')}`)
    else pass('1', `worksheet.md time log: actual hours for all ${milestones.length} milestones`)
  }

  // ---- Row 2: types and data
  const types = read('src/api/types.ts')
  if (types === null) fix('2', 'no src/api/types.ts: the domain types live there')
  else if (/export interface Item\b/.test(types)) fix('2', "src/api/types.ts still has the example Item (Milestone 2 deletes it)")
  else pass('2', 'src/api/types.ts has no example Item left')
  const code = filesUnder('src').filter((rel) => /\.(ts|tsx)$/.test(rel))
  const anyLines = []
  for (const rel of code) {
    readFileSync(join(root, rel), 'utf8').split('\n').forEach((text, i) => {
      // the code part of the line only: comments may say "any" in plain English
      const codePart = /^\s*(\*|\/\*)/.test(text) ? '' : text.replace(/\/\/.*$/, '')
      if (/(:\s*any\b|\bas any\b|<any>)/.test(codePart)) anyLines.push(`${rel}:${i + 1}`)
    })
  }
  if (anyLines.length > 0) check('2', `"any" in ${anyLines.length} place(s), first ${anyLines[0]}: be ready to say why`)
  else pass('2', `no "any" in ${code.length} files under src`)

  // ---- Row 8: tests and CI
  if (existsSync(join(root, '.github/workflows/ci.yml'))) pass('8', '.github/workflows/ci.yml is at the top of the project')
  else fix('8', 'no .github/workflows/ci.yml at the top of the project: CI runs from there')
  const tests = code.filter((rel) => /\.test\.tsx?$/.test(rel))
  const journeys = filesUnder('e2e').filter((rel) => rel.endsWith('.spec.ts'))
  if (tests.length === 0) fix('8', 'no *.test.ts(x) files under src')
  else pass('8', `${tests.length} test files under src, ${journeys.length} Playwright spec file(s) in e2e`)

  // ---- Row 9: launch and security
  const redirects = read('public/_redirects') ?? ''
  if (/^\/\*\s+\/index\.html\s+200\s*$/m.test(redirects)) pass('9', 'public/_redirects sends every address to index.html (200)')
  else fix('9', 'public/_redirects has no "/*  /index.html  200" line: deep links will answer 404')
  const headers = read('public/_headers') ?? ''
  const absent = ['X-Content-Type-Options', 'Referrer-Policy', 'X-Frame-Options'].filter((name) => !headers.includes(name))
  if (absent.length > 0) fix('9', `public/_headers lacks ${absent.join(', ')}`)
  else pass('9', 'public/_headers sets X-Content-Type-Options, Referrer-Policy and X-Frame-Options')
  const ignore = read('.gitignore') ?? ''
  if (!/^(\*\.local|\.env\.local)$/m.test(ignore)) fix('9', '.gitignore does not cover .env.local (*.local)')
  else pass('9', '.gitignore keeps .env.local out of Git')
  const secretName = /\bVITE_[A-Z0-9_]*(SECRET|TOKEN|PASSWORD|PRIVATE|KEY)\b/
  const secretHits = ['.env.example', ...code]
    .filter((rel) => existsSync(join(root, rel)))
    .flatMap((rel) => readFileSync(join(root, rel), 'utf8').split('\n')
      .map((text, i) => (secretName.test(text) ? `${rel}:${i + 1} (${secretName.exec(text)[0]})` : null))
      .filter(Boolean))
  if (secretHits.length > 0) fix('9', `a VITE_ variable named like a secret, ${secretHits[0]}: everything in VITE_ ships to every visitor`)
  else pass('9', 'no VITE_ variable named like a secret')

  // ---- Row 9 (strong) and the showcase: the README
  const readme = read('README.md')
  if (readme === null || readme.startsWith('# Final project starter')) fix('9', "README.md is still the starter's: what the app is, the live link, how to run it")
  else {
    const link = /https:\/\/[^\s)>\]]+/.exec(readme)?.[0]
    if (link) pass('9', `README.md links to ${link}`)
    else fix('9', 'README.md has no https:// link to the live app')
    if (/!\[[^\]]*\]\([^)]+\)/.test(readme)) pass('9', 'README.md shows a screenshot')
    else check('9', 'README.md has no screenshot (rubric row 9, strong)')
  }

  // ---- Row 10: the peer review
  const review = readdirSync(root).find((name) => /^peer-review-(received|from)/i.test(name))
  if (review) pass('10', `the review you received is in ${review}`)
  else check('10', 'no peer-review-received.md: bring the review you received and your answers to it')
}

for (const r of results) console.log(`${r.kind.padEnd(5)} [row ${r.row}] ${r.text}`)
const count = (kind) => results.filter((r) => r.kind === kind).length
console.log('')
console.log(`${count('PASS')} passed, ${count('FIX')} to fix, ${count('CHECK')} to check`)
if (count('FIX') > 0) {
  console.log('NOT READY: fix the FIX lines above, then run this check again')
  process.exitCode = 1
} else if (count('CHECK') > 0) {
  console.log('READY WITH NOTES: look at the CHECK lines before the showcase')
} else {
  console.log('READY FOR THE SHOWCASE')
}
