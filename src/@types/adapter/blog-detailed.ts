import type { EditorialStatusType } from '@prisma/client'

export interface BlogDetailedRaw {
  id: number
  public_id: string
  title: string
  editorial_status: EditorialStatusType
  banner_image: string
  search_content: string
  access_count: number
  created_at: Date
  updated_at: Date
}

export interface CustomBlogDetailed {
  publicId: string
  title: string
  bannerImage: string
  editorialStatus: EditorialStatusType
  searchContent: string
  accessCount: number
  createdAt: Date
  updatedAt: Date
}
