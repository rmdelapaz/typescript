// The Basalt Peak routes API on your computer. No dependencies: Node 24 or newer runs this TypeScript file.
//
//   npm run api                            http://localhost:4400/api  (the same as: node api/server.ts)
//   node api/server.ts --port=4410         another port (then set VITE_API_URL in .env.local to match)
//   node api/server.ts --quiet             no line per request
//
// The data lives in memory: stop and start the server to get the sample routes back.
import { createServer } from 'node:http'
import { createApi, DEMO_PASSWORD } from './core.ts'

function flag(name: string): string | undefined {
  const hit = process.argv.slice(2).find((a) => a === `--${name}` || a.startsWith(`--${name}=`))
  if (hit === undefined) return undefined
  return hit.includes('=') ? hit.slice(hit.indexOf('=') + 1) : ''
}

function fail(message: string): never {
  console.error(`basalt-peak-api: ${message}`)
  process.exit(1)
}

for (const a of process.argv.slice(2)) {
  const name = a.replace(/^--/, '').split('=')[0] ?? ''
  if (!a.startsWith('--') || !['port', 'quiet'].includes(name)) fail(`unknown option ${a} (options: --port=4400 --quiet)`)
}
const port = Number(flag('port') || 4400)
if (!Number.isInteger(port) || port < 1 || port > 65535) fail('--port must be a number from 1 to 65535')
const quiet = flag('quiet') !== undefined
const api = createApi()

const server = createServer(async (req, res) => {
  const started = performance.now()
  const chunks: Buffer[] = []
  for await (const chunk of req) chunks.push(chunk as Buffer)
  const headers = new Headers()
  for (const [k, v] of Object.entries(req.headers)) {
    if (v !== undefined) headers.set(k, Array.isArray(v) ? v.join(', ') : v)
  }
  const method = req.method ?? 'GET'
  const request = new Request(`http://localhost:${port}${req.url ?? '/'}`, {
    method,
    headers,
    body: method === 'GET' || method === 'HEAD' || chunks.length === 0 ? null : Buffer.concat(chunks),
  })
  const response = await api.handle(request)
  res.writeHead(response.status, Object.fromEntries(response.headers))
  res.end(method === 'HEAD' ? undefined : Buffer.from(await response.arrayBuffer()))
  if (!quiet) console.log(`${method} ${req.url} ${response.status} ${Math.round(performance.now() - started)} ms`)
})

server.on('error', (err: Error & { code?: string }) => {
  if (err.code === 'EADDRINUSE') fail(`port ${port} is already in use. Is the API already running in another terminal?`)
  fail(err.message)
})

server.listen(port, 'localhost', () => {
  console.log(`Basalt Peak API running at http://localhost:${port}/api`)
  console.log(`  sign in as dana@basaltpeak.example (setter) or sam@basaltpeak.example (staff), password ${DEMO_PASSWORD}`)
  console.log('Press Ctrl+C to stop.')
})
