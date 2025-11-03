import { UserRoleType } from '@prisma/client'
import z from 'zod'

export const userRoleEnumSchema = z.enum(UserRoleType)
