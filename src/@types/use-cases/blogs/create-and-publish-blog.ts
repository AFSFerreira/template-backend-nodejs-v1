import type { CreateBlogBodySchemaType } from '@custom-types/schemas/blog/create-blog-body-schema'
import type { Blog } from '@prisma/client'

export interface PublishBlogUseCaseRequest extends CreateBlogBodySchemaType {
  authorPublicId: string
}

export interface PublishBlogUseCaseResponse {
  blog: Blog
}
