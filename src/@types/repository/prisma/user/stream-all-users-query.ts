import type { MembershipStatusType, Prisma } from '@prisma/generated/client'

export interface StreamAllUsersQuery {
  where?: Omit<Prisma.UserWhereInput, 'membershipStatus'> & { membershipStatus: MembershipStatusType[] }
  batchSize?: number
}
