import type { ImageInfo } from '@custom-types/services/files/image-info'
import type { ISaveAvifImage } from '@custom-types/services/files/save-avif-image'
import { createWriteStream } from 'node:fs'
import path from 'node:path'
import { pipeline } from 'node:stream/promises'
import { FileSaveError } from '@use-cases/errors/generic/file-save-error'
import { deleteFile } from '@utils/files/delete-file'
import { fileExists } from '@utils/files/file-exists'
import { folderExists } from '@utils/files/folder-exists'
import { mapQualityToDimensions } from '@utils/mappers/map-ratio-and-quality-dimensions'
import { generateFileHash } from '@utils/tokens/generate-file-hash'
import sharp from 'sharp'

export async function saveAvifImage({
  filePart,
  newFilename,
  folderPath,
  options,
}: ISaveAvifImage): Promise<ImageInfo> {
  const filename = `${newFilename ?? generateFileHash()}.avif`
  const finalImagePath = path.resolve(folderPath, filename)

  const partialReturnData = { finalImagePath, filename }

  const fileAreadyExists = await fileExists(finalImagePath)

  // O arquivo já foi persistido anteriormente:
  if (fileAreadyExists) {
    return { ...partialReturnData, success: true }
  }

  const baseFolderExists = await folderExists(folderPath)
  if (!baseFolderExists) {
    return { ...partialReturnData, success: false }
  }

  const sharpStream = sharp()
    .resize({
      ...(options?.dimensions ? mapQualityToDimensions(options.dimensions) : {}),
      fit: 'fill',
      kernel: 'lanczos3',
    })
    .avif({
      effort: 3,
      quality: options?.specs?.quality ?? 80,
      chromaSubsampling: options?.specs?.chromaSubsampling ?? '4:4:4',
      lossless: false,
    })

  try {
    const destinationStream = createWriteStream(finalImagePath)

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
