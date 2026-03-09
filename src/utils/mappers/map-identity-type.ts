import type { IdentityType } from '@prisma/generated/enums'

const IDENTITY_TYPE_LABELS: Record<IdentityType, string> = {
  CPF: 'CPF',
  RNE: 'RNE',
  PASSPORT: 'Passaporte',
}

/**
 * Converte o enum `IdentityType` para seu rótulo legível em português.
 *
 * @param identityType - Tipo de documento, ou `null`/`undefined`.
 * @returns Rótulo traduzido (ex: `'Passaporte'`), ou string vazia se não informado.
 *
 * @example
 * mapIdentityType('PASSPORT')  // 'Passaporte'
 * mapIdentityType('CPF')       // 'CPF'
 * mapIdentityType(null)        // ''
 */
export function mapIdentityType(identityType: IdentityType | null | undefined): string {
  if (!identityType) return ''
  return IDENTITY_TYPE_LABELS[identityType]
}
