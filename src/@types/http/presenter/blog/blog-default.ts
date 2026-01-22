import type { Blog, EditorialStatusType } from '@prisma/client'

export interface BlogDefaultPresenterInput extends Blog {}

export interface HTTPBlog {
  id: string
  title: string
  bannerImage: string
  editorialStatus: EditorialStatusType
  authorName: string
  accessCount: number
  searchContent: string
  createdAt: Date
  updatedAt: Date
}
