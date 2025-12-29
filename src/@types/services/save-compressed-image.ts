import type { Readable } from 'node:stream'

interface SaveCompressedImageOptions {
  dimensions: {
    width: number
    height: number
  }
  quality: number
}

export interface SaveCompressedImage {
  imageStream: Readable
  folderPath: string
  options?: SaveCompressedImageOptions
}
