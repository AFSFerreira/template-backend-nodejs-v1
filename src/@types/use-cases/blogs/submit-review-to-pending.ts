import type { SubmitReviewToPendingParamsSchemaType } from '@custom-types/http/schemas/blog/submit-review-to-pending-params-schema'
import type { Blog } from '@prisma/generated/client'

export interface SubmitReviewToPendingUseCaseRequest extends SubmitReviewToPendingParamsSchemaType {
  userPublicId: string
}

export interface SubmitReviewToPendingUseCaseResponse {
  blog: Blog
}
