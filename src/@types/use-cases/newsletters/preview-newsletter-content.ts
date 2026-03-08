import type { PreviewNewsletterContentBodySchemaType } from '@custom-types/http/schemas/newsletter/preview-newsletter-content-body-schema'

export interface PreviewNewsletterContentUseCaseRequest extends PreviewNewsletterContentBodySchemaType {}

export interface PreviewNewsletterContentUseCaseResponse {
  html: string
}
