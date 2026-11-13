// Diagnostic practice (Session 1): the reference answers to D1, D2 and D3 (instructor copy).

// D1: arrays count from 0, so the first item is [0]
const sites = ['Driftwood Cove', 'North Jetty', 'Seal Rock Beach']
console.log('D1:', sites.length, sites[0])

// D2: the site is an object; its name is one level down
const cleanup = { title: 'Weekend Cove Cleanup', site: { name: 'Driftwood Cove', town: 'Port Marisol' } }
console.log('D2:', cleanup.site.name)

// D3: keep the cleanups with spots left, then keep only their titles
const events = [
  { title: 'Weekend Cove Cleanup', capacity: 18, spotsTaken: 18 },
  { title: 'Jetty Rocks Deep Clean', capacity: 10, spotsTaken: 9 },
  { title: 'Family Beach Morning', capacity: 40, spotsTaken: 16 },
]
console.log('D3:', events.filter((event) => event.spotsTaken < event.capacity).map((event) => event.title))
