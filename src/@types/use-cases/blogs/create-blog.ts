import type { CreateBlogBodySchemaType } from '@custom-types/schemas/blog/create-blog-body-schema'
import type { Blog } from '@prisma/client'

export interface CreateBlogUseCaseRequest extends CreateBlogBodySchemaType {
  authorPublicId: string
}

export interface CreateBlogUseCaseResponse {
  blog: Blog
}
