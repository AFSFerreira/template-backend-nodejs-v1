import { MembershipStatusType } from '@prisma/generated/enums'
import z from 'zod'

export const reviewMembershipStatusBodySchema = z.object({
  membershipStatusReview: z.union([z.literal(MembershipStatusType.ACTIVE), z.literal('REJECTED')]),
})
