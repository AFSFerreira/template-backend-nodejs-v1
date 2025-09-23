import { Prisma } from '@prisma/client'

export const blogWithDetails = Prisma.validator<Prisma.BlogDefaultArgs>()({
  include: {
    MainBlogCategory: true,
    Subcategories: true,
    User: true,
  },
})

export type BlogWithDetails = Prisma.BlogGetPayload<typeof blogWithDetails>
