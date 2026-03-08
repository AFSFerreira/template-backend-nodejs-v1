import type { UpdateNewsletterBodySchemaType } from '@custom-types/http/schemas/newsletter/update-newsletter-body-schema'
import type { UpdateNewsletterParamsSchemaType } from '@custom-types/http/schemas/newsletter/update-newsletter-params-schema'
import type { NewsletterWithDetails } from '@custom-types/validators/newsletter-with-details'

export interface UpdateNewsletterUseCaseRequest {
  publicId: UpdateNewsletterParamsSchemaType['publicId']
  body: UpdateNewsletterBodySchemaType
}

export interface UpdateNewsletterUseCaseResponse {
  newsletter: NewsletterWithDetails
}
