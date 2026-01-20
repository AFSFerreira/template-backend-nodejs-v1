import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { GetAllInstitutionsQuerySchemaType } from '@custom-types/http/schemas/institution/get-all-institutions-query-schema'

export interface GetAllInstitutionsNamesUseCaseRequest extends GetAllInstitutionsQuerySchemaType {}

export interface GetAllInstitutionsNamesUseCaseResponse extends PaginatedResult<string[]> {}
