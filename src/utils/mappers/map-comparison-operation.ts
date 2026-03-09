import type { ComparableType } from '@custom-types/custom/orderable'
import { OPERATION_TO_SYMBOL_MAP } from '@constants/maps'

/**
 * Converte uma operação de comparação enumérica para seu símbolo SQL correspondente.
 *
 * @param operation - Tipo de operação de comparação (ex: `GREATER_THAN`, `LESS_THAN`).
 * @returns Símbolo da operação (ex: `'>'`, `'<'`). Retorna `'='` como fallback.
 *
 * @example
 * mapComparisonOperation('GREATER_THAN')          // '>'
 * mapComparisonOperation('LESS_THAN_OR_EQUAL')    // '<='
 */
export function mapComparisonOperation(operation: ComparableType) {
  return OPERATION_TO_SYMBOL_MAP.get(operation) ?? '='
}
