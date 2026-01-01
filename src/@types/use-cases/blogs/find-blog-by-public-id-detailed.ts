import type { BlogWithDetails } from '@custom-types/validators/blog-with-details'

export interface FindBlogByPublicIdRestrictedUseCaseRequest {
  publicId: string
  userPublicId: string
}

export interface FindBlogByPublicIdRestrictedUseCaseResponse {
  blog: BlogWithDetails
}
