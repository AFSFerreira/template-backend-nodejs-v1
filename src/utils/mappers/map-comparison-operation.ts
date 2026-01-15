import type { ComparableType } from '@custom-types/custom/orderable'
import { OPERATION_TO_SYMBOL_MAP } from '@constants/maps'

export function mapComparisonOperation(operation: ComparableType) {
  return OPERATION_TO_SYMBOL_MAP.get(operation) ?? '='
}
