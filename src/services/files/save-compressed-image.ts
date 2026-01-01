import type { CompressedImageInfo } from '@custom-types/services/compressed-image-info'
import type { SaveCompressedImage } from '@custom-types/services/save-compressed-image'
import path from 'node:path'
import { pipeline } from 'node:stream/promises'
import { CreateFileWriteSteam } from '@utils/files/create-file-write-steam'
import { deleteFile } from '@utils/files/delete-file'
import { fileExists } from '@utils/files/file-exists'
import { generateFileHash } from '@utils/tokens/generate-file-hash'
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
  const returnValue = { finalImagePath, filename: finalName }

  const fileAreadyExists = await fileExists(finalImagePath)

  // O arquivo já foi persistido anteriormente:
  if (fileAreadyExists) {
    return { ...returnValue, success: true }
  }

  const sharpStream = sharp().resize(options.dimensions).webp({ quality: options.quality })

  const destinationStream = await CreateFileWriteSteam(finalImagePath)

  if (!destinationStream) {
    return { ...returnValue, success: false }
  }

  try {
    await pipeline(imageStream, sharpStream, destinationStream)

    return { ...returnValue, success: true }
  } catch (_error) {
    await deleteFile(finalImagePath)

    return { ...returnValue, success: false }
  }
}
