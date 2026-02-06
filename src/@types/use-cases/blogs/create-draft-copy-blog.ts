import type { CreateDraftCopyBlogParamsSchemaType } from '@custom-types/http/schemas/blog/create-draft-copy-blog-params-schema'
import type { Blog } from '@prisma/generated/client'

export interface CreateDraftCopyBlogUseCaseRequest extends CreateDraftCopyBlogParamsSchemaType {
  userPublicId: string
}

export interface CreateDraftCopyBlogUseCaseResponse {
  blog: Blog
}
