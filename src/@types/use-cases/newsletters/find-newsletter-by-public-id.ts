import type { FindNewsletterByPublicIdParamsSchemaType } from '@custom-types/http/schemas/newsletter/find-newsletter-by-public-id-params-schema'
import type { Newsletter } from '@prisma/client'

export interface FindNewsletterByPublicIdUseCaseRequest extends FindNewsletterByPublicIdParamsSchemaType {}

export interface FindNewsletterByPublicIdUseCaseResponse {
  newsletter: Newsletter
}
