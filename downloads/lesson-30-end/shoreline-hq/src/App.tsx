import { QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { queryClient } from './api/queries.ts'
import { AuthProvider } from './auth/AuthProvider.tsx'
import { routes } from './routes.tsx'

// The browser's router: the address bar decides which of the HQ's routes is shown
const router = createBrowserRouter(routes)

export function App() {
  return (
    // The cache is outside everything else: every page and loader shares it
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  )
}
