import type { UpdateBlogBodySchemaType } from '@custom-types/schemas/blog/update-blog-body-schema'
import type { Blog } from '@prisma/client'

export interface UpdateBlogUseCaseRequest {
  publicId: string
  body: UpdateBlogBodySchemaType
  userPublicId: string
}

export interface UpdateBlogUseCaseResponse {
  blog: Blog
}
