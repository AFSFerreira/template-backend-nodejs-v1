import type { IGetTrueMapping } from '@custom-types/utils/mappers/get-true-mapping'

export function getTrueMapping<T>(values: IGetTrueMapping<T>): T | null {
  for (const { expression, value } of values) {
    if (expression) return value
  }
  return null
}
