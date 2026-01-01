import type { BlogWithDetails } from '@custom-types/validators/blog-with-details'

export interface FindBlogByPublicIdUseCaseRequest {
  publicId: string
  ip: string
}

export interface FindBlogByPublicIdUseCaseResponse {
  blog: BlogWithDetails
}
