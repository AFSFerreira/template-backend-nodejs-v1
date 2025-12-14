import type { CompressedImageInfo } from '@custom-types/services/compressed-image-info'
import type { SaveCompressedImage } from '@custom-types/services/save-compressed-image.'
import crypto from 'node:crypto'
import { createWriteStream } from 'node:fs'
import path from 'node:path'
import { pipeline } from 'node:stream/promises'
import { deleteFile } from '@utils/files/delete-file'
import sharp from 'sharp'

export async function saveCompressedImage({
  imageStream,
  folderPath,
  options = {
    dimensions: {
      width: 192,
      height: 192,
    },
    quality: 70,
  },
}: SaveCompressedImage): Promise<CompressedImageInfo> {
  const fileNameHash = crypto.randomBytes(10).toString('hex')
  const timestamp = Date.now()
  const finalName = `${fileNameHash}-${timestamp}.webp`

  const finalImagePath = path.resolve(folderPath, finalName)

  const sharpStream = sharp().resize(options.dimensions).webp({ quality: options.quality })

  const destinationStream = createWriteStream(finalImagePath)

  try {
    await pipeline(imageStream, sharpStream, destinationStream)
    return { finalImagePath, fileName: finalName, success: true }
  } catch (_error) {
    await deleteFile(finalImagePath)
    return { finalImagePath, fileName: finalName, success: false }
  } finally {
    destinationStream.close()
  }
}
