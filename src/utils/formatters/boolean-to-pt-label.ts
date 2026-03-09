/**
 * Converte um valor booleano para o rótulo em português (`sim` / `não`).
 *
 * Valores `null` e `undefined` são tratados como `false` (retorna `não`).
 * Utilizado em exportações e exibições formatadas para o usuário final.
 *
 * @param value - Valor booleano, `null` ou `undefined`.
 * @returns `'sim'` se truthy, `'não'` caso contrário.
 *
 * @example
 * booleanToPtLabel(true)      // 'sim'
 * booleanToPtLabel(false)     // 'não'
 * booleanToPtLabel(null)      // 'não'
 * booleanToPtLabel(undefined) // 'não'
 */
export function booleanToPtLabel(value: boolean | null | undefined): string {
  return value ? 'sim' : 'não'
}
