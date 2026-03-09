import type { PixKeySetField } from '@custom-types/utils/guards/pix-key-set-field'

/**
 * Type guard que verifica se um valor desconhecido possui o campo `pixKey`
 * no formato de operação `set` do Prisma (`{ pixKey: { set: string } }`).
 *
 * Utilizado pela extensão de criptografia de pagamentos de encontros para detectar
 * atualizações parciais de chave Pix que precisam ser re-criptografadas.
 *
 * @param value - Valor a ser verificado.
 * @returns `true` se o valor possui `pixKey.set` como string.
 */
export function hasPixKeySet(value: unknown): value is Record<string, unknown> & PixKeySetField {
  if (typeof value !== 'object' || value === null) return false
  if (!('pixKey' in value)) return false

  const field = (value as Record<string, unknown>).pixKey

  return (
    typeof field === 'object' &&
    field !== null &&
    'set' in field &&
    typeof (field as Record<string, unknown>).set === 'string'
  )
}
