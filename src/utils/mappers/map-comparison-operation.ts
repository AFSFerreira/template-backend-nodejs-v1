import type { ComparableType } from '@custom-types/validator/orderable'
import { OPERATION_TO_SYMBOL_MAP } from '@constants/mappers'

export function mapComparisonOperation(operation: ComparableType) {
  return OPERATION_TO_SYMBOL_MAP.get(operation) ?? '='
}
