import type { submitPendingToPublishParamsSchema } from '@http/schemas/blog/submit-review-to-publish-params-schema'
import type { z } from 'zod'

export type SubmitReviewToPublishParamsType = typeof submitPendingToPublishParamsSchema

export type SubmitReviewToPublishParamsSchemaType = z.infer<SubmitReviewToPublishParamsType>
