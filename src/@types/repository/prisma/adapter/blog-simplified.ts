import type { EditorialStatusType } from '@prisma/generated/enums'

export interface BlogSimplifiedRaw {
  id: number
  public_id: string
  editorial_status: EditorialStatusType
  title: string
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

export interface CustomBlogWithSimplifiedDetails {
  publicId: string
  title: string
  editorialStatus: EditorialStatusType
  bannerImage: string
  searchContent: string
  accessCount: number
  createdAt: Date
  updatedAt: Date
}
