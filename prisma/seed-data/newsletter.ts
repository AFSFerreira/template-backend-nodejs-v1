import type { Prisma } from '@prisma/client'

export const newsletterDataArray1: Prisma.NewsletterCreateInput[] = []

for (let idx = 0; idx <= 70; idx++) {
  newsletterDataArray1.push({
    content: 'newsletter-1.html',
    editionNumber: `${(idx % 10) + 1}`,
    volume: `${Math.floor(idx / 10) + 1}`,
    sequenceNumber: `${idx + 250}`,
  })
}
