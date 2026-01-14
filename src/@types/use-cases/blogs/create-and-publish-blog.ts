import type { CreateBlogBodySchemaType } from '@custom-types/http/schemas/blog/create-blog-body-schema'
import type { Blog } from '@prisma/client'

export interface CreateAndPublishBlogUseCaseRequest extends CreateBlogBodySchemaType {
  authorPublicId: string
}

export interface CreateAndPublishBlogUseCaseResponse {
  blog: Blog
}
