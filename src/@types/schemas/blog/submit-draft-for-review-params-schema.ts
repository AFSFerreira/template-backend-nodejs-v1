import { modelPublicIdSchema } from '@schemas/utils/generic-components/model-public-id-schema'
import { z } from 'zod'

export const submitDraftForReviewParamsSchema = z.object({
  publicId: modelPublicIdSchema,
})

export type SubmitDraftForReviewParamsSchemaType = z.infer<typeof submitDraftForReviewParamsSchema>
