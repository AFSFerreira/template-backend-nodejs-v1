import type { CreateNewsletterBodySchemaType } from '@custom-types/schemas/newsletter/create-newsletter-body-schema'
import type { Newsletter } from '@prisma/client'

export interface CreateNewsletterUseCaseRequest extends CreateNewsletterBodySchemaType {}

export interface CreateNewsletterUseCaseResponse {
  newsletter: Newsletter
}
