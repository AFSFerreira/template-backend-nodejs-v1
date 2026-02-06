import type { Prisma } from '@prisma/generated/client'

export interface CreateBlogQuery extends Prisma.BlogCreateInput {
  userId: number
  subcategoriesIds: number[]
}
