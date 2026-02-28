import type { NewsletterWithContentUrl } from '@custom-types/http/presenter/newsletter/newsletter-default'
import type { FindNewsletterByPublicIdParamsSchemaType } from '@custom-types/http/schemas/newsletter/find-newsletter-by-public-id-params-schema'

export interface FindNewsletterByPublicIdRestrictedUseCaseRequest extends FindNewsletterByPublicIdParamsSchemaType {}

export interface FindNewsletterByPublicIdRestrictedUseCaseResponse {
  newsletter: NewsletterWithContentUrl
}
