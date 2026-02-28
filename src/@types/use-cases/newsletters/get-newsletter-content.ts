import type { FindNewsletterByPublicIdParamsSchemaType } from '@custom-types/http/schemas/newsletter/find-newsletter-by-public-id-params-schema'
import type { ReadStream } from 'fs-extra'

export interface GetNewsletterHtmlContentUseCaseRequest extends FindNewsletterByPublicIdParamsSchemaType {}

export interface GetNewsletterHtmlContentUseCaseResponse {
  content: string | ReadStream
}
