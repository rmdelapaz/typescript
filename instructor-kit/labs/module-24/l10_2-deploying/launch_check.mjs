#!/usr/bin/env node
// Launch-readiness check for React + TypeScript: Build a Modern Web App (Session 24, Lesson 10.2).
// Run it from your course folder (the one that holds shoreline-api, shoreline-hq and ts-lab):
//     node labs/module-24/l10_2-deploying/launch_check.mjs            (local checks only)
//     node labs/module-24/l10_2-deploying/launch_check.mjs --online   (also: can this network reach the deploy sites?)
// It changes nothing. OK = ready, CHECK = worth a look (not blocking), FIX = do this before Steps 6 and 7.
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'

const lines = []
const say = (kind, text) => lines.push(`${kind.padEnd(5)} ${text}`)
const read = (file) => (existsSync(file) ? readFileSync(file, 'utf8') : '')
function git(...args) {
  try {
    return execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim()
  } catch {
    return null
  }
}

// 1. The tools
const major = Number(process.versions.node.split('.')[0])
if (major >= 24) say('OK', `Node.js ${process.version}`)
else say('FIX', `Node.js ${process.version} is too old: install the current LTS (24 or newer)`)
const gitVersion = git('--version')
if (gitVersion) say('OK', gitVersion)
else say('FIX', 'Git is not installed (or not on the PATH): install it from git-scm.com, then open a new terminal')
if (gitVersion) {
  if (git('config', 'user.name') && git('config', 'user.email')) say('OK', 'Git knows your name and email for commits')
  else say('CHECK', 'Git does not know who you are yet: git config --global user.name "Your Name" (and user.email)')
}

// 2. The course folder as one repository
if (!existsSync('shoreline-hq/package.json') || !existsSync('shoreline-api/server.ts')) {
  say('FIX', 'no shoreline-hq and shoreline-api here: run this from your course folder (cd shoreline)')
}
const top = gitVersion ? git('rev-parse', '--show-toplevel') : null
const isRepo = top !== null && git('rev-parse', '--show-prefix') === ''
if (isRepo) say('OK', 'the course folder is a Git repository')
else say('FIX', 'the course folder is not a Git repository yet: git init -b main (Lesson 10.2, Step 1)')
const ignore = read('.gitignore')
const missing = ['node_modules/', '.env.local', '.netlify/'].filter((rule) => !ignore.split(/\r?\n/).includes(rule))
if (missing.length === 0) say('OK', '.gitignore keeps node_modules/, .env.local and .netlify/ out')
else say('FIX', `.gitignore at the top of the course folder needs: ${missing.join(' ')} (Step 1)`)
if (isRepo) {
  const tracked = (git('ls-files') ?? '').split('\n')
  const secrets = tracked.filter((file) => /(^|\/)\.env\.local$/.test(file))
  if (secrets.length) say('FIX', `${secrets.join(', ')} is in the repository: git rm --cached it, then commit`)
  else say('OK', 'no .env.local in the repository')
  if (tracked.some((file) => /(^|\/)(node_modules|dist)\//.test(file))) say('FIX', 'node_modules or dist files are in the repository: git rm -r --cached them')
  if (git('rev-parse', '--verify', 'HEAD')) say('OK', 'at least one commit')
  else say('FIX', 'nothing committed yet: git add . then git commit -m "Shoreline Crew HQ: the course code"')
}

// 3. What the runner and the host will read
const ci = read('.github/workflows/ci.yml')
if (!ci) say('FIX', 'no .github/workflows/ci.yml at the top of the course folder (Step 5)')
else {
  say('OK', '.github/workflows/ci.yml')
  for (const [text, why] of [['--deny-warnings', 'lint fails on warnings'], ['build:demo', 'the demo build is checked'], ['needs: checks', 'e2e waits for the quick checks']]) {
    if (!ci.includes(text)) say('CHECK', `ci.yml has no ${text} (${why})`)
  }
}
let scripts = {}
try {
  scripts = JSON.parse(read('shoreline-hq/package.json') || '{}').scripts ?? {}
} catch {
  say('FIX', 'shoreline-hq/package.json is not valid JSON')
}
for (const name of ['build:demo', 'test', 'test:e2e']) {
  if (!scripts[name]) say('FIX', `shoreline-hq has no "${name}" script`)
}
if (/^\/\*\s+\/index\.html\s+200\s*$/m.test(read('shoreline-hq/public/_redirects'))) say('OK', 'public/_redirects: deep links get index.html')
else say('FIX', 'shoreline-hq/public/_redirects needs /*  /index.html  200 (Step 4)')
if (/^\/assets\/\*\s*\n\s+Cache-Control:[^\n]*immutable/m.test(read('shoreline-hq/public/_headers'))) say('OK', 'public/_headers: hashed files cached for a year')
else say('FIX', 'shoreline-hq/public/_headers needs the /assets/* Cache-Control rule (Step 4)')

// 4. GitHub and Netlify, as far as this folder can tell
if (isRepo) {
  const origin = git('remote', 'get-url', 'origin')
  if (origin) say('OK', `a remote named origin (${origin.includes('github.com') ? 'on GitHub' : 'not on GitHub'})`)
  else say('CHECK', 'no remote yet: create the repository on GitHub, then git remote add origin ... (Step 6)')
}
if (existsSync('shoreline-hq/.netlify/state.json')) say('OK', 'shoreline-hq is linked to a Netlify project')
else say('CHECK', 'shoreline-hq is not linked to a Netlify project yet: npx netlify-cli sites:create (Step 7)')

// 5. Optional: can this network reach what the deploy needs? (a filtered classroom network often cannot)
if (process.argv.includes('--online')) {
  for (const url of ['https://github.com', 'https://api.netlify.com', 'https://registry.npmjs.org', 'https://cdn.playwright.dev']) {
    try {
      const response = await fetch(url, { method: 'HEAD', signal: AbortSignal.timeout(8000) })
      say('OK', `this network reaches ${url} (${response.status})`)
    } catch {
      say('FIX', `this network does not reach ${url}: try your phone's mobile data (hotspot), or ask the venue`)
    }
  }
}

console.log(lines.join('\n'))
console.log(`
DO BY HAND (nothing here can check these):
  [ ] A GitHub account, and Git signed in to it (Git for Windows opens a browser; gh auth login; or a token)
  [ ] A Netlify account (sign up with GitHub), and npx netlify-cli login done on this computer
  [ ] The network test: github.com, app.netlify.com and registry.npmjs.org open on THIS network
  [ ] Your phone on mobile data (Wi-Fi off) opens a public site: that is how you will check the live link`)
const fix = lines.some((line) => line.startsWith('FIX'))
const check = lines.some((line) => line.startsWith('CHECK'))
console.log(fix ? '\nNOT READY: fix the FIX lines above, then run this check again'
  : check ? '\nREADY WITH NOTES: read the CHECK lines above' : '\nREADY for Lesson 10.2, Steps 6 and 7')
process.exitCode = fix ? 1 : 0
