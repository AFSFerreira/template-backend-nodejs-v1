import type { CreateNewsletterBodySchemaType } from '@custom-types/http/schemas/newsletter/create-newsletter-body-schema'

export interface CreateNewsletterQuery extends Omit<CreateNewsletterBodySchemaType, 'contentFilename'> {
  content: string
}
