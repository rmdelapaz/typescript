import { QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { queryClient } from './api/queries.ts'
import { routes } from './routes.tsx'

// The browser's router: the address bar decides which route is shown
const router = createBrowserRouter(routes)

export function App() {
  return (
    // The cache is outside everything else: every page shares it
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
