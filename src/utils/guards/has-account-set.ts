import type { AccountSetField } from '@custom-types/utils/guards/account-set-field'

/**
 * Type guard que verifica se um valor desconhecido possui o campo `account` no formato
 * de operação `set` do Prisma (`{ account: { set: string } }`).
 *
 * Utilizado pelas extensões de criptografia do Prisma para detectar se um payload de
 * `update` ou `upsert` contém o campo `account` em formato de atualização parcial,
 * permitindo criptografar o valor antes de persistir.
 *
 * @param value - Valor a ser verificado.
 * @returns `true` se o valor possui `account.set` como string.
 */
export function hasAccountSet(value: unknown): value is Record<string, unknown> & AccountSetField {
  if (typeof value !== 'object' || value === null) return false
  if (!('account' in value)) return false

  const field = (value as Record<string, unknown>).account

  return (
    typeof field === 'object' &&
    field !== null &&
    'set' in field &&
    typeof (field as Record<string, unknown>).set === 'string'
  )
}
