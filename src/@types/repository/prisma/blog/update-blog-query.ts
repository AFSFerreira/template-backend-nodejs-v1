import type { Prisma } from '@prisma/generated/client'

export interface UpdateBlogQuery {
  id: number
  data: Prisma.BlogUpdateInput
}
