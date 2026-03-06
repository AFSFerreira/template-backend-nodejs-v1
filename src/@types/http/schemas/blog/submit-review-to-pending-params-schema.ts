import type { submitReviewToPendingParamsSchema } from '@http/schemas/blog/submit-review-to-pending-params-schema'
import type { z } from 'zod'

export type SubmitReviewToPendingParamsType = typeof submitReviewToPendingParamsSchema

export type SubmitReviewToPendingParamsSchemaType = z.infer<SubmitReviewToPendingParamsType>
