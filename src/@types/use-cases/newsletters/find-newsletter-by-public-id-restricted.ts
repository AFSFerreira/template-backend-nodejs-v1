import type { FindNewsletterByPublicIdParamsSchemaType } from '@custom-types/http/schemas/newsletter/find-newsletter-by-public-id-params-schema'
import type { NewsletterWithDetails } from '@custom-types/validators/newsletter-with-details'

export interface FindNewsletterByPublicIdRestrictedUseCaseRequest extends FindNewsletterByPublicIdParamsSchemaType {}

export interface FindNewsletterByPublicIdRestrictedUseCaseResponse {
  newsletter: NewsletterWithDetails
}
