import type { Prisma } from '@prisma/generated/client'

export type CreateNewsletterQuery = Omit<Prisma.NewsletterCreateInput, 'NewsletterTemplate' | 'format'> &
  (
    | {
        format: 'HTML_FILE'
        newsletterTemplateId?: null
      }
    | {
        format: 'PROSEMIRROR'
        newsletterTemplateId: number
      }
  )
