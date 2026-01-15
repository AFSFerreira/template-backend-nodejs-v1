import type { EditorialStatusType } from '@prisma/client'

export interface UpdateBlogStatusQuery {
  id: number
  status: EditorialStatusType
}
