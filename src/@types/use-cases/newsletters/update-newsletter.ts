import type { UpdateNewsletterBodySchemaType } from '@custom-types/schemas/newsletter/update-newsletter-body-schema'
import type { UpdateNewsletterParamsSchemaType } from '@custom-types/schemas/newsletter/update-newsletter-params-schema'
import type { Newsletter } from '@prisma/client'

export interface UpdateNewsletterUseCaseRequest {
  publicId: UpdateNewsletterParamsSchemaType['publicId']
  body: UpdateNewsletterBodySchemaType
}

export interface UpdateNewsletterUseCaseResponse {
  newsletter: Newsletter
}
