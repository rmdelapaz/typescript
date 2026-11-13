// The Gear Library demo API: MSW's service worker answers /api/* inside the visitor's browser (demo build only)
import { http, HttpResponse } from 'msw'
import { setupWorker } from 'msw/browser'

import { SAMPLE_GEAR } from './sampleGear.ts'

export async function startDemoApi(): Promise<void> {
  const worker = setupWorker(http.get('*/api/gear', () => HttpResponse.json(SAMPLE_GEAR)))
  await worker.start({ onUnhandledFrame: 'bypass', quiet: true })
  console.info('Gear Library demo API: sample data, reset on every reload')
}
