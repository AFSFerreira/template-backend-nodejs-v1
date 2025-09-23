import { MembershipStatusType } from '@prisma/client'
import z from 'zod'
import { membershipStatusSchema } from '../enums/membership-status-schema'

export const membershipStatusArraySchema = z
  .union([z.array(membershipStatusSchema), membershipStatusSchema.transform((val) => [val])])
  .default([MembershipStatusType.ACTIVE])
