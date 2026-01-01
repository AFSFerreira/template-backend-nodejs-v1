import type { IdentityType, Prisma } from '@prisma/client'

export type FindConflictingUserQuery = Prisma.UserWhereUniqueInput & {
  identity?: {
    identityType: IdentityType
    identityDocument: string
  }
}
