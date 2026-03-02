import { modelPublicIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import { z } from 'zod'

export const findUserByPublicIdParamsSchema = z.object({
  publicId: modelPublicIdSchema,
})
