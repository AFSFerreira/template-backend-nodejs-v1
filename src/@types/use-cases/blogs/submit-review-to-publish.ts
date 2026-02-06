import type { SubmitReviewToPublishParamsSchemaType } from '@custom-types/http/schemas/blog/submit-review-to-publish-params-schema'
import type { Blog } from '@prisma/generated/client'

export interface SubmitPendingToPublishUseCaseRequest extends SubmitReviewToPublishParamsSchemaType {
  userPublicId: string
}

export interface SubmitPendingToPublishUseCaseResponse {
  blog: Blog
}
