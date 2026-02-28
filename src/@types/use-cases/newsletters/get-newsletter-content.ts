import type { FindNewsletterByPublicIdParamsSchemaType } from '@custom-types/http/schemas/newsletter/find-newsletter-by-public-id-params-schema'
import type { ReadStream } from 'fs-extra'

export interface GetNewsletterContentUseCaseRequest extends FindNewsletterByPublicIdParamsSchemaType {}

export interface GetNewsletterContentUseCaseResponse {
  content: string | ReadStream
}
