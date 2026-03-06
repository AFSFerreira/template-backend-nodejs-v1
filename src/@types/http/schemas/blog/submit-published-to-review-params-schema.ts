import type { submitPublishedToPendingParamsSchema } from '@http/schemas/blog/submit-published-to-review-params-schema'
import type { z } from 'zod'

export type SubmitPublishedToReviewParamsType = typeof submitPublishedToPendingParamsSchema

export type SubmitPublishedToReviewParamsSchemaType = z.infer<SubmitPublishedToReviewParamsType>
