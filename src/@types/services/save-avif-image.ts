import type { MultipartFile } from '@fastify/multipart'
import type { AspectRatioType } from './aspect-ratio'
import type { QualityType } from './quality'

export interface ISaveAvifImage {
  filePart: MultipartFile
  newFilename?: string
  folderPath: string
  options?: {
    dimensions?: {
      aspectRatio: AspectRatioType
      quality: QualityType
    }
    specs?: {
      quality?: number
      chromaSubsampling?: '4:4:4' | '4:2:0'
    }
  }
}
