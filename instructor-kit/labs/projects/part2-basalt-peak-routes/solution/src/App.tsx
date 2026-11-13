import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { AuthProvider } from './auth/AuthProvider.tsx'
import { routes } from './routes.tsx'

// The browser's address bar drives the router. The tests use the SAME routes in a memory router.
const router = createBrowserRouter(routes)

export function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}
