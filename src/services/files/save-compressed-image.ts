import type { CompressedImageInfo } from '@custom-types/services/files/compressed-image-info'
import type { SaveCompressedImage } from '@custom-types/services/files/save-compressed-image'
import path from 'node:path'
import { pipeline } from 'node:stream/promises'
import { FileSaveError } from '@use-cases/errors/generic/file-save-error'
import { CreateFileWriteSteam } from '@utils/files/create-file-write-steam'
import { deleteFile } from '@utils/files/delete-file'
import { fileExists } from '@utils/files/file-exists'
import { folderExists } from '@utils/files/folder-exists'
import { generateFileHash } from '@utils/tokens/generate-file-hash'
import sharp from 'sharp'

export async function saveCompressedImage({
  filePart,
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

  const partialReturnData = { finalImagePath, filename: finalName }

  const fileAreadyExists = await fileExists(finalImagePath)

  // O arquivo já foi persistido anteriormente:
  if (fileAreadyExists) {
    return { ...partialReturnData, success: true }
  }

  const baseFolderExists = await folderExists(folderPath)
  if (!baseFolderExists) {
    return { ...partialReturnData, success: false }
  }

  const sharpStream = sharp().resize(options.dimensions).webp({ quality: options.quality })

  try {
    const destinationStream = await CreateFileWriteSteam(finalImagePath)

    await pipeline(filePart.file, sharpStream, destinationStream)

    if (filePart.file.truncated) {
      throw new FileSaveError()
    }

    return { ...partialReturnData, success: true }
  } catch (_error) {
    await deleteFile(finalImagePath)

    return { ...partialReturnData, success: false }
  }
}
