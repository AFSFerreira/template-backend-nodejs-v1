import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { GetAllNewslettersQuerySchemaType } from '@custom-types/schemas/newsletter/get-all-newsletters-query-schema'
import type { Newsletter } from '@prisma/client'

export interface GetAllNewslettersUseCaseRequest extends GetAllNewslettersQuerySchemaType {}

export interface GetAllNewslettersUseCaseResponse extends PaginatedResult<Newsletter[]> {}
