import type { ImageInfo } from '@custom-types/services/files/image-info'
import type { ISaveAvifImage } from '@custom-types/services/files/save-avif-image'
import { createWriteStream } from 'node:fs'
import path from 'node:path'
import { pipeline } from 'node:stream/promises'
import { logError } from '@lib/logger/helpers/log-error'
import { DIRECTORY_NOT_FOUND_ERROR } from '@messages/loggings/file-loggings'
import { deleteFile } from '@utils/files/delete-file'
import { mapQualityToDimensions } from '@utils/mappers/map-ratio-and-quality-dimensions'
import { generateFileHash } from '@utils/tokens/generate-file-hash'
import fs from 'fs-extra'
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

  try {
    await fs.ensureDir(folderPath)
  } catch (error) {
    logError({ error, message: DIRECTORY_NOT_FOUND_ERROR })

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

  const destinationStream = createWriteStream(finalImagePath)

  const returnValue = { finalImagePath, filename }

  try {
    await pipeline(filePart.file, sharpStream, destinationStream)

    return { ...returnValue, success: true }
  } catch (_error) {
    await deleteFile(finalImagePath)

    return { ...returnValue, success: false }
  }
}
