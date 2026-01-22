import type { BlogWithDetails } from '@custom-types/validators/blog-with-details'
import type { EditorialStatusType } from '@prisma/client'
import type { JsonValue } from '@prisma/client/runtime/client'

export interface BlogDetailedWithContentPresenterInput extends BlogWithDetails {}

export interface HTTPBlogDetailedWithContent {
  id: string
  title: string
  editorialStatus: EditorialStatusType
  bannerImage: string
  authorName: string
  accessCount: number
  createdAt: Date
  updatedAt: Date
  subCategories: string[]
  content: JsonValue
}
