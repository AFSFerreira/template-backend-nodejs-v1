import type { ImageInfo } from '@custom-types/services/image-info'
import type { ISaveUpscaledImage } from '@custom-types/services/save-upscaled-image'
import { createWriteStream } from 'node:fs'
import path from 'node:path'
import { pipeline } from 'node:stream/promises'
import { deleteFile } from '@utils/files/delete-file'
import { mapQualityToDimensions } from '@utils/mappers/map-ratio-and-quality-dimensions'
import { generateFileHash } from '@utils/tokens/generate-file-hash'
import sharp from 'sharp'

export async function saveUpscaledImage({
  imageStream,
  folderPath,
  originalFilename,
  newFilename,
  options,
}: ISaveUpscaledImage): Promise<ImageInfo> {
  const finalName = (newFilename ?? generateFileHash()) + `${path.extname(originalFilename)}`
  const finalImagePath = path.resolve(folderPath, finalName)

  const { width, height } = mapQualityToDimensions(options)

  const sharpStream = sharp()
    .resize({
      width,
      height,
      fit: 'fill',
      kernel: 'lanczos3',
    })
    .png({
      adaptiveFiltering: true,
      // compressionLevel: 7,
      // effort: 8,
      // quality: 85,
    })

  const destinationStream = createWriteStream(finalImagePath)

  const returnValue = { finalImagePath, filename: finalName }

  try {
    await pipeline(imageStream, sharpStream, destinationStream)

    return { ...returnValue, success: true }
  } catch (_error) {
    await deleteFile(finalImagePath)

    return { ...returnValue, success: false }
  }
}
