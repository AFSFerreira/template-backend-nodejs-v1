import type { ImageInfo } from '@custom-types/services/image-info'
import type { ISaveSliderImage } from '@custom-types/services/save-slider-image'
import { createWriteStream } from 'node:fs'
import path from 'node:path'
import { pipeline } from 'node:stream/promises'
import { deleteFile } from '@utils/files/delete-file'
import { mapQualityToDimensions } from '@utils/mappers/map-ratio-and-quality-dimensions'
import { generateFileHash } from '@utils/tokens/generate-file-hash'
import sharp from 'sharp'

export async function saveSliderImage({
  imageStream,
  folderPath,
  newFilename,
  options,
}: ISaveSliderImage): Promise<ImageInfo> {
  const finalName = (newFilename ?? generateFileHash()) + '.avif'
  const finalImagePath = path.resolve(folderPath, finalName)

  const { width, height } = mapQualityToDimensions(options)

  const sharpStream = sharp()
    .resize({
      width,
      height,
      fit: 'fill',
      kernel: 'lanczos3',
    })
    .avif({
      effort: 2,
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
