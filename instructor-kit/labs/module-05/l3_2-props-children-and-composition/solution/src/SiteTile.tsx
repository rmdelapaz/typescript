import type { Site } from './api/types.ts'
import { Panel } from './Panel.tsx'
import { Tag } from './Tag.tsx'

// Task 3a: a site's picture. It needs the picture object only, not the whole site.
export function SitePhoto({ image }: { image: Site['image'] }) {
  return (
    <img
      className="site-photo"
      src={image.url}
      alt={image.alt}
      width={image.width}
      height={image.height}
    />
  )
}

// Task 3b: small pieces composed: the Panel knows nothing about sites, the tile does
export function SiteTile({ site }: { site: Site }) {
  return (
    <Panel title={site.name}>
      <SitePhoto image={site.image} />
      <p>
        <Tag label={site.town} />{' '}
        <Tag
          label={site.accessible ? 'Step-free route' : 'No step-free route'}
          tone={site.accessible ? 'info' : 'warning'}
        />
      </p>
    </Panel>
  )
}
