import { UserRoleType } from '@prisma/client'
import { userRoleEnumSchema } from '@schemas/utils/enums/user-role-enum-schema'
import { transformUpdatePermissionsBody } from '@schemas/utils/helpers/user/transform-update-permissions-body'
import { z } from 'zod'

const updateUserPermissionsBodyRawSchema = z
  .object({
    role: userRoleEnumSchema.exclude([UserRoleType.ADMIN]),
  })
  .loose()

export const updateUserPermissionsBodySchema =
  updateUserPermissionsBodyRawSchema.transform(transformUpdatePermissionsBody)
