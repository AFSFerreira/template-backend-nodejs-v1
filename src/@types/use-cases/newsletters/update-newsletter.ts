import type { NewsletterWithContentUrl } from '@custom-types/http/presenter/newsletter/newsletter-default'
import type { UpdateNewsletterBodySchemaType } from '@custom-types/http/schemas/newsletter/update-newsletter-body-schema'
import type { UpdateNewsletterParamsSchemaType } from '@custom-types/http/schemas/newsletter/update-newsletter-params-schema'

export interface UpdateNewsletterUseCaseRequest {
  publicId: UpdateNewsletterParamsSchemaType['publicId']
  body: UpdateNewsletterBodySchemaType
}

export interface UpdateNewsletterUseCaseResponse {
  newsletter: NewsletterWithContentUrl
}
