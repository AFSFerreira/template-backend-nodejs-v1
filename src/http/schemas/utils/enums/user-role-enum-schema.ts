import { UserRoleType } from '@prisma/generated/enums'
import z from 'zod'

export const userRoleEnumSchema = z.enum(UserRoleType)
