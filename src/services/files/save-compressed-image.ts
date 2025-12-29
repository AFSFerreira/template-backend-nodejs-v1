import type { CompressedImageInfo } from '@custom-types/services/compressed-image-info'
import type { SaveCompressedImage } from '@custom-types/services/save-compressed-image'
import { createWriteStream } from 'node:fs'
import path from 'node:path'
import { pipeline } from 'node:stream/promises'
import { deleteFile } from '@utils/files/delete-file'
import { generateFileHash } from '@utils/tokens/generate-file-hash'
import fs from 'fs-extra'
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
  const finalName = `${generateFileHash()}.webp`

  const finalImagePath = path.resolve(folderPath, finalName)

  const fileAreadyExists = await fs.exists(finalImagePath)

  const returnValue = { finalImagePath, filename: finalName }

  // O arquivo já foi persistido anteriormente:
  if (fileAreadyExists) {
    return { ...returnValue, success: true }
  }

  const sharpStream = sharp().resize(options.dimensions).webp({ quality: options.quality })

  const destinationStream = createWriteStream(finalImagePath)

  try {
    await pipeline(imageStream, sharpStream, destinationStream)

    return { ...returnValue, success: true }
  } catch (_error) {
    await deleteFile(finalImagePath)

    return { ...returnValue, success: false }
  }
}
