import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { GetAllNewslettersQuerySchemaType } from '@custom-types/http/schemas/newsletter/get-all-newsletters-query-schema'
import type { NewsletterWithDetails } from '@custom-types/validators/newsletter-with-details'

export interface GetAllNewslettersUseCaseRequest extends GetAllNewslettersQuerySchemaType {}

export interface GetAllNewslettersUseCaseResponse extends PaginatedResult<NewsletterWithDetails[]> {}
