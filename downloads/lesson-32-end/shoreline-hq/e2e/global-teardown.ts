// Runs once after the last test: leave the beach as you found it. The API you develop against
// gets its sample data back instead of keeping whatever the tests created.
import { request } from '@playwright/test'
import { resetApi } from './helpers.ts'

export default async function globalTeardown(): Promise<void> {
  const api = await request.newContext()
  await resetApi(api)
  await api.dispose()
}
