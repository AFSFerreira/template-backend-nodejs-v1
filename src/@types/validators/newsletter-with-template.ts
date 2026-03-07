import type { Prisma } from '@prisma/generated/client'

export const newsletterWithDetails = {
  include: {
    NewsletterTemplate: true,
  },
} as const satisfies Prisma.NewsletterDefaultArgs

export type NewsletterWithDetails = Prisma.NewsletterGetPayload<typeof newsletterWithDetails>
