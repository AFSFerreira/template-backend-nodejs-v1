import type { IdentityType } from '@prisma/generated/enums'

export interface MaskIdentityDocumentInput {
  identityType: IdentityType
  identityDocument: string
}
