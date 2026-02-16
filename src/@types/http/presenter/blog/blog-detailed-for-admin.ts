import type { CustomBlogDetailed } from '@custom-types/repository/prisma/adapter/blog-detailed'
import type { EditorialStatusType } from '@prisma/generated/enums'

export type { BlogWithDetails } from '@custom-types/validators/blog-with-details'

export interface BlogDetailedForAdminPresenterInput extends CustomBlogDetailed {}

export interface HTTPBlogDetailedForAdmin {
  id: string
  title: string
  bannerImage: string
  editorialStatus: EditorialStatusType
  authorName: string
  accessCount: number
  createdAt: Date
  updatedAt: Date
  subcategories: string[]
}
