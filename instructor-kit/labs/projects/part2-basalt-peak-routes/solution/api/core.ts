// The Basalt Peak routes API as one function: a web-standard Request in, a Response out.
// server.ts runs it with Node's http module; msw.ts runs the SAME code inside the tests.
// No dependencies, and only erasable TypeScript: Node 24 runs this file as it is.
import type {
  ApiErrorBody, ClimbRoute, DateString, ErrorCode, Grade, HoldColor, NewRoute, Role, Session, User, Wall, WallId,
} from './types.ts'

export interface ApiOptions {
  /** the day the sample data is built around ("YYYY-MM-DD"); default: today on this computer */
  today?: DateString
}

export const DEMO_PASSWORD = 'basalt-demo'

export const WALLS: Wall[] = [
  { id: 'the-slab', name: 'The Slab' },
  { id: 'the-cave', name: 'The Cave' },
  { id: 'the-prow', name: 'The Prow' },
  { id: 'kids-corner', name: "Kids' Corner" },
]
export const GRADES: Grade[] = ['V0', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7']
export const HOLD_COLORS: HoldColor[] = ['red', 'blue', 'green', 'yellow', 'purple', 'black']

interface Account extends User {
  email: string
}

const ACCOUNTS: Account[] = [
  { id: 'u1', name: 'Dana Okonkwo-Reyes', role: 'setter', email: 'dana@basaltpeak.example' },
  { id: 'u2', name: 'Sam Whitfield', role: 'staff', email: 'sam@basaltpeak.example' },
]
/** Tokens that always work, for tests: "Authorization: Bearer dev-setter" */
const DEV_TOKENS: Record<string, string> = { 'dev-setter': 'u1', 'dev-staff': 'u2' }

// [id, name, wall, grade, holds, setter, days before today, status]
type SeedRow = [string, string, WallId, Grade, HoldColor, string, number, ClimbRoute['status']]
const SEED: SeedRow[] = [
  ['r01', 'Morning Glory', 'the-slab', 'V1', 'green', 'Dana Okonkwo-Reyes', 3, 'active'],
  ['r02', 'Friction Addiction', 'the-slab', 'V3', 'blue', 'Jules Marchetti', 3, 'active'],
  ['r03', 'Glass Ceiling', 'the-slab', 'V5', 'purple', 'Dana Okonkwo-Reyes', 10, 'active'],
  ['r04', 'Smear Campaign', 'the-slab', 'V2', 'yellow', 'Priya Lindqvist', 24, 'retired'],
  ['r05', 'Bat Hang', 'the-cave', 'V4', 'red', 'Jules Marchetti', 4, 'active'],
  ['r06', 'Stalactite', 'the-cave', 'V6', 'black', 'Priya Lindqvist', 4, 'active'],
  ['r07', 'Cave Troll', 'the-cave', 'V2', 'green', 'Dana Okonkwo-Reyes', 11, 'active'],
  ['r08', 'Dripline', 'the-cave', 'V3', 'yellow', 'Jules Marchetti', 25, 'retired'],
  ['r09', 'Figurehead', 'the-prow', 'V5', 'blue', 'Priya Lindqvist', 5, 'active'],
  ['r10', "Crow's Nest", 'the-prow', 'V7', 'black', 'Dana Okonkwo-Reyes', 12, 'active'],
  ['r11', 'Plank Walk', 'the-prow', 'V4', 'red', 'Jules Marchetti', 26, 'retired'],
  ['r12', 'Ladybug Ladder', 'kids-corner', 'V0', 'yellow', 'Priya Lindqvist', 6, 'active'],
]

class HttpError extends Error {
  status: number
  code: ErrorCode
  fieldErrors: Record<string, string[]> | undefined
  constructor(status: number, code: ErrorCode, message: string, fieldErrors?: Record<string, string[]>) {
    super(message)
    this.status = status
    this.code = code
    this.fieldErrors = fieldErrors
  }
}

const LOCAL_ORIGIN = /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/

function localToday(): DateString {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function daysBefore(day: DateString, days: number): DateString {
  const d = new Date(`${day}T12:00:00Z`)
  d.setUTCDate(d.getUTCDate() - days)
  return d.toISOString().slice(0, 10)
}

const isWallId = (v: unknown): v is WallId => WALLS.some((w) => w.id === v)
const isGrade = (v: unknown): v is Grade => GRADES.some((g) => g === v)
const isHoldColor = (v: unknown): v is HoldColor => HOLD_COLORS.some((c) => c === v)

// Walls in the gym's order, then easiest first, then A to Z
function byWallGradeName(a: ClimbRoute, b: ClimbRoute): number {
  const wall = WALLS.findIndex((w) => w.id === a.wallId) - WALLS.findIndex((w) => w.id === b.wallId)
  const grade = GRADES.indexOf(a.grade) - GRADES.indexOf(b.grade)
  return wall || grade || a.name.localeCompare(b.name)
}

export function createApi(options: ApiOptions = {}) {
  const today = () => options.today ?? localToday()
  const seed = (): ClimbRoute[] =>
    SEED.map(([id, name, wallId, grade, holdColor, setter, ago, status]) => ({
      id, name, wallId, grade, holdColor, setter, setOn: daysBefore(today(), ago), status,
    }))
  let routes = seed()
  let sessions = new Map<string, string>(Object.entries(DEV_TOKENS))
  let counter = 0

  function json(status: number, data: unknown, headers: Record<string, string> = {}): Response {
    return new Response(JSON.stringify(data, null, 2), {
      status,
      headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...headers },
    })
  }

  function errorResponse(e: HttpError): Response {
    const body: ApiErrorBody = { error: e.code, message: e.message }
    if (e.fieldErrors) body.fieldErrors = e.fieldErrors
    return json(e.status, body)
  }

  async function readBody(request: Request): Promise<Record<string, unknown>> {
    let data: unknown
    try {
      data = await request.json()
    } catch {
      throw new HttpError(400, 'validation_failed', 'The request body must be JSON.')
    }
    if (typeof data !== 'object' || data === null || Array.isArray(data)) {
      throw new HttpError(400, 'validation_failed', 'The request body must be a JSON object.')
    }
    return data as Record<string, unknown>
  }

  function signedIn(request: Request): User | null {
    const m = /^Bearer\s+(\S+)$/i.exec(request.headers.get('authorization') ?? '')
    if (!m) return null
    const account = ACCOUNTS.find((a) => a.id === sessions.get(m[1] ?? ''))
    if (!account) throw new HttpError(401, 'unauthorized', 'Your session has ended. Sign in again.')
    return { id: account.id, name: account.name, role: account.role }
  }

  function requireRole(request: Request, role: Role): User {
    const user = signedIn(request)
    if (!user) throw new HttpError(401, 'unauthorized', 'Sign in first.')
    if (user.role !== role) throw new HttpError(403, 'forbidden', 'Only setters can log or retire routes.')
    return user
  }

  function findRoute(id: string): ClimbRoute {
    const route = routes.find((r) => r.id === id)
    if (!route) throw new HttpError(404, 'not_found', 'No route with that id.')
    return route
  }

  // ------------------------------------------------------------------------------------ the endpoints
  function listRoutes(url: URL): Response {
    const q = url.searchParams
    const wall = q.get('wall')
    const grade = q.get('grade')
    const status = q.get('status') ?? 'active'
    const fieldErrors: Record<string, string[]> = {}
    if (wall !== null && !isWallId(wall)) fieldErrors.wall = [`Unknown wall "${wall}".`]
    if (grade !== null && !isGrade(grade)) fieldErrors.grade = [`Unknown grade "${grade}": V0 to V7.`]
    if (!['active', 'retired', 'all'].includes(status)) fieldErrors.status = ['status must be active, retired or all.']
    if (Object.keys(fieldErrors).length) throw new HttpError(400, 'validation_failed', 'Some filters are not valid.', fieldErrors)
    const found = routes
      .filter((r) => (wall === null || r.wallId === wall) && (grade === null || r.grade === grade))
      .filter((r) => status === 'all' || r.status === status)
      .toSorted(byWallGradeName)
    return json(200, found, { 'X-Total-Count': String(found.length) })
  }

  async function signIn(request: Request): Promise<Response> {
    const body = await readBody(request)
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
    const password = typeof body.password === 'string' ? body.password : ''
    const fieldErrors: Record<string, string[]> = {}
    if (email === '') fieldErrors.email = ['Enter your email.']
    if (password === '') fieldErrors.password = ['Enter your password.']
    if (Object.keys(fieldErrors).length) throw new HttpError(400, 'validation_failed', 'Some fields need attention.', fieldErrors)
    const account = ACCOUNTS.find((a) => a.email === email)
    if (!account || password !== DEMO_PASSWORD) throw new HttpError(401, 'unauthorized', 'Email or password is incorrect.')
    const token = `bp-${account.id}-${++counter}`
    sessions.set(token, account.id)
    const session: Session = { token, user: { id: account.id, name: account.name, role: account.role } }
    return json(200, session)
  }

  async function logRoute(request: Request): Promise<Response> {
    const user = requireRole(request, 'setter')
    const body = await readBody(request)
    const name = typeof body.name === 'string' ? body.name.trim() : ''
    const fieldErrors: Record<string, string[]> = {}
    if (name.length < 3 || name.length > 40) fieldErrors.name = ['Name must be 3 to 40 characters.']
    if (!isWallId(body.wallId)) fieldErrors.wallId = ['Pick a wall.']
    if (!isGrade(body.grade)) fieldErrors.grade = ['Pick a grade from V0 to V7.']
    if (!isHoldColor(body.holdColor)) fieldErrors.holdColor = ['Pick a hold color.']
    if (Object.keys(fieldErrors).length || !isWallId(body.wallId) || !isGrade(body.grade) || !isHoldColor(body.holdColor)) {
      throw new HttpError(400, 'validation_failed', 'Some fields need attention.', fieldErrors)
    }
    const fields: NewRoute = { name, wallId: body.wallId, grade: body.grade, holdColor: body.holdColor }
    const id = `r${String(routes.length + 1).padStart(2, '0')}`
    const route: ClimbRoute = { id, ...fields, setter: user.name, setOn: today(), status: 'active' }
    routes = [...routes, route]
    return json(201, route, { Location: `/api/routes/${id}` })
  }

  async function changeRoute(request: Request, id: string): Promise<Response> {
    requireRole(request, 'setter')
    const route = findRoute(id)
    const body = await readBody(request)
    if (body.status !== 'retired') {
      throw new HttpError(400, 'validation_failed', 'Some fields need attention.', { status: ['status can only be "retired".'] })
    }
    const changed: ClimbRoute = { ...route, status: 'retired' }
    routes = routes.map((r) => (r.id === id ? changed : r))
    return json(200, changed)
  }

  async function answer(request: Request): Promise<Response> {
    const url = new URL(request.url)
    const path = url.pathname.replace(/\/$/, '')
    const method = request.method === 'HEAD' ? 'GET' : request.method
    if (method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Methods': 'GET, POST, PATCH, OPTIONS',
          'Access-Control-Allow-Headers': 'Authorization, Content-Type',
          'Access-Control-Max-Age': '600',
        },
      })
    }
    const one = /^\/api\/routes\/([^/]+)$/.exec(path)
    const allowed =
      path === '/api/walls' ? 'GET'
      : path === '/api/routes' ? 'GET, POST'
      : path === '/api/auth/sign-in' ? 'POST'
      : one ? 'GET, PATCH'
      : null
    if (allowed === null) throw new HttpError(404, 'not_found', `No API route for ${request.method} ${url.pathname}.`)
    if (!allowed.split(', ').includes(method)) {
      return json(405, { error: 'method_not_allowed', message: `Use ${allowed} for this address.` } satisfies ApiErrorBody, { Allow: allowed })
    }
    signedIn(request) // a token the API does not know is a 401 everywhere
    if (path === '/api/walls') return json(200, WALLS)
    if (path === '/api/auth/sign-in') return signIn(request)
    if (path === '/api/routes') return method === 'GET' ? listRoutes(url) : logRoute(request)
    const id = decodeURIComponent(one?.[1] ?? '')
    return method === 'GET' ? json(200, findRoute(id)) : changeRoute(request, id)
  }

  /** Answer one request (CORS headers on every answer to a page on localhost). */
  async function handle(request: Request): Promise<Response> {
    let res: Response
    try {
      res = await answer(request)
    } catch (err) {
      if (!(err instanceof HttpError)) console.error(err)
      res = errorResponse(err instanceof HttpError ? err : new HttpError(500, 'server_error', 'Something went wrong on the server.'))
    }
    const origin = request.headers.get('origin')
    res.headers.set('Vary', 'Origin')
    if (origin && LOCAL_ORIGIN.test(origin)) {
      res.headers.set('Access-Control-Allow-Origin', origin)
      res.headers.set('Access-Control-Expose-Headers', 'X-Total-Count, Location')
    }
    return res
  }

  /** Back to the sample data: no new routes, nobody signed in (the dev tokens still work). */
  function reset() {
    routes = seed()
    sessions = new Map(Object.entries(DEV_TOKENS))
    counter = 0
  }

  return { handle, reset }
}

export type BasaltPeakApi = ReturnType<typeof createApi>
