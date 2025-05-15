import type { UserRoleType } from '@prisma/generated/enums'

export interface UpdateRoleQuery {
  id: string
  role: UserRoleType
}
