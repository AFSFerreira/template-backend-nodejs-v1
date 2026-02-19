import { MANAGER_PERMISSIONS_ARRAY } from '@constants/arrays'
import z from 'zod'

export const managerRoleEnumSchema = z.enum(MANAGER_PERMISSIONS_ARRAY)
