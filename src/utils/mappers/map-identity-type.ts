import type { IdentityType } from '@prisma/generated/enums'

const IDENTITY_TYPE_LABELS: Record<IdentityType, string> = {
  CPF: 'CPF',
  RNE: 'RNE',
  PASSPORT: 'Passaporte',
}

export function mapIdentityType(identityType: IdentityType | null | undefined): string {
  if (!identityType) return ''
  return IDENTITY_TYPE_LABELS[identityType]
}
