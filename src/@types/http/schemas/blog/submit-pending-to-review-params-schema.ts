import type { submitPendingToReviewParamsSchema } from '@http/schemas/blog/submit-pending-to-review-params-schema'
import type { z } from 'zod'

export type SubmitPendingToReviewParamsType = typeof submitPendingToReviewParamsSchema

export type SubmitPendingToReviewParamsSchemaType = z.infer<SubmitPendingToReviewParamsType>
