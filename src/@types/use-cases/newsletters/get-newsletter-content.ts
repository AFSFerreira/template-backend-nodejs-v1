import type { FindNewsletterByPublicIdParamsSchemaType } from '@custom-types/http/schemas/newsletter/find-newsletter-by-public-id-params-schema'

export interface GetNewsletterHtmlContentUseCaseRequest extends FindNewsletterByPublicIdParamsSchemaType {}

export interface GetNewsletterHtmlContentUseCaseResponse {
  content: string
}
