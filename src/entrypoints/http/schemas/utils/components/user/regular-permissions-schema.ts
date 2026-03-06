import { nonManagerRoleEnumSchema } from '@lib/zod/utils/enums/non-manager-role-enum-schema'
import z from 'zod'

export const regularPermissionsSchema = z.object({
  role: nonManagerRoleEnumSchema,
})
