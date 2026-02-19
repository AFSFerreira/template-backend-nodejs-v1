import { ADMIN_PERMISSIONS_ARRAY } from '@constants/arrays'
import { userRoleEnumSchema } from '@lib/zod/utils/enums/user-role-enum-schema'
import { z } from 'zod'

export const updateUserPermissionsBodySchema = z.object({
  role: userRoleEnumSchema.exclude(ADMIN_PERMISSIONS_ARRAY),
})
