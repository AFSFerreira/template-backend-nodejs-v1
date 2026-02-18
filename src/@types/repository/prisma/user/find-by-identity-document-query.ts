import type { HashedToken } from '@custom-types/services/hashes/hashed-token'
import type { IdentityType } from '@prisma/generated/enums'

export interface FindByIdentityDocumentQuery {
  identityDocumentBlindIndex: HashedToken
  identityType: IdentityType
}
