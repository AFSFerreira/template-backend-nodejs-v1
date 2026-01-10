import { modelPublicIdSchema } from '@schemas/utils/generic-components/model-public-id-schema'
import { z } from 'zod'

export const updateMeetingParamsSchema = z.object({
  publicId: modelPublicIdSchema,
})
