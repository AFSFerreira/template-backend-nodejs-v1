import type { BlogWithDetails } from '@custom-types/validators/blog-with-details'
import type { EditorialStatusType } from '@prisma/client'

export type { BlogWithDetails } from '@custom-types/validators/blog-with-details'

export interface BlogDetailedPresenterInput extends BlogWithDetails {}

export interface HTTPBlogDetailed {
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
