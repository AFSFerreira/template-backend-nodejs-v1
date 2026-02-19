import type { EditorialStatusType } from '@prisma/generated/enums'
import type { blogDetailedAdapterSchema } from '@repositories/prisma/adapters/blogs/blog-detailed-adapter-schema'
import type z from 'zod'

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

export type CustomBlogDetailed = z.infer<typeof blogDetailedAdapterSchema>
