import type { ComparableType } from './orderable-type'

export type AstrobiologyOrRelatedStartYearType =
  | {
      astrobiologyOrRelatedStartYear: number
      astrobiologyOrRelatedStartYearComparison: ComparableType
    }
  | {
      astrobiologyOrRelatedStartYear?: number
      astrobiologyOrRelatedStartYearComparison?: ComparableType
    }
