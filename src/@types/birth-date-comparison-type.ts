import type { ComparableType } from './orderable-type'

export type BirthDateComparisonType =
  | { birthdate: Date; birthdateComparison: ComparableType }
  | { birthdate?: Date; birthdateComparison?: ComparableType }
