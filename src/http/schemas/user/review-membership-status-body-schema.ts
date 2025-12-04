import { MembershipStatusType } from '@prisma/client'
import { membershipStatusEnumSchema } from '@schemas/utils/enums/membership-status-enum-schema'
import z from 'zod'

export const reviewMembershipStatusBodySchema = z.object({
  membershipStatusReview: z.union([
    membershipStatusEnumSchema.exclude([MembershipStatusType.PENDING]),
    z.literal('REJECTED'),
  ]),
})
