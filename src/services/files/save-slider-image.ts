import type { ImageInfo } from '@custom-types/services/files/image-info'
import type { ISaveSliderImage } from '@custom-types/services/files/save-slider-image'
import path from 'node:path'
import { pipeline } from 'node:stream/promises'
import { logError } from '@lib/logger/helpers/log-error'
import { DIRECTORY_NOT_FOUND_ERROR } from '@messages/loggings/system/file-loggings'
import { FileSaveError } from '@use-cases/errors/generic/file-save-error'
import { deleteFile } from '@utils/files/delete-file'
import { fileExists } from '@utils/files/file-exists'
import { generateFileHash } from '@utils/hashes/generate-file-hash'
import { mapQualityToDimensions } from '@utils/mappers/map-ratio-and-quality-dimensions'
import { createWriteStream, ensureDir } from 'fs-extra'
import sharp from 'sharp'

export async function saveSliderImage({ filePart, folderPath, options }: ISaveSliderImage): Promise<ImageInfo> {
  const finalName = `${generateFileHash()}.avif`
  const finalImagePath = path.resolve(folderPath, finalName)

  const partialReturnData = { finalImagePath, filename: finalName }

  const fileAreadyExists = await fileExists(finalImagePath)

  try {
    await ensureDir(folderPath)
  } catch (error) {
    logError({ error, message: DIRECTORY_NOT_FOUND_ERROR })

    return { ...partialReturnData, success: false }
  }

  // O arquivo já foi persistido anteriormente:
  if (fileAreadyExists) {
    return { ...partialReturnData, success: true }
  }

  const { width, height } = mapQualityToDimensions(options)

  const sharpStream = sharp()
    .resize({
      width,
      height,
      fit: 'fill',
      kernel: 'lanczos3',
    })
    .avif({
      effort: 6,
      quality: 80,
      chromaSubsampling: '4:4:4',
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
