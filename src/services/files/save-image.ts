import type { ImageInfo } from '@custom-types/services/image-info'
import type { SaveImageInput } from '@custom-types/services/save-image'
import crypto from 'node:crypto'
import { createWriteStream } from 'node:fs'
import path from 'node:path'
import { pipeline } from 'node:stream/promises'
import { deleteFile } from '@utils/files/delete-file'

export async function saveImage({ imageStream, folderPath, originalFilename }: SaveImageInput): Promise<ImageInfo> {
  const fileNameHash = crypto.randomBytes(10).toString('hex')
  const timestamp = Date.now()
  const fileName = `${fileNameHash}-${timestamp}${path.extname(originalFilename)}`

  const finalImagePath = path.resolve(folderPath, fileName)

  const destinationStream = createWriteStream(finalImagePath)

  try {
    await pipeline(imageStream, destinationStream)
    return { finalImagePath, fileName, success: true }
  } catch (_error) {
    await deleteFile(finalImagePath)
    return { finalImagePath, fileName, success: false }
  } finally {
    destinationStream.close()
  }
}
