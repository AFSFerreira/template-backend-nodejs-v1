import type { IdentityDocumentSetField } from '@custom-types/utils/guards/identity-document-set-field'

/**
 * Type guard que verifica se um valor desconhecido possui o campo `identityDocument`
 * no formato de operação `set` do Prisma (`{ identityDocument: { set: string } }`).
 *
 * Utilizado pela extensão de criptografia de usuários para detectar atualizações
 * parciais de documento de identidade que precisam ser re-criptografadas.
 *
 * @param value - Valor a ser verificado.
 * @returns `true` se o valor possui `identityDocument.set` como string.
 */
export function hasIdentityDocumentSet(value: unknown): value is Record<string, unknown> & IdentityDocumentSetField {
  if (typeof value !== 'object' || value === null) return false
  if (!('identityDocument' in value)) return false

  const field = (value as Record<string, unknown>).identityDocument

  return (
    typeof field === 'object' &&
    field !== null &&
    'set' in field &&
    typeof (field as Record<string, unknown>).set === 'string'
  )
}
