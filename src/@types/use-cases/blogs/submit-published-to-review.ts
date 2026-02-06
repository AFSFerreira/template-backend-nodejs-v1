import type { SubmitPublishedToReviewParamsSchemaType } from '@custom-types/http/schemas/blog/submit-published-to-review-params-schema'
import type { Blog } from '@prisma/generated/client'

export interface SubmitPublishedToPendingUseCaseRequest extends SubmitPublishedToReviewParamsSchemaType {
  userPublicId: string
}

export interface SubmitPublishedToPendingUseCaseResponse {
  blog: Blog
}
