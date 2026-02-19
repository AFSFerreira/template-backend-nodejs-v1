import { modelPublicIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import z from 'zod'

export const transferAdminRoleBodySchema = z.object({
  newAdminPublicId: modelPublicIdSchema,
})
