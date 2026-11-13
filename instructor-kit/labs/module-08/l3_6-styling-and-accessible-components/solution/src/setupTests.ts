import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// Testing Library removes what a test rendered only when Vitest runs with globals: do it here for every test
afterEach(() => cleanup())
