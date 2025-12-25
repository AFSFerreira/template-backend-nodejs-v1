import type { SubmitDraftForReviewParamsSchemaType } from '@custom-types/schemas/blog/submit-draft-for-review-params-schema'
import type { Blog } from '@prisma/client'

export interface SubmitDraftForReviewUseCaseRequest extends SubmitDraftForReviewParamsSchemaType {
  userPublicId: string
}

export interface SubmitDraftForReviewUseCaseResponse {
  blog: Blog
}
