// Diagnostic practice (Session 1): JavaScript answers D1, D2 and D3 of your workbook's diagnostic.
// Each answer below has ONE small mistake. Run it, compare with the workbook, fix the line, run again.
//   node labs/module-01/l1_0-orientation/diagnostic_starter.mjs        (from your course folder)

// D1: arrays count from 0. Print how many sites there are and the FIRST one.
const sites = ['Driftwood Cove', 'North Jetty', 'Seal Rock Beach']
console.log('D1:', sites.length, sites[1])

// D2: objects inside objects. Print the NAME of the cleanup's site (text, not the whole object).
const cleanup = { title: 'Weekend Cove Cleanup', site: { name: 'Driftwood Cove', town: 'Port Marisol' } }
console.log('D2:', cleanup.site)

// D3: filter and map. Print the titles of the cleanups that still have spots left.
const events = [
  { title: 'Weekend Cove Cleanup', capacity: 18, spotsTaken: 18 },
  { title: 'Jetty Rocks Deep Clean', capacity: 10, spotsTaken: 9 },
  { title: 'Family Beach Morning', capacity: 40, spotsTaken: 16 },
]
console.log('D3:', events.filter((event) => event.spotsTaken >= event.capacity).map((event) => event.title))

// Expected when done:
// D1: 3 Driftwood Cove
// D2: Driftwood Cove
// D3: [ 'Jetty Rocks Deep Clean', 'Family Beach Morning' ]
