import crypto from 'node:crypto'
import path from 'node:path'
import type { CompressedImageInfo } from '@custom-types/custom/compressed-image-info-type'
import type { SaveCompressedImage } from '@custom-types/services/save-compressed-image.'
import fs from 'fs-extra'
import sharp from 'sharp'

export async function saveCompressedImage({
  imageBuffer,
  folderPath,
  options = {
    dimensions: {
      width: 192,
      height: 192,
    },
    quality: 70,
  },
}: SaveCompressedImage): Promise<CompressedImageInfo> {
  const fileNameHash = crypto.randomBytes(10).toString('hex')
  const timestamp = Date.now()
  const finalName = `${fileNameHash}-${timestamp}.webp`

  const finalImagePath = path.resolve(folderPath, finalName)

  const compressedImageBuffer = await sharp(imageBuffer)
    .resize(options.dimensions)
    .webp({ quality: options.quality })
    .toBuffer()

  await fs.outputFile(finalImagePath, compressedImageBuffer)

  return { finalImagePath, compressedImageBuffer }
}
