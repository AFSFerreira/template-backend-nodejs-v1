import type { AspectRatioType } from '@custom-types/services/aspect-ratio'
import type { QualityType } from '@custom-types/services/quality'

export interface IMapQualityToDimensions {
  aspectRatio: AspectRatioType
  quality: QualityType
}

export interface DimensionsType {
  width: number
  height: number
}
