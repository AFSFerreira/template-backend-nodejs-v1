import { modelPublicIdSchema } from '@schemas/utils/generic-components/model-public-id-schema'
import z from 'zod'

export const deleteNewsletterParamsSchema = z.object({
  publicId: modelPublicIdSchema,
})
