import type { NewsletterWithContent } from '@custom-types/http/presenter/newsletter/newsletter-default'
import type { FindNewsletterByPublicIdParamsSchemaType } from '@custom-types/http/schemas/newsletter/find-newsletter-by-public-id-params-schema'

export interface FindNewsletterByPublicIdUseCaseRequest extends FindNewsletterByPublicIdParamsSchemaType {}

export interface FindNewsletterByPublicIdUseCaseResponse {
  newsletter: NewsletterWithContent
}
