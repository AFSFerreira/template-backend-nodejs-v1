import type { Prisma } from '@prisma/generated/client'

export const blogWithDetails = {
  include: {
    Subcategories: true,
    User: true,
  },
} as const satisfies Prisma.BlogDefaultArgs

export type BlogWithDetails = Prisma.BlogGetPayload<typeof blogWithDetails>
