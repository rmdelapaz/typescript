import { TIDE_SOURCE, TIDES } from './tideData.ts'

/** The next 14 tides, from two years of tables */
export function TideTables() {
  return (
    <section aria-labelledby="tides-heading">
      <h2 id="tides-heading">Tide tables</h2>
      <p>
        {TIDES.length} tides from {TIDE_SOURCE}.
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
            <th scope="col">Tide</th>
            <th scope="col">Height (m)</th>
          </tr>
        </thead>
        <tbody>
          {TIDES.slice(0, 14).map((tide) => (
            <tr key={`${tide.date} ${tide.time}`}>
              <td>{tide.date}</td>
              <td>{tide.time}</td>
              <td>{tide.kind}</td>
              <td>{tide.heightM}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
