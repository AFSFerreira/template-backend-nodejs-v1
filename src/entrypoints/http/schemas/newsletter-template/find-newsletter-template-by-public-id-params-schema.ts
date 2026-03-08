import { modelPublicIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import { z } from 'zod'

export const findNewsletterTemplateByPublicIdParamsSchema = z.object({
  publicId: modelPublicIdSchema,
})
