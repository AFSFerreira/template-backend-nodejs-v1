import { nonManagerRoleEnumSchema } from '@schemas/utils/enums/non-manager-role-enum-schema'
import z from 'zod'

export const regularPermissionsSchema = z.object({
  role: nonManagerRoleEnumSchema,
})
