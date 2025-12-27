import type { submitReviewToPendingParamsSchema } from '@schemas/blog/submit-review-to-pending-params-schema'
import type { z } from 'zod'

export type SubmitReviewToPendingParamsSchemaType = z.infer<typeof submitReviewToPendingParamsSchema>
