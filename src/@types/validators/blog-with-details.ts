import type { Prisma } from '@prisma/client'

export const blogWithDetails = {
  include: {
    Subcategories: true,
    User: true,
  },
} satisfies Prisma.BlogDefaultArgs

export type BlogWithDetails = Prisma.BlogGetPayload<typeof blogWithDetails>
