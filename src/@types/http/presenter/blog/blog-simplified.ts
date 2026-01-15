import type { EditorialStatusType } from '@prisma/client'

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
