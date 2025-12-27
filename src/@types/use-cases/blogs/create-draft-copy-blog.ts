import type { CreateDraftCopyBlogParamsSchemaType } from '@custom-types/schemas/blog/create-draft-copy-blog-params-schema'
import type { Blog } from '@prisma/client'

export interface CreateDraftCopyBlogUseCaseRequest extends CreateDraftCopyBlogParamsSchemaType {
  userPublicId: string
}

export interface CreateDraftCopyBlogUseCaseResponse {
  blog: Blog
}
