import type { MembershipStatusType, UserRoleType } from '@prisma/generated/enums'

export interface TokenPayload {
  role: UserRoleType
  status: MembershipStatusType
}
