import type { UserRoleType } from '@prisma/client'

export interface UpdateRoleQuery {
  id: number
  role: UserRoleType
}
