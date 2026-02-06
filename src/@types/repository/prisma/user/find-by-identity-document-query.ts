import type { IdentityType } from '@prisma/generated/enums'

export interface FindByIdentityDocumentQuery {
  identityDocument: string
  identityType: IdentityType
}
