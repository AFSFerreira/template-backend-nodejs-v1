import type { MultipartFile } from '@fastify/multipart'

interface SaveCompressedImageOptions {
  dimensions: {
    width: number
    height: number
  }
  quality: number
}

export interface SaveCompressedImage {
  filePart: MultipartFile
  folderPath: string
  options?: SaveCompressedImageOptions
}
