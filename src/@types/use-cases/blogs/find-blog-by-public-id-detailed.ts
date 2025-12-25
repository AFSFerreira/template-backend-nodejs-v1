import type { BlogWithDetails } from '@custom-types/validator/blog-with-details'

export interface FindBlogByPublicIdRestrictedUseCaseRequest {
  publicId: string
  userPublicId: string
}

export interface FindBlogByPublicIdRestrictedUseCaseResponse {
  blog: BlogWithDetails
}
