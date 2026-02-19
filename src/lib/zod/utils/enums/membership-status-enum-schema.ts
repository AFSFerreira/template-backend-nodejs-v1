import { MembershipStatusType } from '@prisma/generated/enums'
import z from 'zod'

export const membershipStatusEnumSchema = z.enum(MembershipStatusType)
