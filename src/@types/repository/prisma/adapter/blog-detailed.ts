import type { EditorialStatusType } from '@prisma/generated/enums'

export interface BlogDetailedRaw {
  id: number
  public_id: string
  title: string
  author_name: string
  editorial_status: EditorialStatusType
  banner_image: string
  search_content: string
  access_count: number
  created_at: Date
  updated_at: Date
  user_full_name: string | null
  subcategories: {
    id: number
    area: string
  }[]
}

export interface CustomBlogDetailed {
  publicId: string
  title: string
  bannerImage: string
  authorName: string
  editorialStatus: EditorialStatusType
  searchContent: string
  accessCount: number
  createdAt: Date
  updatedAt: Date
  User: {
    fullName: string
  } | null
  Subcategories: {
    id: number
    area: string
  }[]
}
