import type { UserRoleType } from '@prisma/generated/enums'

export interface HasRole {
  role: UserRoleType
}
