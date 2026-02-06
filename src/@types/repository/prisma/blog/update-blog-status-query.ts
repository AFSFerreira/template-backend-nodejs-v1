import type { EditorialStatusType } from '@prisma/generated/enums'

export interface UpdateBlogStatusQuery {
  id: number
  status: EditorialStatusType
}
