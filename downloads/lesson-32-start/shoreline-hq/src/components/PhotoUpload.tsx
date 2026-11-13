import { useMutation } from '@tanstack/react-query'
import { useState, type ChangeEvent } from 'react'
import { ApiError, describeError } from '../api/client.ts'
import { uploadPhotoMutation } from '../api/mutations.ts'
import { Button } from './Button.tsx'
import { FieldError } from './FieldError.tsx'
import formStyles from './Form.module.css'
import styles from './PhotoUpload.module.css'
import { VisuallyHidden } from './VisuallyHidden.tsx'

/** A photo the API has saved: its id goes into the report */
export interface UploadedPhoto {
  id: string
  url: string
  name: string
}

// What shoreline-api accepts (POST /api/photos answers 415 and 413 otherwise)
const photoTypes = ['image/jpeg', 'image/png', 'image/webp']
const maxBytes = 5 * 1024 * 1024

/** What is wrong with a chosen file, before anything is sent (null: nothing) */
function checkPhoto(file: File): string | null {
  if (!photoTypes.includes(file.type)) {
    return `${file.name} is not a JPEG, PNG or WebP image.`
  }
  if (file.size > maxBytes) {
    const megabytes = (file.size / 1024 / 1024).toFixed(1)
    return `${file.name} is ${megabytes} MB. Photos must be 5 MB or smaller.`
  }
  return null
}

interface PhotoUploadProps {
  photos: UploadedPhoto[]
  onUploaded: (photo: UploadedPhoto) => void
  onRemove: (id: string) => void
}

// Choose a photo, check it, upload it at once, and list what is uploaded
export function PhotoUpload({ photos, onUploaded, onRemove }: PhotoUploadProps) {
  const upload = useMutation(uploadPhotoMutation())
  const [problem, setProblem] = useState<string | null>(null)

  async function choose(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget
    const file = input.files?.[0]
    // Empty the box, so choosing the same file again still counts as a change
    input.value = ''
    if (file === undefined) return
    const tooBad = checkPhoto(file)
    setProblem(tooBad)
    if (tooBad !== null) return
    try {
      const photo = await upload.mutateAsync(file)
      onUploaded({ id: photo.id, url: photo.url, name: file.name })
    } catch (error: unknown) {
      // 413 and 415 come with a message written for people; anything else gets the usual sentence
      const refused = error instanceof ApiError && (error.status === 413 || error.status === 415)
      setProblem(`${file.name} was not uploaded. ${refused ? error.message : describeError(error)}`)
    }
  }

  return (
    <fieldset className={styles.photos}>
      <legend>Photos (optional)</legend>
      <div className={formStyles.field}>
        <label htmlFor="photo">Add a photo: JPEG, PNG or WebP, up to 5 MB</label>
        <input
          id="photo"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={choose}
          aria-invalid={problem !== null}
          aria-describedby={problem === null ? undefined : 'photo-error'}
        />
        <FieldError id="photo-error" messages={problem === null ? undefined : [problem]} />
      </div>
      <p role="status" className={styles.status}>
        {upload.isPending && `Uploading ${upload.variables.name}…`}
      </p>
      {photos.length > 0 && (
        <ul className={styles.list}>
          {photos.map((photo) => (
            <li key={photo.id}>
              {/* The file name beside it says which photo it is: the preview needs no alt text */}
              <img src={photo.url} alt="" width={96} height={72} />
              <span>{photo.name}</span>
              <Button variant="link" onClick={() => onRemove(photo.id)}>
                Remove{' '}<VisuallyHidden>{photo.name}</VisuallyHidden>
              </Button>
            </li>
          ))}
        </ul>
      )}
    </fieldset>
  )
}
