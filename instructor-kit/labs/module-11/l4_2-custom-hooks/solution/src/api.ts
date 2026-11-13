// Given (no task here): how many items GET <url> answers with, as a number
export async function fetchCount(url: string, signal?: AbortSignal): Promise<number> {
  const response = await fetch(url, { signal })
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  const items: unknown = await response.json()
  return Array.isArray(items) ? items.length : 0
}
