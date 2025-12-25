import type { Prisma } from '@prisma/client'

export interface UpdateBlogQuery {
  id: number
  data: Prisma.BlogUpdateInput
}
