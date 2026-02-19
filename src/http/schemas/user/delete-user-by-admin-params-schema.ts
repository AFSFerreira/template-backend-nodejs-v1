import { modelPublicIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import { z } from 'zod'

export const deleteUserByAdminParamsSchema = z.object({
  publicId: modelPublicIdSchema,
})
