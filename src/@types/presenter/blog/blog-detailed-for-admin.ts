import type { EditorialStatusType } from '@prisma/client'
export type { BlogWithDetails } from '@custom-types/validator/blog-with-details'

export interface HTTPBlogDetailedForAdmin {
  id: string
  title: string
  bannerImage: string
  editorialStatus: EditorialStatusType
  authorName: string
  accessCount: number
  createdAt: Date
  updatedAt: Date
  subCategories: string[]
}
