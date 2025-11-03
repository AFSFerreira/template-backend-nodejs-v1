import { MembershipStatusType } from '@prisma/client'
import z from 'zod'
import { membershipStatusEnumSchema } from '../enums/membership-status-enum-schema'

export const membershipStatusArraySchema = z
  .union([z.array(membershipStatusEnumSchema), membershipStatusEnumSchema.transform((val) => [val])])
  .default([MembershipStatusType.ACTIVE])
