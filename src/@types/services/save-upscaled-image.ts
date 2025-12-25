import type { Readable } from 'node:stream'
import type { AspectRatioType } from './aspect-ratio'
import type { QualityType } from './quality'

export interface ISaveUpscaledImage {
  originalFilename: string
  newFilename?: string
  imageStream: Readable
  folderPath: string
  options: {
    aspectRatio: AspectRatioType
    quality: QualityType
  }
}
