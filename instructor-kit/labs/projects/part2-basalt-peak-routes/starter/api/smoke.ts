// Is the API running and answering as the brief says? Run it while `npm run api` runs in another terminal:
//
//   node api/smoke.ts                      (http://localhost:4400)
//   node api/smoke.ts http://localhost:4410
//
// It logs one route as Dana and retires it again, so the walls look the same afterwards.
const base = (process.argv[2] ?? 'http://localhost:4400').replace(/\/$/, '')

async function call(method: string, path: string, body?: unknown, token?: string) {
  const headers: Record<string, string> = {}
  if (body !== undefined) headers['Content-Type'] = 'application/json'
  if (token !== undefined) headers.Authorization = `Bearer ${token}`
  const response = await fetch(`${base}/api${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  })
  const data: unknown = await response.json()
  return { status: response.status, headers: response.headers, data }
}

function field(data: unknown, name: string): unknown {
  return typeof data === 'object' && data !== null && name in data ? (data as Record<string, unknown>)[name] : undefined
}

function list(data: unknown): unknown[] {
  return Array.isArray(data) ? data : []
}

let failed = false
function check(ok: boolean, line: string) {
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${line}`)
  if (!ok) failed = true
}

try {
  const walls = await call('GET', '/walls')
  check(walls.status === 200 && list(walls.data).length === 4,
    `GET /walls -> ${walls.status}, ${list(walls.data).length} walls: ${list(walls.data).map((w) => field(w, 'id')).join(', ')}`)
  const active = await call('GET', '/routes')
  check(active.status === 200, `GET /routes -> ${active.status}, ${list(active.data).length} active routes (X-Total-Count: ${active.headers.get('X-Total-Count')})`)
  const retired = await call('GET', '/routes?status=retired')
  check(retired.status === 200, `GET /routes?status=retired -> ${retired.status}, ${list(retired.data).length} retired routes`)
  const cave = await call('GET', '/routes?wall=the-cave&grade=V4')
  check(cave.status === 200, `GET /routes?wall=the-cave&grade=V4 -> ${cave.status}: ${list(cave.data).map((r) => field(r, 'name')).join(', ')}`)
  const missing = await call('GET', '/routes/r99')
  check(missing.status === 404, `GET /routes/r99 -> ${missing.status} ${field(missing.data, 'error')}`)
  const guest = await call('POST', '/routes', { name: 'Guest Route' })
  check(guest.status === 401, `POST /routes as a guest -> ${guest.status} ${field(guest.data, 'error')}`)
  const sam = await call('POST', '/auth/sign-in', { email: 'sam@basaltpeak.example', password: 'basalt-demo' })
  const samToken = String(field(sam.data, 'token'))
  check(sam.status === 200, `POST /auth/sign-in as Sam -> ${sam.status}, role ${field(field(sam.data, 'user'), 'role')}`)
  const staff = await call('POST', '/routes', { name: 'Staff Route' }, samToken)
  check(staff.status === 403, `POST /routes as staff -> ${staff.status} ${field(staff.data, 'error')}`)
  const dana = await call('POST', '/auth/sign-in', { email: 'dana@basaltpeak.example', password: 'basalt-demo' })
  const danaToken = String(field(dana.data, 'token'))
  check(dana.status === 200, `POST /auth/sign-in as Dana -> ${dana.status}, role ${field(field(dana.data, 'user'), 'role')}`)
  const bad = await call('POST', '/routes', { name: 'ab', wallId: 'the-moon' }, danaToken)
  check(bad.status === 400, `POST /routes with mistakes -> ${bad.status} ${field(bad.data, 'error')}: ${Object.keys(Object(field(bad.data, 'fieldErrors'))).join(', ')}`)
  const made = await call('POST', '/routes', { name: 'Smoke Test', wallId: 'the-prow', grade: 'V2', holdColor: 'blue' }, danaToken)
  check(made.status === 201, `POST /routes -> ${made.status}, "${field(made.data, 'name')}" on ${field(made.data, 'wallId')}, ${field(made.data, 'status')}, set by ${field(made.data, 'setter')}`)
  const gone = await call('PATCH', `/routes/${String(field(made.data, 'id'))}`, { status: 'retired' }, danaToken)
  check(gone.status === 200, `PATCH /routes/:id {"status":"retired"} -> ${gone.status}, ${field(gone.data, 'status')}`)
} catch (error) {
  console.log(`FAIL could not reach ${base}/api: is \`npm run api\` running? (${error instanceof Error ? error.message : String(error)})`)
  failed = true
}
console.log(failed ? 'Smoke test FAILED.' : 'Smoke test passed: the API answers as the brief says.')
process.exitCode = failed ? 1 : 0
