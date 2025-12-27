import type { SubmitPublishedToReviewParamsSchemaType } from '@custom-types/schemas/blog/submit-published-to-review-params-schema'
import type { Blog } from '@prisma/client'

export interface SubmitPublishedToPendingUseCaseRequest extends SubmitPublishedToReviewParamsSchemaType {
  userPublicId: string
}

export interface SubmitPublishedToPendingUseCaseResponse {
  blog: Blog
}
