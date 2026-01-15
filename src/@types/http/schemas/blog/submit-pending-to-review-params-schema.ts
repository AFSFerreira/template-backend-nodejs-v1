import type { submitPendingToReviewParamsSchema } from '@schemas/blog/submit-pending-to-review-params-schema'
import type { z } from 'zod'

export type SubmitPendingToReviewParamsSchemaType = z.infer<typeof submitPendingToReviewParamsSchema>
