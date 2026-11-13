// Environment check for React + TypeScript: Build a Modern Web App (Session 1 of the instructor kit)
//
// Run it from your course folder (the one that holds shoreline-api and shoreline-hq), with the API running:
//   node labs/module-01/l1_0-orientation/check_environment.mjs
//   node labs/module-01/l1_0-orientation/check_environment.mjs http://localhost:4000    (another address)
// It changes nothing. Last line: READY, READY WITH NOTES, or NOT READY (then fix the FIX lines and run it again).
// Plain JavaScript on purpose: it must run, and explain the problem, even on a Node.js that is too old.

import { spawn, spawnSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import net from 'node:net'
import path from 'node:path'

const COURSE = 'React + TypeScript: Build a Modern Web App'
const folder = process.cwd()
const api = (process.argv[2] || 'http://localhost:4000').replace(/\/+$/, '').replace(/\/api$/, '')
const hq = path.join(folder, 'shoreline-hq')
const lines = []
const say = (kind, text) => lines.push(`${kind.padEnd(5)} ${text}`)

function run(cmd, args, cwd, shell = false) {      // shell: npm and code are .cmd scripts on Windows
  const r = spawnSync(cmd, args, { cwd, encoding: 'utf8', shell: shell && process.platform === 'win32', timeout: 120000 })
  return { ok: r.status === 0, out: `${r.stdout || ''}${r.stderr || ''}`, missing: Boolean(r.error) }
}

function binOf(pkg) {      // the JavaScript file behind a package's command (tsc, oxlint, vite)
  const dir = path.join(hq, 'node_modules', pkg)
  const json = JSON.parse(readFileSync(path.join(dir, 'package.json'), 'utf8'))
  const bin = typeof json.bin === 'string' ? json.bin : Object.values(json.bin)[0]
  return { file: path.join(dir, bin), version: json.version }
}

function reachable(url, ms = 3000) {      // a TCP connection first: a closed port answers at once (or times out)
  const { hostname, port } = new URL(url)
  return new Promise((resolve) => {
    const socket = net.connect({ host: hostname, port: Number(port) || 80 })
    const done = (why) => { socket.destroy(); resolve(why) }
    socket.setTimeout(ms, () => done('no answer (connection timed out)'))
    socket.on('connect', () => done(''))
    socket.on('error', (error) => done(error.code || error.message))
  })
}

async function getJson(url) {
  const response = await fetch(url)
  return { status: response.status, headers: response.headers, body: await response.json() }
}

function freePort() {
  return new Promise((resolve) => {
    const server = net.createServer()
    server.listen(0, '127.0.0.1', () => { const { port } = server.address(); server.close(() => resolve(port)) })
  })
}

async function devServerStarts(viteBin) {      // npm run dev, on a spare port, then stopped again
  const port = await freePort()
  const child = spawn(process.execPath, [viteBin, '--port', String(port), '--strictPort'], { cwd: hq, stdio: 'ignore' })
  try {
    for (let i = 0; i < 60; i++) {
      await new Promise((r) => setTimeout(r, 250))
      if (child.exitCode !== null) return false
      try {
        const response = await fetch(`http://localhost:${port}/`)
        if (response.ok && (await response.text()).includes('id="root"')) return true
      } catch { /* not listening yet */ }
    }
    return false
  } finally {
    child.kill()
  }
}

console.log(`Environment check for ${COURSE}`)
console.log(`Course folder: ${path.basename(folder)}`)

// 1. Node.js and npm
const major = Number(process.versions.node.split('.')[0])
if (major >= 24) say('OK', `Node.js ${process.version} (24 or newer)`)
else say('FIX', `Node.js ${process.version} is too old: install the current LTS (24 or newer) from nodejs.org, then open a NEW terminal`)
const npm = run('npm', ['--version'], folder, true)
if (npm.ok) say('OK', `npm ${npm.out.trim()}`)
else say('FIX', 'npm did not run: it comes with Node.js; reinstall the LTS and open a new terminal')

// 2. VS Code's command (optional) and the folder's location
const code = run('code', ['--version'], folder, true)
if (code.ok) say('OK', `VS Code ${code.out.trim().split('\n')[0]}`)
else say('CHECK', "no `code` command: fine, open folders from VS Code's File menu (macOS: Command Palette > Shell Command: Install 'code' command in PATH)")
if (/onedrive|icloud|dropbox|google drive/i.test(folder)) say('CHECK', 'this folder is synced to the cloud: move the course folder somewhere unsynced (npm gets slow, files get locked)')

// 3. The course folder: shoreline-api and shoreline-hq
const apiHere = existsSync(path.join(folder, 'shoreline-api', 'server.ts'))
if (apiHere) say('OK', 'shoreline-api is in the course folder')
else if (existsSync(path.join(folder, 'shoreline-api', 'shoreline-api', 'server.ts'))) say('FIX', 'shoreline-api/shoreline-api: your unzip tool added a folder level; move the inner shoreline-api up one level')
else say('FIX', 'no shoreline-api/server.ts here: run this from your course folder (cd into it), or unzip shoreline-api.zip into it')

let tools = null
if (!existsSync(path.join(hq, 'package.json'))) {
  say('FIX', 'no shoreline-hq here: in the course folder run  npm create vite@latest shoreline-hq -- --template react-ts  (Lesson 1.2)')
} else {
  const pkg = JSON.parse(readFileSync(path.join(hq, 'package.json'), 'utf8'))
  const deps = { ...pkg.dependencies, ...pkg.devDependencies }
  if (!deps.react || !deps.typescript || !deps.vite) {
    say('FIX', 'shoreline-hq is not a Vite react-ts project: create it again with --template react-ts')
  } else if (!existsSync(path.join(hq, 'node_modules', 'typescript', 'package.json'))) {
    say('FIX', 'shoreline-hq has no packages yet: cd shoreline-hq, then npm install')
  } else {
    tools = { tsc: binOf('typescript'), oxlint: binOf('oxlint'), vite: binOf('vite') }
    const react = JSON.parse(readFileSync(path.join(hq, 'node_modules', 'react', 'package.json'), 'utf8')).version
    say('OK', `shoreline-hq: React ${react}, TypeScript ${tools.tsc.version}, Vite ${tools.vite.version}, oxlint ${tools.oxlint.version}`)
  }
}

// 4. The API
const why = await reachable(api)
if (why) {
  say('FIX', `nothing answers at ${api} (${why}): start the API in its own terminal: cd shoreline-api, then node server.ts`)
} else {
  try {
    const health = await getJson(`${api}/api/health`)
    const meta = await getJson(`${api}/api/meta`)
    const events = await getJson(`${api}/api/events`)
    if (health.status !== 200 || !String(meta.body.tagline || '').includes('cleaner sands')) {
      say('FIX', `${api} answers, but it is not the Shoreline Crew API: check the address (the API prints it when it starts)`)
    } else {
      say('OK', `the API answers at ${api}/api: "${meta.body.tagline}", ${events.headers.get('x-total-count')} public cleanups`)
    }
  } catch (error) {
    say('FIX', `${api} answers, but not with the API's JSON (${error.message}): check the address and that node server.ts is running`)
  }
}

// 5. The checkers and the dev server (Lesson 1.2: running is not checking)
if (tools) {
  const tsc = run(process.execPath, [tools.tsc.file, '-b'], hq)
  if (tsc.ok) say('OK', 'tsc -b: no type errors')
  else {
    const first = tsc.out.split('\n').find((line) => line.includes('error TS')) || tsc.out.trim().split('\n')[0]
    say('FIX', `tsc -b found type errors; the first: ${first.trim()}`)
  }
  const lint = run(process.execPath, [tools.oxlint.file], hq)
  const found = (lint.out.match(/Found \d+ warnings? and \d+ errors?\./) || [''])[0]
  if (lint.ok && /Found 0 warnings and 0 errors/.test(found)) say('OK', `oxlint (npm run lint): ${found}`)
  else if (lint.ok) say('CHECK', `oxlint (npm run lint): ${found} Aim for 0 warnings (npm run lint shows where)`)
  else say('FIX', `oxlint (npm run lint) failed: ${found || lint.out.trim().split('\n')[0]}`)
  if (await devServerStarts(tools.vite.file)) say('OK', 'the dev server starts (npm run dev) and serves the app')
  else say('FIX', 'the dev server did not start: cd shoreline-hq, run npm run dev and read its message')
}

for (const line of lines) console.log(line)
const fixes = lines.filter((line) => line.startsWith('FIX')).length
const notes = lines.filter((line) => line.startsWith('CHECK')).length
if (fixes) {
  console.log('NOT READY: fix the FIX lines above, then run this check again')
  process.exitCode = 1
} else {
  console.log(`${notes ? 'READY WITH NOTES' : 'READY'} for ${COURSE}`)
}
