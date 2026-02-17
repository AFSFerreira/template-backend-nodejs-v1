import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { NewsletterWithContent } from '@custom-types/http/presenter/newsletter/newsletter-default'
import type { GetAllNewslettersQuerySchemaType } from '@custom-types/http/schemas/newsletter/get-all-newsletters-query-schema'

export interface GetAllNewslettersUseCaseRequest extends GetAllNewslettersQuerySchemaType {}

export interface GetAllNewslettersUseCaseResponse extends PaginatedResult<NewsletterWithContent[]> {}
