// Task 2 (reference solution): every value comes from crew, through braces
const crew = {
  name: 'Shoreline Crew',
  home: { beach: 'Driftwood Cove', town: 'Port Marisol' },
  volunteers: 25,
  bags: 45,
  capacity: 18,
  spotsTaken: 18,
}

export function CrewNumbers() {
  return (
    <section className="crew-numbers">
      <h2>{crew.name} in numbers</h2>
      <p>Based at {crew.home.beach}, {crew.home.town}</p>
      <p>{crew.volunteers} volunteers, {crew.bags} bags</p>
      <p>Next cleanup: {crew.spotsTaken >= crew.capacity ? 'full' : 'spots open'}</p>
    </section>
  )
}
