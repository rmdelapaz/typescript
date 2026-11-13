import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { describe, expect, it, vi } from 'vitest'
import type { ApiErrorBody, Photo } from '../api/types.ts'
import { organizer } from '../test/factories.ts'
import { renderWithProviders } from '../test/render.tsx'
import { API_URL, recordRequests, server } from '../test/server.ts'
import { PhotoUpload } from './PhotoUpload.tsx'

// A tiny file with a name and a type: the API checks the type and the size, not the picture
function photoFile(name: string, type: string, bytes = 2048) {
  return new File([new Uint8Array(bytes)], name, { type })
}

// What POST /api/photos answers: the saved photo
const savedPhoto: Photo = {
  id: 'p1',
  url: `${API_URL}/api/photos/p1`,
  contentType: 'image/jpeg',
  bytes: 2048,
  uploadedBy: 'v01',
  createdAt: '2026-07-04T18:00:00.000Z',
}

// The props the form passes: vi.fn() records every call, so the test can check them
function renderUpload() {
  const onUploaded = vi.fn()
  const view = renderWithProviders(
    <PhotoUpload photos={[]} onUploaded={onUploaded} onRemove={vi.fn()} />,
    { session: organizer },
  )
  return { ...view, onUploaded, input: screen.getByLabelText(/^Add a photo/) }
}

describe('PhotoUpload', () => {
  it('uploads a JPEG as form data and hands the saved photo to the form', async () => {
    // jsdom's File cannot be read by the API's code in Node, so this answer is the test's own
    let contentType: string | null = null
    server.use(
      http.post(`${API_URL}/api/photos`, ({ request }) => {
        contentType = request.headers.get('Content-Type')
        return HttpResponse.json(savedPhoto, { status: 201 })
      }),
    )
    const { user, input, onUploaded } = renderUpload()

    await user.upload(input, photoFile('bags-at-the-stairs.jpg', 'image/jpeg'))

    await waitFor(() => expect(onUploaded).toHaveBeenCalledTimes(1))
    expect(onUploaded).toHaveBeenCalledWith({
      id: 'p1',
      url: savedPhoto.url,
      name: 'bags-at-the-stairs.jpg',
    })
    // fetch wrote the multipart header and its boundary (Lesson 8.2): the app did not
    expect(contentType).toMatch(/^multipart\/form-data; boundary=/)
  })

  it('refuses a GIF before sending anything', async () => {
    const { input, onUploaded } = renderUpload()
    const requests = recordRequests()
    // user-event skips files that do not match accept, like a file picker. Some pickers let
    // people choose "All files": applyAccept: false chooses it anyway.
    const user = userEvent.setup({ applyAccept: false })

    await user.upload(input, photoFile('crew-photo.gif', 'image/gif'))

    expect(screen.getByText('crew-photo.gif is not a JPEG, PNG or WebP image.')).toBeInTheDocument()
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(requests).toEqual([])
    expect(onUploaded).not.toHaveBeenCalled()
  })

  it.each([
    [413, 'payload_too_large', 'Photos must be 5 MB or smaller.'],
    [415, 'unsupported_media_type', 'Photos must be JPEG, PNG or WebP images.'],
  ] as const)('shows the message of a %i answer', async (status, error, message) => {
    // This test only: the API refuses every photo with this status
    server.use(
      http.post(`${API_URL}/api/photos`, () =>
        HttpResponse.json({ error, message } satisfies ApiErrorBody, { status }),
      ),
    )
    const { user, input, onUploaded } = renderUpload()

    await user.upload(input, photoFile('bags-at-the-stairs.jpg', 'image/jpeg'))

    expect(
      await screen.findByText(`bags-at-the-stairs.jpg was not uploaded. ${message}`),
    ).toBeInTheDocument()
    expect(onUploaded).not.toHaveBeenCalled()
  })
})
