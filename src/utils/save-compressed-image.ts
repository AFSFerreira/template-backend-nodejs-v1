import fs from 'fs/promises'
import crypto from 'node:crypto'
import path from 'node:path'
import type { CompressedImageInfo } from '@custom-types/compressed-image-info-type'
import sharp from 'sharp'

interface SaveCompressedImageOptions {
  dimensions: {
    width: number
    height: number
  }
  quality: number
}

interface SaveCompressedImage {
  imageBuffer: Buffer
  folderPath: string
  options?: SaveCompressedImageOptions
}

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

  await fs.mkdir(folderPath, { recursive: true })

  await fs.writeFile(finalImagePath, compressedImageBuffer)

  return { finalImagePath, compressedImageBuffer }
}
