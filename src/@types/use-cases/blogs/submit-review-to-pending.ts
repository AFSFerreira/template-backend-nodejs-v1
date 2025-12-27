import type { SubmitReviewToPendingParamsSchemaType } from '@custom-types/schemas/blog/submit-review-to-pending-params-schema'
import type { Blog } from '@prisma/client'

export interface SubmitReviewToPendingUseCaseRequest extends SubmitReviewToPendingParamsSchemaType {
  userPublicId: string
}

export interface SubmitReviewToPendingUseCaseResponse {
  blog: Blog
}
