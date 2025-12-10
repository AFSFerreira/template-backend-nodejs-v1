import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { InstitutionsUsersCount } from '@custom-types/repository/institution/institutions-users-count'
import type { GetAllInstitutionsWithUsersQuerySchemaType } from '@custom-types/schemas/institution/get-all-institutions-with-users-query-schema'

export interface GetAllInstitutionsWithUsersUseCaseRequest extends GetAllInstitutionsWithUsersQuerySchemaType {}

export interface GetAllInstitutionsWithUsersUseCaseResponse extends PaginatedResult<InstitutionsUsersCount[]> {}
