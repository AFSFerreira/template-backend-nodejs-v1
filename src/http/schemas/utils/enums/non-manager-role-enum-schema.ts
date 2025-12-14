import { MANAGER_PERMISSIONS_ARRAY } from '@constants/arrays'
import { UserRoleType } from '@prisma/client'
import z from 'zod'

export const nonManagerRoleEnumSchema = z.enum(UserRoleType).exclude(MANAGER_PERMISSIONS_ARRAY)
