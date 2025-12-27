import { modelPublicIdSchema } from '@schemas/utils/generic-components/model-public-id-schema'
import { z } from 'zod'

export const submitPendingToPublishParamsSchema = z.object({
  publicId: modelPublicIdSchema,
})
