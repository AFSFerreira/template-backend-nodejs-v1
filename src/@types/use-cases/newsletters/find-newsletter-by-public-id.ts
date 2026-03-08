import type { FindNewsletterByPublicIdParamsSchemaType } from '@custom-types/http/schemas/newsletter/find-newsletter-by-public-id-params-schema'
import type { NewsletterWithDetails } from '@custom-types/validators/newsletter-with-details'

export interface FindNewsletterByPublicIdUseCaseRequest extends FindNewsletterByPublicIdParamsSchemaType {}

export interface FindNewsletterByPublicIdUseCaseResponse {
  newsletter: NewsletterWithDetails
}
