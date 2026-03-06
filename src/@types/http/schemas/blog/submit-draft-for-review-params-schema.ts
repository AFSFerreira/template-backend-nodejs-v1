import type { submitDraftForReviewParamsSchema } from '@http/schemas/blog/submit-draft-for-review-params-schema'
import type { z } from 'zod'

export type SubmitDraftForReviewParamsType = typeof submitDraftForReviewParamsSchema

export type SubmitDraftForReviewParamsSchemaType = z.infer<SubmitDraftForReviewParamsType>
