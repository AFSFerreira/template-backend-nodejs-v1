import type { FindBlogByPublicIdParamsSchemaType } from '@custom-types/http/schemas/blog/find-blog-by-public-id-query-schema'
import type { BlogWithDetails } from '@custom-types/validators/blog-with-details'

export interface FindBlogByPublicIdRestrictedUseCaseRequest extends FindBlogByPublicIdParamsSchemaType {
  userPublicId: string
}

export interface FindBlogByPublicIdRestrictedUseCaseResponse {
  blog: BlogWithDetails
}
