import { modelPublicIdSchema } from '@schemas/utils/generic-components/model-public-id-schema'
import { z } from 'zod'

export const updateBlogParamsSchema = z.object({
  publicId: modelPublicIdSchema,
})
