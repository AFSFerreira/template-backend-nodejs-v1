/**
 * Type guard genérico que verifica se um valor é um objeto não-nulo e não-array.
 *
 * Útil para validar que um valor desconhecido é um `Record<string, unknown>` antes
 * de acessar suas propriedades com segurança.
 *
 * @param value - Valor a ser verificado.
 * @returns `true` se o valor for um objeto válido (exclui `null` e arrays).
 *
 * @example
 * hasKeys({ a: 1 })     // true
 * hasKeys([1, 2])       // false
 * hasKeys(null)         // false
 * hasKeys('string')     // false
 */
export function hasKeys(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}
