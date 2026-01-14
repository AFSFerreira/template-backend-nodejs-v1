import type { Prisma } from '@prisma/client'

export interface CreateBlogQuery extends Prisma.BlogCreateInput {
  userId: number
  subcategoriesIds: number[]
}
