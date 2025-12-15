import type { CreateNewsletterBodySchemaType } from '@custom-types/schemas/newsletter/create-newsletter-body-schema'

export interface CreateNewsletterQuery extends Omit<CreateNewsletterBodySchemaType, 'contentFileName'> {
  content: string
}
