import { useLoaderData } from 'react-router'

// /sites/:siteId: the router ran siteLoader before showing this page (Task 1)
export function SitePage() {
  // TODO 1: tell useLoaderData which loader it reads, useLoaderData<typeof siteLoader>() (import type), so that a
  // typo below becomes an error. Without the type argument, site is any.
  const site = useLoaderData()

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
