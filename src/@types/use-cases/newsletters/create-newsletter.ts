import type { NewsletterWithContentUrl } from '@custom-types/http/presenter/newsletter/newsletter-default'
import type { CreateNewsletterBodySchemaType } from '@custom-types/http/schemas/newsletter/create-newsletter-body-schema'

export interface CreateNewsletterUseCaseRequest extends CreateNewsletterBodySchemaType {}

export interface CreateNewsletterUseCaseResponse {
  newsletter: NewsletterWithContentUrl
}
