import { MembershipStatusType } from '@prisma/client'
import z from 'zod'

export const membershipStatusEnumSchema = z.enum(MembershipStatusType)
