import type { UserRoleTransformData } from '@custom-types/custom/user-role-transform-data'
import type { RefinementCtx, ZodType } from 'zod'
import { INVALID_USER_ROLE_TYPE } from '@messages/validations/user-validations'
import { managerRoleEnumSchema } from '@schemas/utils/enums/manager-role-enum-schema'
import { nonManagerRoleEnumSchema } from '@schemas/utils/enums/non-manager-role-enum-schema'
import { getTrueMapping } from '@utils/mappers/get-true-mapping'
import { z } from 'zod'
import { managerPermissionsSchema } from '../../components/user/manager-permissions-schema'
import { regularPermissionsSchema } from '../../components/user/regular-permissions-schema'

export function transformUpdatePermissionsBody(data: UserRoleTransformData, ctx: RefinementCtx) {
  const role = data.role

  const targetSchema = getTrueMapping<ZodType>([
    {
      expression: managerRoleEnumSchema.safeParse(role).success,
      value: managerPermissionsSchema,
    },
    {
      expression: nonManagerRoleEnumSchema.safeParse(role).success,
      value: regularPermissionsSchema,
    },
  ])

  if (!targetSchema) {
    ctx.addIssue({
      code: 'custom',
      message: INVALID_USER_ROLE_TYPE,
      path: ['role'],
      received: role,
    })
    return z.NEVER
  }

  const result = targetSchema.safeParse(data)

  if (!result.success) {
    result.error.issues.forEach((issue) => {
      ctx.addIssue({ ...issue })
    })
    return z.NEVER
  }

  return result.data
}
