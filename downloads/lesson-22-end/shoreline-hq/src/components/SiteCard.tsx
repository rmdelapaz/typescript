import type { Site, Terrain } from '../api/types.ts'
import { Badge } from './Badge.tsx'
import { Card } from './Card.tsx'
import styles from './SiteCard.module.css'
import { SitePicture } from './SitePicture.tsx'

const terrainLabels: Record<Terrain, string> = {
  sand: 'Sandy beach',
  rocky: 'Rocky shore',
  marsh: 'Tidal marsh',
  mixed: 'Sand and rocks',
}

interface SiteCardProps {
  site: Site
}

export function SiteCard({ site }: SiteCardProps) {
  return (
    <Card title={site.name}>
      <SitePicture image={site.image} />
      <p className={styles.badges}>
        <Badge label={site.town} />
        <Badge label={terrainLabels[site.terrain]} />
        <Badge
          label={site.accessible ? 'Step-free route' : 'No step-free route'}
          tone={site.accessible ? 'success' : 'info'}
        />
      </p>
      <p>{site.description}</p>
      <p className={styles.parking}>Parking: {site.parking}</p>
    </Card>
  )
}
