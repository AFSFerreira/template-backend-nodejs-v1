import type { CreateBlogBodySchemaType } from '@custom-types/http/schemas/blog/create-blog-body-schema'
import type { Blog } from '@prisma/client'

export interface CreateDraftBlogUseCaseRequest extends CreateBlogBodySchemaType {
  authorPublicId: string
}

export interface CreateDraftBlogUseCaseResponse {
  blog: Blog
}
