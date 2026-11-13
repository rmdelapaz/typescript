// Task 1 (reference solution): the handout's HTML as TSX

export function TideRules() {
  return (
    <section className="rules-card" aria-labelledby="rules-title">
      {/* Tide-pool rules */}
      <h2 id="rules-title">Tide-pool rules</h2>
      <img src="/icons/tide.svg" alt="" width="32" height="32" />
      <ol>
        <li>Step only on bare rock.</li>
        <li>Look, then put every stone back.</li>
        <li>Leave shells and animals where they are.</li>
      </ol>
      <label htmlFor="agree">
        <input id="agree" type="checkbox" tabIndex={0} /> I read the rules
      </label>
    </section>
  )
}
