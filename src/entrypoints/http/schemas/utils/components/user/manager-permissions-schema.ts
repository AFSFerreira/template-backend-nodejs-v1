import { managerRoleEnumSchema } from '@lib/zod/utils/enums/manager-role-enum-schema'
import { modelPublicIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import z from 'zod'

export const managerPermissionsSchema = z.object({
  role: managerRoleEnumSchema,
  directorPositionPublicId: modelPublicIdSchema,
})
