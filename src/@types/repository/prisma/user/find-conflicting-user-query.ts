import type { IdentityType, Prisma } from '@prisma/generated/client'

export type FindConflictingUserQuery = Prisma.UserWhereUniqueInput & {
  identity?: {
    identityType: IdentityType
    identityDocument: string
  }
}
