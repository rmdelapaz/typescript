// Shoreline Crew numbers (Lesson 2.1): inference where it can, annotations where it must

const crewName = 'Shoreline Crew'
const siteIds = [
  'pelican-point', 'driftwood-cove', 'sandpiper-flats',
  'north-jetty', 'otter-creek', 'long-strand',
]
const organizers = 3
let volunteers = 21

// Bags collected at the last three cleanups: empty at first, so it needs an annotation
const bagCounts: number[] = []
bagCounts.push(14, 9, 22)

function spotsLeft(capacity: number, taken: number) {
  return capacity - taken
}

function totalBags(counts: number[]) {
  return counts.reduce((sum, count) => sum + count, 0)
}

volunteers += 1 // a new volunteer joined today

// A value from outside the program: unknown until it has been checked
const savedCapacity: unknown = JSON.parse('12')

console.log(`${crewName}: ${organizers + volunteers} people, ${siteIds.length} sites`)
console.log(`Bags at the last three cleanups: ${totalBags(bagCounts)}`)

if (typeof savedCapacity === 'number') {
  console.log(`Tide Pool Morning Cleanup: ${spotsLeft(savedCapacity, 9)} spots left`)
} else {
  console.log('The saved capacity is not a number')
}
