import type { CreateNewsletterBodySchemaType } from '@custom-types/http/schemas/newsletter/create-newsletter-body-schema'
import type { Newsletter } from '@prisma/generated/client'

export interface CreateNewsletterUseCaseRequest extends CreateNewsletterBodySchemaType {}

export interface CreateNewsletterUseCaseResponse {
  newsletter: Newsletter
}
