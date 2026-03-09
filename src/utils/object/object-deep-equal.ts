import type { UnknownRecord } from '@custom-types/utils/object/unknown-record'

/**
 * Compara dois valores de forma profunda (deep equality) sem dependências externas.
 *
 * Suporta objetos aninhados em qualquer profundidade. Utiliza comparação estrita (`===`)
 * para primitivos e comparação recursiva de chaves para objetos.
 *
 * **Limitações**: Não trata referências circulares, `Map`, `Set`, `Date` ou `RegExp`
 * como tipos especiais — estes são comparados apenas por suas chaves enumeráveis.
 *
 * @param a - Primeiro valor a comparar.
 * @param b - Segundo valor a comparar.
 * @returns `true` se os valores forem estruturalmente idênticos.
 *
 * @example
 * objectDeepEqual({ a: { b: 1 } }, { a: { b: 1 } })   // true
 * objectDeepEqual({ a: 1 }, { a: 2 })                 // false
 * objectDeepEqual([1, 2, 3], [1, 2, 3])               // true
 * objectDeepEqual(null, null)                         // true
 */
export function objectDeepEqual(a: unknown, b: unknown): boolean {
  if (a === b) {
    return true
  }

  if (typeof a !== 'object' || typeof b !== 'object' || a == null || b == null) {
    return false
  }

  const keysA = Object.keys(a as UnknownRecord)
  const keysB = Object.keys(b as UnknownRecord)

  if (keysA.length !== keysB.length) {
    return false
  }

  return keysA.every((key) => objectDeepEqual((a as UnknownRecord)[key], (b as UnknownRecord)[key]))
}
