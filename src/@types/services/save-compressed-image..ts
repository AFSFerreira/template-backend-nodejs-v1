interface SaveCompressedImageOptions {
  dimensions: {
    width: number
    height: number
  }
  quality: number
}

export interface SaveCompressedImage {
  imageBuffer: Buffer
  folderPath: string
  options?: SaveCompressedImageOptions
}
