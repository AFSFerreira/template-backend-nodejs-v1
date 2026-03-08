import type { CreateNewsletterBodySchemaType } from '@custom-types/http/schemas/newsletter/create-newsletter-body-schema'
import type { NewsletterWithDetails } from '@custom-types/validators/newsletter-with-details'

export interface CreateNewsletterUseCaseRequest extends CreateNewsletterBodySchemaType {}

export interface CreateNewsletterUseCaseResponse {
  newsletter: NewsletterWithDetails
}
