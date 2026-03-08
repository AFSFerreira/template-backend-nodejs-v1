import type { FindNewsletterTemplateByPublicIdParamsSchemaType } from '@custom-types/http/schemas/newsletter-template/find-newsletter-template-by-public-id-params-schema'
import type { NewsletterTemplate } from '@prisma/generated/client'

export interface FindNewsletterTemplateByPublicIdUseCaseRequest
  extends FindNewsletterTemplateByPublicIdParamsSchemaType {}

export interface FindNewsletterTemplateByPublicIdUseCaseResponse {
  newsletterTemplate: NewsletterTemplate
}
