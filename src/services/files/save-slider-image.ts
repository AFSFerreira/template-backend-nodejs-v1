import type { ImageInfo } from '@custom-types/services/files/image-info'
import type { ISaveSliderImage } from '@custom-types/services/files/save-slider-image'
import path from 'node:path'
import { pipeline } from 'node:stream/promises'
import { FileSaveError } from '@use-cases/errors/generic/file-save-error'
import { deleteFile } from '@utils/files/delete-file'
import { fileExists } from '@utils/files/file-exists'
import { folderExists } from '@utils/files/folder-exists'
import { mapQualityToDimensions } from '@utils/mappers/map-ratio-and-quality-dimensions'
import { generateFileHash } from '@utils/tokens/generate-file-hash'
import { createWriteStream } from 'fs-extra'
import sharp from 'sharp'

export async function saveSliderImage({ filePart, folderPath, options }: ISaveSliderImage): Promise<ImageInfo> {
  const finalName = `${generateFileHash()}.avif`
  const finalImagePath = path.resolve(folderPath, finalName)

  const partialReturnData = { finalImagePath, filename: finalName }

  const fileAreadyExists = await fileExists(finalImagePath)

  const baseFolderExists = await folderExists(folderPath)
  if (!baseFolderExists) {
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
