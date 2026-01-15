import type { UserRoleType } from '@prisma/client'

export interface HasRole {
  role: UserRoleType
}
