import type { IdentityType } from '@prisma/client'

export interface FindByIdentityDocumentQuery {
  identityDocument: string
  identityType: IdentityType
}
