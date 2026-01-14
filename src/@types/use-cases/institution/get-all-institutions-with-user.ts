import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { GetAllInstitutionsWithUsersQuerySchemaType } from '@custom-types/http/schemas/institution/get-all-institutions-with-users-query-schema'
import type { InstitutionsUsersCount } from '@custom-types/repository/prisma/institution/institutions-users-count'

export interface GetAllInstitutionsWithUsersUseCaseRequest extends GetAllInstitutionsWithUsersQuerySchemaType {}

export interface GetAllInstitutionsWithUsersUseCaseResponse extends PaginatedResult<InstitutionsUsersCount[]> {}
