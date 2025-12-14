import { ADMIN_PERMISSIONS_ARRAY } from '@constants/arrays'
import { userRoleEnumSchema } from '@schemas/utils/enums/user-role-enum-schema'
import { transformUpdatePermissionsBody } from '@schemas/utils/helpers/user/transform-update-permissions-body'
import { z } from 'zod'

const updateUserPermissionsBodyRawSchema = z
  .object({
    role: userRoleEnumSchema.exclude(ADMIN_PERMISSIONS_ARRAY),
  })
  .loose()

export const updateUserPermissionsBodySchema =
  updateUserPermissionsBodyRawSchema.transform(transformUpdatePermissionsBody)
