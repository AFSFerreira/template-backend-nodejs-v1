import type { SubmitPendingToReviewParamsSchemaType } from '@custom-types/http/schemas/blog/submit-pending-to-review-params-schema'
import type { Blog } from '@prisma/client'

export interface SubmitPendingToReviewUseCaseRequest extends SubmitPendingToReviewParamsSchemaType {
  userPublicId: string
}

export interface SubmitPendingToReviewUseCaseResponse {
  blog: Blog
}
