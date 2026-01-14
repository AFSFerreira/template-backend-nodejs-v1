import type { MultipartFile } from '@fastify/multipart'
import type { AspectRatioType } from '../../custom/aspect-ratio'
import type { QualityType } from '../../custom/quality'

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
