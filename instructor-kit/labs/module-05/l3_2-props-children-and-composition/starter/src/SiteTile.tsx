import type { Site } from './api/types.ts'
import { Panel } from './Panel.tsx'

// Task 3a: a site's picture. It needs the picture object only, not the whole site.
// TODO 3: type the prop as "the type of the image property of Site", then draw an <img> with the
// picture's url, alt, width and height.
export function SitePhoto({ image }: { image: unknown }) {
  return <p>TODO 3: a picture ({typeof image})</p>
}

// Task 3b: a Panel titled with the site's name, holding its SitePhoto, a Tag with its town, and a Tag that
// says 'Step-free route' (default tone) or 'No step-free route' (warning tone).
export function SiteTile({ site }: { site: Site }) {
  return <Panel title={site.name}>TODO 3: {site.town}</Panel>
}
