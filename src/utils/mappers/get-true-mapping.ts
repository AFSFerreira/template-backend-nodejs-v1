import type { IGetTrueMapping } from '@custom-types/utils/mappers/get-true-mapping'

/**
 * Retorna o primeiro valor de um array de mapeamentos cuja expressão booleana seja `true`.
 *
 * Similar a uma cadeia de `if/else if`, mas de forma declarativa. Percorre os itens
 * na ordem e retorna o `value` correspondente à primeira `expression` truthy.
 *
 * @typeParam T - Tipo do valor retornado.
 * @param values - Array de objetos com `expression` (booleana) e `value`.
 * @returns O primeiro `value` cuja `expression` for truthy, ou `null` se nenhum combinar.
 *
 * @example
 * getTrueMapping([
 *   { expression: false, value: 'a' },
 *   { expression: true,  value: 'b' },
 *   { expression: true,  value: 'c' },
 * ]) // 'b'
 *
 * getTrueMapping([{ expression: false, value: 'x' }]) // null
 */
export function getTrueMapping<T>(values: IGetTrueMapping<T>): T | null {
  for (const { expression, value } of values) {
    if (expression) return value
  }
  return null
}
