import { useLoaderData } from 'react-router'
import type { siteLoader } from './loaders.ts'

// /sites/:siteId: the router ran siteLoader before showing this page (Task 1)
export function SitePage() {
  // The loader's type tells useLoaderData what it returns: a Site, never undefined, never any
  const site = useLoaderData<typeof siteLoader>()

  return (
    <>
      <h1>{site.name}</h1>
      <p>
        {site.town} · {site.terrain}
      </p>
      <p>{site.parking}</p>
    </>
  )
}
