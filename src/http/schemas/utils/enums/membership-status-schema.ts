import { MembershipStatusType } from '@prisma/client'
import z from 'zod'

export const membershipStatusSchema = z.enum(MembershipStatusType)
