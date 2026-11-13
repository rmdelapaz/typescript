import type { ApiErrorBody, CrewMember, Session, Site } from './types.ts'

// Real answers of shoreline-api, saved once: MSW sends them back in the tests. Do not edit.
export const sites: Site[] = [
  { id: 'pelican-point', name: 'Pelican Point Beach', town: 'Port Marisol', terrain: 'sand', parking: 'Free lot at the end of Pelican Point Road (40 spaces).', description: 'A long sandy beach below the bluffs. Busy in summer, so food wrappers and bottle caps pile up near the stairs.' },
  { id: 'driftwood-cove', name: 'Driftwood Cove', town: 'Port Marisol', terrain: 'mixed', parking: 'Street parking on Cove Lane; arrive early.', description: 'A small cove where winter storms leave driftwood, rope and fishing gear tangled at the tide line.' },
  { id: 'sandpiper-flats', name: 'Sandpiper Flats', town: 'Calder Bay', terrain: 'marsh', parking: 'Visitor center lot (free) with a boardwalk to the meeting point.', description: 'Tidal marsh and mudflats. Stay on the boardwalk and marked paths: the birds nest here in spring.' },
  { id: 'north-jetty', name: 'North Jetty', town: 'Calder Bay', terrain: 'rocky', parking: 'Harbor lot B (pay at the machine, free before 9:00).', description: 'Rocks along the harbor mouth. Lots of fishing line and lures; gloves and sturdy shoes required.' },
  { id: 'otter-creek', name: 'Otter Creek Mouth', town: 'Seal Rock', terrain: 'mixed', parking: 'Gravel pull-out on Highway 1 (12 spaces).', description: 'Where the creek meets the ocean. Trash washes down after rain and collects in the willows.' },
  { id: 'long-strand', name: 'Long Strand Beach', town: 'Seal Rock', terrain: 'sand', parking: 'State beach lot (day-use fee; the crew covers it for volunteers).', description: 'Three miles of open beach with a paved path along the dunes. Our biggest cleanups happen here.' },
]

export const crew: CrewMember[] = [
  { id: 'v20', name: 'Aisha Rahman', role: 'volunteer', skills: ['data-recording'] },
  { id: 'v05', name: 'Amara Diallo', role: 'volunteer', skills: ['first-aid', 'heavy-lifting'] },
  { id: 'v21', name: 'Ben Kowalski', role: 'volunteer', skills: [] },
  { id: 'v18', name: 'Chloe Dubois', role: 'volunteer', skills: [] },
  { id: 'v19', name: 'Diego Herrera', role: 'volunteer', skills: ['boat-handling'] },
  { id: 'v12', name: 'Elena Vasquez', role: 'volunteer', skills: ['team-lead'] },
  { id: 'v06', name: 'Grace Whitaker', role: 'volunteer', skills: ['data-recording'] },
  { id: 'v03', name: 'Hannah Becker', role: 'organizer', skills: ['data-recording', 'team-lead'] },
  { id: 'v08', name: 'Ines Moreau', role: 'volunteer', skills: ['photography', 'data-recording'] },
  { id: 'v15', name: 'Jonah Fairweather', role: 'volunteer', skills: ['heavy-lifting'] },
  { id: 'v09', name: 'Kwame Asante', role: 'volunteer', skills: ['boat-handling', 'heavy-lifting'] },
  { id: 'v16', name: 'Lily Tran', role: 'volunteer', skills: ['photography'] },
  { id: 'v02', name: 'Luis Romero', role: 'organizer', skills: ['team-lead', 'boat-handling'] },
  { id: 'v07', name: 'Mateo Silva', role: 'volunteer', skills: ['heavy-lifting'] },
  { id: 'v01', name: 'Maya Okafor', role: 'organizer', skills: ['team-lead', 'first-aid'] },
  { id: 'v22', name: 'Mia Johansson', role: 'volunteer', skills: ['photography'] },
  { id: 'v14', name: 'Noor Haddad', role: 'volunteer', skills: ['data-recording'] },
  { id: 'v13', name: 'Oliver Grant', role: 'volunteer', skills: [] },
  { id: 'v11', name: 'Ravi Patel', role: 'volunteer', skills: ['first-aid'] },
  { id: 'v17', name: 'Samuel Osei', role: 'volunteer', skills: ['first-aid', 'team-lead'] },
  { id: 'v10', name: 'Sofia Lindgren', role: 'volunteer', skills: [] },
  { id: 'v23', name: 'Tariq Mensah', role: 'volunteer', skills: ['heavy-lifting'] },
  { id: 'v04', name: 'Theo Nakamura', role: 'volunteer', skills: ['photography'] },
  { id: 'v24', name: 'Zoe Castillo', role: 'volunteer', skills: [] },
]

export const maya: Session = { token: 'st_mwfe0bhl1_v01', user: { id: 'v01', name: 'Maya Okafor', email: 'maya.okafor@example.com', role: 'organizer' } }
export const theo: Session = { token: 'st_mwfe0bhm2_v04', user: { id: 'v04', name: 'Theo Nakamura', email: 'theo.nakamura@example.com', role: 'volunteer' } }

export const siteNotFound: ApiErrorBody = { error: 'not_found', message: 'No site with that id.' }
export const crewNoToken: ApiErrorBody = { error: 'unauthorized', message: 'Sign in first.' }
export const crewForbidden: ApiErrorBody = { error: 'forbidden', message: 'Only organizers can do that.' }
export const signInRefused: ApiErrorBody = { error: 'unauthorized', message: 'Email or password is incorrect.' }
export const signInIncomplete: ApiErrorBody = { error: 'validation_failed', message: 'Some fields need attention.', fieldErrors: { email: ['Enter an email address.'], password: ['Enter your password.'] } }
