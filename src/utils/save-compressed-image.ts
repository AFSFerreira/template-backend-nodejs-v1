import fs from 'fs/promises'
import crypto from 'node:crypto'
import path from 'node:path'
import sharp from 'sharp'

export interface CompressedImageInfo {
  finalImagePath: string
  compressedImageBuffer: Buffer<ArrayBufferLike>
}

export async function saveCompressedImage(
  imageBuffer: Buffer,
  folderPath: string,
  options = {
    dimensions: {
      width: 192,
      height: 192,
    },
    quality: 70,
  },
): Promise<CompressedImageInfo> {
  const fileNameHash = crypto.randomBytes(10).toString('hex')
  const timestamp = Date.now()
  const finalName = `${fileNameHash}-${timestamp}.webp`

  const finalImagePath = path.resolve(folderPath, finalName)

  const compressedImageBuffer = await sharp(imageBuffer)
    .resize(options.dimensions)
    .webp({ quality: options.quality })
    .toBuffer()

  await fs.writeFile(finalImagePath, compressedImageBuffer)

  return { finalImagePath, compressedImageBuffer }
}
