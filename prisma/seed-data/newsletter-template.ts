import type { Prisma } from '@prisma/generated/client'
import { NEWSLETTER_BASE_TEMPLATE_FOLDER } from '@constants/static-file-constants'

const newsletterTemplateData1: Prisma.NewsletterTemplateCreateInput = {
  templateFolder: NEWSLETTER_BASE_TEMPLATE_FOLDER,
}

export const newsletterTemplateDataArray1: Prisma.NewsletterTemplateCreateInput[] = [newsletterTemplateData1]
