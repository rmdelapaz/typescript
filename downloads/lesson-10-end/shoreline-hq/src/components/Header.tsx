import logoUrl from '../assets/logo.svg'

export function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="/">
        <img src={logoUrl} alt="" width={40} height={40} />
        <span>Shoreline Crew HQ</span>
      </a>
      <nav className="site-nav" aria-label="Main">
        <ul>
          <li><a href="/events">Events</a></li>
          <li><a href="/sites">Sites</a></li>
          <li><a href="/volunteers">Volunteers</a></li>
          <li><a href="/impact">Impact</a></li>
        </ul>
      </nav>
    </header>
  )
}
