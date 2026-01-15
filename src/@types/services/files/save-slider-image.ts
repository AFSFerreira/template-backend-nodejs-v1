import type { Readable } from 'node:stream'
import type { AspectRatioType } from '../../custom/aspect-ratio'
import type { QualityType } from '../../custom/quality'

export interface ISaveSliderImage {
  imageStream: Readable
  folderPath: string
  options: {
    aspectRatio: AspectRatioType
    quality: QualityType
  }
}
