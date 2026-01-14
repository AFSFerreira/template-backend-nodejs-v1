import type { ImageInfo } from '@custom-types/services/files/image-info'
import type { ISaveSliderImage } from '@custom-types/services/files/save-slider-image'
import path from 'node:path'
import { pipeline } from 'node:stream/promises'
import { deleteFile } from '@utils/files/delete-file'
import { mapQualityToDimensions } from '@utils/mappers/map-ratio-and-quality-dimensions'
import { generateFileHash } from '@utils/tokens/generate-file-hash'
import { createWriteStream } from 'fs-extra'
import sharp from 'sharp'

export async function saveSliderImage({ imageStream, folderPath, options }: ISaveSliderImage): Promise<ImageInfo> {
  const finalName = `${generateFileHash()}.avif`
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
      effort: 6,
      quality: 80,
      chromaSubsampling: '4:4:4',
      lossless: false,
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
