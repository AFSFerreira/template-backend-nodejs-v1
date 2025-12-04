import type { BlogWithDetails } from '@custom-types/validator/blog-with-details'

export interface FindBlogByPublicIdUseCaseRequest {
  publicId: string
  ip: string
}

export interface FindBlogByPublicIdUseCaseResponse {
  blog: BlogWithDetails
}
