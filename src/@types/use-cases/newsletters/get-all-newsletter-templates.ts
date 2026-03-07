import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { GetAllNewsletterTemplatesQuerySchemaType } from '@custom-types/http/schemas/newsletter/get-all-newsletter-templates-query-schema'
import type { NewsletterTemplate } from '@prisma/generated/client'

export interface GetAllNewsletterTemplatesUseCaseRequest extends GetAllNewsletterTemplatesQuerySchemaType {}

export interface GetAllNewsletterTemplatesUseCaseResponse extends PaginatedResult<NewsletterTemplate[]> {}
