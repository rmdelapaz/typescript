import type { Site } from '../api/types.ts'

interface SitePictureProps {
  image: Site['image']
}

export function SitePicture({ image }: SitePictureProps) {
  return (
    <img
      className="site-picture"
      src={image.url}
      alt={image.alt}
      width={image.width}
      height={image.height}
      loading="lazy"
    />
  )
}
