import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { GetAllInternalInstitutionsNamesQuerySchemaType } from '@custom-types/http/schemas/institution/get-all-internal-institutions-names-query-schema'
import type { Institution } from '@prisma/client'

export interface GetAllInternalInstitutionsNamesUseCaseRequest extends GetAllInternalInstitutionsNamesQuerySchemaType {}

export interface GetAllInternalInstitutionsNamesUseCaseResponse extends PaginatedResult<Institution[]> {}
