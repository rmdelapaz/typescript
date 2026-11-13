// Task 2: braces hold expressions. npm run typecheck and the test both say what is wrong.
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
      <p>Based at {crew.home}</p>
      <p>TODO 2: "25 volunteers, 45 bags": numbers from crew, not typed by hand</p>
      <p>TODO 2: "Next cleanup: full" when spotsTaken has reached capacity, otherwise "Next cleanup: spots open"</p>
    </section>
  )
}
