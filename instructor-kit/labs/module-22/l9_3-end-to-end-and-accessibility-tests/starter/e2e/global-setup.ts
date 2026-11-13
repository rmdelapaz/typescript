// Before the first test: start the lab's site on port 4322; after the last one: stop it
import { startServer } from '../serve.ts'

export default async function globalSetup() {
  const server = await startServer(4322)
  return async () => {
    await new Promise<void>((resolve) => server.close(() => resolve()))
  }
}
