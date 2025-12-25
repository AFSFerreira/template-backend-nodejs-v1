import type { ImageInfo } from '@custom-types/services/image-info'
import type { ISaveImageInput } from '@custom-types/services/save-image'
import { createWriteStream } from 'node:fs'
import path from 'node:path'
import { pipeline } from 'node:stream/promises'
import { logError } from '@lib/logger/helpers/log-error'
import { DIRECTORY_NOT_FOUND_ERROR } from '@messages/loggings/file-loggings'
import { deleteFile } from '@utils/files/delete-file'
import { generateFileHash } from '@utils/tokens/generate-file-hash'
import { ensureDir } from 'fs-extra'

export async function saveImage({ imageStream, folderPath, originalFilename }: ISaveImageInput): Promise<ImageInfo> {
  const filename = `${generateFileHash()}${path.extname(originalFilename)}`

  const finalImagePath = path.resolve(folderPath, filename)

  try {
    await ensureDir(folderPath)
  } catch (error) {
    logError({ error, message: DIRECTORY_NOT_FOUND_ERROR })
    return { finalImagePath, filename, success: false }
  }

  const destinationStream = createWriteStream(finalImagePath)

  try {
    await pipeline(imageStream, destinationStream)
    return { finalImagePath, filename, success: true }
  } catch (_error) {
    await deleteFile(finalImagePath)
    return { finalImagePath, filename, success: false }
  }
}
