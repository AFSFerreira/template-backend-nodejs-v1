import type { submitDraftForReviewParamsSchema } from '@http/schemas/blog/submit-draft-for-review-params-schema'
import type { z } from 'zod'

export type SubmitDraftForReviewParamsSchemaType = z.infer<typeof submitDraftForReviewParamsSchema>
