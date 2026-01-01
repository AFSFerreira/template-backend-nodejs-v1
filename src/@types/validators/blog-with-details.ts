import { Prisma } from '@prisma/client'

export const blogWithDetails = Prisma.validator<Prisma.BlogDefaultArgs>()({
  include: {
    Subcategories: true,
    User: true,
  },
})

export type BlogWithDetails = Prisma.BlogGetPayload<typeof blogWithDetails>
