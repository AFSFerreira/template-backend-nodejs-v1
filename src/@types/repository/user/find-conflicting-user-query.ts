import type { IdentityType } from '@prisma/client'

export interface FindConflictingUserQuery {
  email?: string
  username?: string
  identity?: {
    identityDocument: string
    identityType: IdentityType
  }
}
