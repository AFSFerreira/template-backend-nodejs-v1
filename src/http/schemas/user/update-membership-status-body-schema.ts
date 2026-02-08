import { MembershipStatusType } from '@prisma/generated/enums'
import z from 'zod'

export const updateMembershipStatusBodySchema = z.object({
  membershipStatus: z.enum([MembershipStatusType.ACTIVE, MembershipStatusType.INACTIVE]),
})
