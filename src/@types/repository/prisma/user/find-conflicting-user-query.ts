import type { HashedToken } from '@custom-types/services/hashes/hashed-token'
import type { IdentityType, Prisma } from '@prisma/generated/client'

export type FindConflictingUserQuery = Omit<Prisma.UserWhereUniqueInput, 'indentity'> & {
  identity?: {
    identityType: IdentityType
    identityDocumentBlindIndex: HashedToken
  }
}
