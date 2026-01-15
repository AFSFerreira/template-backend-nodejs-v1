import type { submitPendingToPublishParamsSchema } from '@schemas/blog/submit-review-to-publish-params-schema'
import type { z } from 'zod'

export type SubmitReviewToPublishParamsSchemaType = z.infer<typeof submitPendingToPublishParamsSchema>
