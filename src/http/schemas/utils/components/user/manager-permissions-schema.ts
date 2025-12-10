import { managerRoleEnumSchema } from '@schemas/utils/enums/manager-role-enum-schema'
import { modelPublicIdSchema } from '@schemas/utils/generic-components/model-public-id-schema'
import z from 'zod'

export const managerPermissionsSchema = z.object({
  role: managerRoleEnumSchema,
  directorPositionPublicId: modelPublicIdSchema,
})
