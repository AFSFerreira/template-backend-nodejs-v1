import type { UserRoleType } from '@prisma/generated/enums'

export interface TokenPayload {
  role: UserRoleType
}
