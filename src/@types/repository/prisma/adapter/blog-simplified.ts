import type { EditorialStatusType } from '@prisma/generated/enums'
import type { blogSimplifiedAdapterSchema } from '@repositories/prisma/adapters/blogs/blog-simplified-adapter-schema'
import type z from 'zod'

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

export type CustomBlogWithSimplifiedDetails = z.infer<typeof blogSimplifiedAdapterSchema>
