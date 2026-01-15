import type { AspectRatioType } from '@custom-types/custom/aspect-ratio'
import type { QualityType } from '@custom-types/custom/quality'

export interface IMapQualityToDimensions {
  aspectRatio: AspectRatioType
  quality: QualityType
}

export interface DimensionsType {
  width: number
  height: number
}
