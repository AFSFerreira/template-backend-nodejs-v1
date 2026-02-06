import type { CustomBlogWithSimplifiedDetails } from '@custom-types/repository/prisma/adapter/blog-simplified'
import type { EditorialStatusType } from '@prisma/generated/enums'

export interface BlogSimplifiedPresenterInput extends CustomBlogWithSimplifiedDetails {}

export interface HTTPSimplifiedBlog {
  id: string
  title: string
  bannerImage: string
  editorialStatus: EditorialStatusType
  searchContent: string
  accessCount: number
  createdAt: Date
  updatedAt: Date
}
