import type { CreateBlogBodySchemaType } from '@custom-types/http/schemas/blog/create-blog-body-schema'
import type { Blog } from '@prisma/generated/client'

export interface CreatePendingBlogUseCaseRequest extends CreateBlogBodySchemaType {
  authorPublicId: string
}

export interface CreatePendingBlogUseCaseResponse {
  blog: Blog
}
