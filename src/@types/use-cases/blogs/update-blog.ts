import type { Blog } from '@prisma/client'
import type { UpdateBlogBodySchemaType } from '@schemas/blog/update-blog-body-schema'

export interface UpdateBlogUseCaseRequest {
  publicId: string
  body: UpdateBlogBodySchemaType
  userPublicId: string
}

export interface UpdateBlogUseCaseResponse {
  blog: Blog
}
