import type { Site } from '../api/types.ts'
import styles from './SitePicture.module.css'

interface SitePictureProps {
  image: Site['image']
}

export function SitePicture({ image }: SitePictureProps) {
  return (
    <img
      className={styles.picture}
      src={image.url}
      alt={image.alt}
      width={image.width}
      height={image.height}
      loading="lazy"
    />
  )
}
