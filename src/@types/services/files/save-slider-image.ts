import type { MultipartFile } from '@fastify/multipart'
import type { AspectRatioType } from '../../custom/aspect-ratio'
import type { QualityType } from '../../custom/quality'

export interface ISaveSliderImage {
  filePart: MultipartFile
  folderPath: string
  options: {
    aspectRatio: AspectRatioType
    quality: QualityType
  }
}
