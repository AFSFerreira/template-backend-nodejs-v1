import type { UpdateBlogBodySchemaType } from '@custom-types/http/schemas/blog/update-blog-body-schema'
import type { UpdateBlogParamsSchemaType } from '@custom-types/http/schemas/blog/update-blog-params-schema'
import type { Blog } from '@prisma/client'

export interface UpdateBlogUseCaseRequest {
  publicId: UpdateBlogParamsSchemaType['publicId']
  body: UpdateBlogBodySchemaType
  userPublicId: string
}

export interface UpdateBlogUseCaseResponse {
  blog: Blog
}
